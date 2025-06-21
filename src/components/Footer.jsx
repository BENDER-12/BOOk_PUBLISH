import { Link } from "react-router-dom"
import { BookOpen, Facebook, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">BookVerse</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting readers and authors worldwide through the power of storytelling.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Mail className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-gray-400 hover:text-white">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/publish" className="text-gray-400 hover:text-white">
                  Publish
                </Link>
              </li>
              <li>
                <Link to="/reading" className="text-gray-400 hover:text-white">
                  Reading
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Fiction</span>
              </li>
              <li>
                <span className="text-gray-400">Non-Fiction</span>
              </li>
              <li>
                <span className="text-gray-400">Science</span>
              </li>
              <li>
                <span className="text-gray-400">Technology</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Help Center</span>
              </li>
              <li>
                <span className="text-gray-400">Contact Us</span>
              </li>
              <li>
                <span className="text-gray-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} BookVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
