import { Header } from "./header";
import { Footer } from "./footer";
import { WhatsAppFloat } from "./whatsapp-float";

export function PageShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen pt-32 pb-20 bg-gray-50">
        <header className="bg-brand-dark relative overflow-hidden mb-16 -mt-32 pt-40 pb-16">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-gold opacity-5 blur-[120px] rounded-full" />
          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Hara Ceylon
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose prose-gray max-w-none bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            {children}
          </article>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
