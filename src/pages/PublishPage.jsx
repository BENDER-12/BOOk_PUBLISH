"use client"

import { useState } from "react"
import Button from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Input from "../components/ui/Input"
import Textarea from "../components/ui/Textarea"
import Label from "../components/ui/Label"
import Badge from "../components/ui/Badge"
import { Upload, BookOpen, CheckCircle, AlertCircle } from "lucide-react"

export default function PublishPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    fullDescription: "",
    pages: "",
    isbn: "",
    tags: [],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [errors, setErrors] = useState({})

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Technology",
    "Science",
    "Biography",
    "History",
    "Romance",
    "Mystery",
    "Fantasy",
    "Self-Help",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.author.trim()) newErrors.author = "Author is required"
    if (!formData.genre) newErrors.genre = "Genre is required"
    if (!formData.description.trim()) newErrors.description = "Short description is required"
    if (!formData.fullDescription.trim()) newErrors.fullDescription = "Full description is required"
    if (!formData.pages.trim() || isNaN(Number(formData.pages))) {
      newErrors.pages = "Valid page count is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsPublished(true)
  }

  if (isPublished) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-700">Book Published Successfully!</CardTitle>
            <CardDescription>
              Your book "{formData.title}" has been published and is now available to readers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                Your book will be reviewed by our team and made available in the catalog within 24 hours.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => (window.location.href = "/books")}>View All Books</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsPublished(false)
                    setFormData({
                      title: "",
                      author: "",
                      genre: "",
                      description: "",
                      fullDescription: "",
                      pages: "",
                      isbn: "",
                      tags: [],
                    })
                  }}
                >
                  Publish Another Book
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Publish Your Book</h1>
          <p className="text-gray-600">
            Share your story with the world. Fill out the form below to publish your book on BookVerse.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Provide the essential details about your book</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Book Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter your book title"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="author">Author Name *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Your name"
                    className={errors.author ? "border-red-500" : ""}
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.author}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="genre">Genre *</Label>
                  <select
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => handleInputChange("genre", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.genre ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  {errors.genre && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.genre}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pages">Number of Pages *</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={formData.pages}
                      onChange={(e) => handleInputChange("pages", e.target.value)}
                      placeholder="e.g., 250"
                      className={errors.pages ? "border-red-500" : ""}
                    />
                    {errors.pages && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.pages}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="isbn">ISBN (Optional)</Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => handleInputChange("isbn", e.target.value)}
                      placeholder="978-0-123456-78-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descriptions and Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Descriptions & Tags</CardTitle>
                <CardDescription>Help readers discover your book with compelling descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="A brief, compelling description (max 200 characters)"
                    className={errors.description ? "border-red-500" : ""}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.description.length}/200 characters</p>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="fullDescription">Full Description *</Label>
                  <Textarea
                    id="fullDescription"
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                    placeholder="Provide a detailed description of your book, its themes, and what readers can expect..."
                    rows={6}
                    className={errors.fullDescription ? "border-red-500" : ""}
                  />
                  {errors.fullDescription && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.fullDescription}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Book Files
              </CardTitle>
              <CardDescription>Upload your book files (PDF, EPUB, etc.)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your book files here, or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, EPUB, MOBI (Max size: 50MB)</p>
                <Button type="button" variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
              {isSubmitting ? "Publishing..." : "Publish Book"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
