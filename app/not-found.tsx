import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 pb-20">
        <div className="text-center max-w-md mx-auto px-6">
          <p className="text-brand-gold tracking-widest uppercase text-sm font-bold mb-4">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Page not found
          </h1>
          <p className="text-gray-500 mb-8">
            The page you&apos;re looking for has been moved or no longer exists.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-green-800 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
