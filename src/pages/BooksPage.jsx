"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Badge from "../components/ui/Badge"
import { Star, Search, Filter } from "lucide-react"

// ✅ FUNCTIONAL COMPONENT with multiple hooks
export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [filteredBooks, setFilteredBooks] = useState([])

  // ✅ useEffect hook for data fetching
  useEffect(() => {
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
      },
      {
        id: 3,
        title: "The Digital Nomad's Journey",
        author: "Mike Traveler",
        genre: "Biography",
        rating: 4.6,
        reviews: 156,
        description: "A personal account of working remotely while traveling the world.",
        publishedDate: "2024-02-10",
        pages: 290,
      },
      {
        id: 4,
        title: "Mysteries of the Deep Web",
        author: "Emma Cyber",
        genre: "Technology",
        rating: 4.7,
        reviews: 203,
        description: "Exploring the hidden layers of the internet and cybersecurity.",
        publishedDate: "2023-12-05",
        pages: 350,
      },
      {
        id: 5,
        title: "The Art of Storytelling",
        author: "David Writer",
        genre: "Fiction",
        rating: 4.5,
        reviews: 178,
        description: "A meta-narrative about the craft of writing compelling stories.",
        publishedDate: "2024-01-30",
        pages: 310,
      },
      {
        id: 6,
        title: "Future of AI",
        author: "Dr. Lisa Neural",
        genre: "Science",
        rating: 4.8,
        reviews: 267,
        description: "Exploring the potential and implications of artificial intelligence.",
        publishedDate: "2023-10-15",
        pages: 450,
      },
    ]
    setBooks(mockBooks)
    setFilteredBooks(mockBooks)
  }, [])

  // ✅ useEffect hook for filtering logic
  useEffect(() => {
    let filtered = books

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter((book) => book.genre === selectedGenre)
    }

    setFilteredBooks(filtered)
  }, [books, searchTerm, selectedGenre])

  const genres = ["all", ...Array.from(new Set(books.map((book) => book.genre)))]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Discover Books</h1>
        <p className="text-gray-600 mb-6">Explore our vast collection of books across various genres and topics.</p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === "all" ? "All Genres" : genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{book.genre}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{book.rating}</span>
                  <span className="text-sm text-gray-500">({book.reviews})</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2">{book.title}</CardTitle>
              <CardDescription>by {book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">{book.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{book.pages} pages</span>
                <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
              </div>
              <Link to={`/books/${book.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedGenre("all")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
