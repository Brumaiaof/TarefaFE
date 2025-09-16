// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

// Use IMPORTS que combinem com seus exports:
// Se Home/Post são export default -> use "import Home from ..."
// Se são export nomeado -> use "import { Home } from ..."

import Home from "./pages/Home.jsx";     // ou: import { Home } from "./pages/Home";
import Post from "./pages/Post.jsx";     // ou: import { Post } from "./pages/Post";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto max-w-3xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="text-gray-600">
      Página não encontrada.
    </div>
  );
}
