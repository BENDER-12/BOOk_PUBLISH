"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BookOpen, Menu, X } from "lucide-react"

// ✅ FUNCTIONAL COMPONENT with useState hook
export default function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/publish", label: "Publish" },
    { href: "/reading", label: "Reading" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">BookVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === item.href ? "text-blue-600 border-b-2 border-blue-600 pb-4" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                  location.pathname === item.href ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
