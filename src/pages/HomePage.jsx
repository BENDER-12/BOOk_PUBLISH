import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { BookOpen, PenTool, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-10">
        <div className=" mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to BookVerse</h1>
          <p className="text-xl p-10 max-w-2xl mx-auto">
            Your ultimate destination for book publishing, reading, and discovering amazing stories from authors
            worldwide.
          </p>
          
              <Button className="block bg-indigo-700 m-10">
                {/* <BookOpen className="mr-2 h-5 w-5" /> */}
                Browse Books
              </Button>
          <div className="flex gap-4 justify-center ">
            <Link to="/books">
              <Button className="display: block; bg-indigo-700 p-10">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Books
              </Button>
            </Link>
            <Link to="/publish">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                <PenTool className="mr-2 h-5 w-5" />
                Publish Your Book
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 p-5 m-10">Why Choose BookVerse?</h2>
          <div className="grid md:grid-cols-3 gap-8 p-4">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Vast Library</CardTitle>
                <CardDescription>Access thousands of books across all genres and categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From fiction to non-fiction, technical books to poetry - find your next favorite read.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <PenTool className="h-12 w-12 text-green-600 m-10" />
                <CardTitle>Easy Publishing</CardTitle>
                <CardDescription>Publish your books with our simple and intuitive platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Share your stories with the world using our user-friendly publishing tools.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Connect with readers and authors from around the globe</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Join discussions, share reviews, and discover new perspectives.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Books Published</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-gray-600">Authors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100K+</div>
              <div className="text-gray-600">Reviews</div>
            </div>
          </div>
        </div>
      </section>
      {/* <HomePage/> */}
    </div>

  )
}
