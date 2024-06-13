import "../styles/globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen px-3 md:px-6 lg:px-12 flex flex-col gap:6 lg:gap-12">
        <header className="px-5">
          <Navbar />
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; {new Date().getFullYear()} cr33kman - Weather Dashboard
        </footer>
      </body>
    </html>
  );
}
