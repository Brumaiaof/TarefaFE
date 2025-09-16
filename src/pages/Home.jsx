import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    const ctrl = new AbortController();
    const load = async () => {
      try {
        setStatus("loading");
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPosts(data);
        setStatus("success");
      } catch (e) {
        if (e.name !== "AbortError") {
          setError("Não foi possível carregar os posts.");
          setStatus("error");
        }
      }
    };
    load();
    return () => ctrl.abort();
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <section id="posts" className="space-y-8">
      <header>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Últimos posts</h2>
        <p className="text-gray-600">Conteúdos de exemplo da API JSONPlaceholder.</p>
      </header>

      {status === "loading" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-white rounded-xl shadow animate-pulse" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="text-red-600 bg-red-50 border border-red-100 rounded-md p-4">
          {error}
        </div>
      )}

      {status === "success" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagePosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-100"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2">{post.title}</h3>
                <p className="text-gray-700">
                  {post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body}
                </p>
                <a
                  href="#"
                  className="inline-block mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                >
                  Ler post
                </a>
              </article>
            ))}
          </div>

          {posts.length > POSTS_PER_PAGE && (
            <nav className="flex items-center justify-center gap-2 pt-4" aria-label="Paginação">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-l bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition"
              >
                Anterior
              </button>
              <span className="px-4 py-2 bg-gray-100 rounded text-gray-700 font-semibold">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-r bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition"
              >
                Próxima
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
