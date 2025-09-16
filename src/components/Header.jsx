export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          Blog da Bruna
        </h1>
        <nav aria-label="principal" className="mt-3">
          <ul className="flex items-center gap-4 text-white/90">
            <li><a className="hover:underline" href="#posts">Posts</a></li>
            <li><a className="hover:underline" href="#sobre">Sobre</a></li>
            <li><a className="hover:underline" href="#contato">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
