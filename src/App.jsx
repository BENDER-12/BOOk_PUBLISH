import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import BooksPage from "./pages/BooksPage"
import BookDetailPage from "./pages/BookDetailPage"
import PublishPage from "./pages/PublishPage"
import ReadingPage from "./pages/ReadingPage"
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/publish" element={<PublishPage />} />
            <Route path="/reading" element={<ReadingPage />} />
          </Routes>
          <App/>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
