"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Progress from "../components/ui/Progress"
import Badge from "../components/ui/Badge"
import { BookOpen, Clock, Target, TrendingUp, Play, Pause } from "lucide-react"

// ✅ FUNCTIONAL COMPONENT with complex state management using hooks
export default function ReadingPage() {
  const [currentlyReading, setCurrentlyReading] = useState([])
  const [readingStats, setReadingStats] = useState({
    booksCompleted: 0,
    totalTimeSpent: 0,
    averageReadingSpeed: 0,
    currentStreak: 0,
  })
  const [readingTimer, setReadingTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [activeBookId, setActiveBookId] = useState(null)

  // ✅ useEffect for initial data loading
  useEffect(() => {
    const mockReadingBooks = [
      {
        id: 1,
        title: "The JavaScript Chronicles",
        author: "Alex Developer",
        genre: "Technology",
        totalPages: 420,
        currentPage: 156,
        timeSpent: 180,
        lastRead: "2024-01-20",
        isCurrentlyReading: false,
      },
      {
        id: 2,
        title: "React Mastery",
        author: "Sarah Frontend",
        genre: "Technology",
        totalPages: 380,
        currentPage: 89,
        timeSpent: 120,
        lastRead: "2024-01-19",
        isCurrentlyReading: false,
      },
      {
        id: 3,
        title: "The Art of Storytelling",
        author: "David Writer",
        genre: "Fiction",
        totalPages: 310,
        currentPage: 45,
        timeSpent: 60,
        lastRead: "2024-01-18",
        isCurrentlyReading: false,
      },
    ]

    const mockStats = {
      booksCompleted: 12,
      totalTimeSpent: 2400, // 40 hours
      averageReadingSpeed: 45, // pages per hour
      currentStreak: 7, // days
    }

    setCurrentlyReading(mockReadingBooks)
    setReadingStats(mockStats)
  }, [])

  // ✅ useEffect for timer functionality
  useEffect(() => {
    let interval = null

    if (isTimerRunning) {
      interval = setInterval(() => {
        setReadingTimer((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning])

  // ✅ Event handler functions (not class methods)
  const startReading = (bookId) => {
    setActiveBookId(bookId)
    setIsTimerRunning(true)
    setCurrentlyReading((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, isCurrentlyReading: true } : { ...book, isCurrentlyReading: false },
      ),
    )
  }

  const pauseReading = () => {
    setIsTimerRunning(false)
    if (activeBookId) {
      setCurrentlyReading((prev) =>
        prev.map((book) =>
          book.id === activeBookId
            ? {
                ...book,
                isCurrentlyReading: false,
                timeSpent: book.timeSpent + Math.floor(readingTimer / 60),
                lastRead: new Date().toISOString().split("T")[0],
              }
            : book,
        ),
      )
    }
    setReadingTimer(0)
    setActiveBookId(null)
  }

  const updateProgress = (bookId, newPage) => {
    setCurrentlyReading((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, currentPage: Math.min(newPage, book.totalPages) } : book)),
    )
  }

  // ✅ Helper functions (not class methods)
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">My Reading</h1>
        <p className="text-gray-600">Track your reading progress and manage your book collection.</p>
      </div>

      {/* Reading Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Books Completed</p>
                <p className="text-2xl font-bold text-green-600">{readingStats.booksCompleted}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Spent</p>
                <p className="text-2xl font-bold text-blue-600">{formatTime(readingStats.totalTimeSpent)}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reading Speed</p>
                <p className="text-2xl font-bold text-purple-600">{readingStats.averageReadingSpeed} p/h</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-orange-600">{readingStats.currentStreak} days</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Timer */}
      {isTimerRunning && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Currently Reading</h3>
                <p className="text-blue-600">{currentlyReading.find((book) => book.id === activeBookId)?.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-mono font-bold text-blue-800">{formatTimer(readingTimer)}</div>
                <Button onClick={pauseReading} variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Currently Reading Books */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Currently Reading</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentlyReading.map((book) => {
            const progress = (book.currentPage / book.totalPages) * 100

            return (
              <Card key={book.id} className={book.isCurrentlyReading ? "ring-2 ring-blue-500" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{book.genre}</Badge>
                    <div className="text-sm text-gray-500">{Math.round(progress)}% complete</div>
                  </div>
                  <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                  <CardDescription>by {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>
                          {book.currentPage} / {book.totalPages} pages
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Time spent: {formatTime(book.timeSpent)}</span>
                      <span>Last read: {new Date(book.lastRead).toLocaleDateString()}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max={book.totalPages}
                          value={book.currentPage}
                          onChange={(e) => updateProgress(book.id, Number.parseInt(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 border rounded text-sm"
                          placeholder="Current page"
                        />
                        <span className="text-sm text-gray-500 flex items-center">/ {book.totalPages}</span>
                      </div>

                      <div className="flex gap-2">
                        {!book.isCurrentlyReading ? (
                          <Button onClick={() => startReading(book.id)} className="flex-1" disabled={isTimerRunning}>
                            <Play className="h-4 w-4 mr-2" />
                            Start Reading
                          </Button>
                        ) : (
                          <Button onClick={pauseReading} className="flex-1" variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                        )}
                        <Link to={`/books/${book.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Discover more books or manage your reading list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Link to="/books">
              <Button>
                <BookOpen className="h-4 w-4 mr-2" />
                Browse More Books
              </Button>
            </Link>
            <Button variant="outline">View Reading History</Button>
            <Button variant="outline">Set Reading Goals</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
