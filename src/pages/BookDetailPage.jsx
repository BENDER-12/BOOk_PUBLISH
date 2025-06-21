import React from 'react'

// "use client" // Uncomment if you need this directive for Next.js or similar frameworks

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Textarea from "../components/ui/Textarea"
import { Star, ArrowLeft, BookOpen, Calendar, User, MessageSquare } from "lucide-react"

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [isReading, setIsReading] = useState(false)

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockBooks = [
      {
        id: 1,
        title: "The JavaScript Chronicles",
        author: "Alex Developer",
        genre: "Technology",
        rating: 4.8,
        reviews: 245,
        description: "A comprehensive guide to modern JavaScript development and best practices.",
        publishedDate: "2024-01-15",
        pages: 420,
        fullDescription:
          "This comprehensive guide takes you through the evolution of JavaScript from its humble beginnings to the powerful language it is today. Learn about ES6+ features, async programming, modern frameworks, and best practices that will make you a better developer. Whether you're a beginner or an experienced programmer, this book provides valuable insights and practical examples that you can apply immediately in your projects.",
      },
      {
        id: 2,
        title: "React Mastery",
        author: "Sarah Frontend",
        genre: "Technology",
        rating: 4.9,
        reviews: 189,
        description: "Master React from basics to advanced concepts with real-world projects.",
        publishedDate: "2023-11-20",
        pages: 380,
        fullDescription:
          "Dive deep into React development with this hands-on guide that covers everything from basic components to advanced patterns like hooks, context, and state management. Build real-world applications while learning best practices for performance optimization, testing, and deployment. This book is perfect for developers who want to master React and build scalable, maintainable applications.",
      },
    ]

    const mockReviews = [
      {
        id: 1,
        user: "John Reader",
        rating: 5,
        comment: "Excellent book! Very well written and easy to follow. The examples are practical and helpful.",
        date: "2024-02-15",
      },
      {
        id: 2,
        user: "Jane Coder",
        rating: 4,
        comment: "Great content, though some sections could be more detailed. Overall a solid resource.",
        date: "2024-02-10",
      },
    ]

    const bookId = Number.parseInt(id)
    const foundBook = mockBooks.find((b) => b.id === bookId)

    if (foundBook) {
      setBook(foundBook)
      setReviews(mockReviews)
    }
  }, [id])

  const handleAddReview = () => {
    if (newReview.trim()) {
      const review = {
        id: reviews.length + 1,
        user: "Current User",
        rating: newRating,
        comment: newReview,
        date: new Date().toISOString().split("T")[0],
      }
      setReviews([review, ...reviews])
      setNewReview("")
      setNewRating(5)
    }
  }

  const handleStartReading = () => {
    setIsReading(true)
    // In a real app, this would save to user's reading list
    setTimeout(() => {
      navigate("/reading")
    }, 1000)
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Book not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Books
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary">{book.genre}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{book.rating}</span>
                  <span className="text-gray-500">({book.reviews} reviews)</span>
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">{book.title}</CardTitle>
              <CardDescription className="text-lg">by {book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(book.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {book.pages} pages
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.fullDescription}</p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleStartReading} disabled={isReading} className="flex-1">
                  {isReading ? "Starting..." : "Start Reading"}
                </Button>
                <Button variant="outline">Add to Wishlist</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add Review */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Add Your Review</h4>
                <div className="mb-2">
                  <label className="text-sm text-gray-600">Rating:</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number.parseInt(e.target.value))}
                    className="ml-2 px-2 py-1 border rounded"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <Textarea
                  placeholder="Write your review..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleAddReview} size="sm">
                  Submit Review
                </Button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-sm">{review.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
                    <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
