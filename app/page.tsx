import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getFeaturedProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const products = await getFeaturedProducts(4);

  return (
    <>
      <Header variant="transparent" />

      <Hero />

      {/* About */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/img/Green-tea1.png"
                alt="Tea Plantation"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8"
              />
              <Image
                src="/img/hero-bg.webp"
                alt="Tea Leaves"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl w-full h-64 object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-white p-6 rounded-full shadow-2xl w-32 h-32 flex flex-col justify-center items-center text-center border-4 border-white animate-float">
              <span className="text-3xl font-bold font-serif">100%</span>
              <span className="text-xs uppercase tracking-widest">Natural</span>
            </div>
          </div>

          <div>
            <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-2 block">
              About Hara Ceylon
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Honoring Centuries of <br />
              <span className="text-brand-green italic">Tea-Making Heritage</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Hara Ceylon Ltd is a proudly Sri Lankan company dedicated to delivering
              the finest natural products sourced from the fertile soils and rich
              heritage of Ceylon.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                Ethically sourced from local farmers
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                Pure &amp; natural — free from additives
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                Crafted to international quality standards
              </li>
            </ul>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-green-800 transition-all"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold uppercase text-sm tracking-widest">
              Our Collection
            </span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2">
              Premium Selections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 bg-brand-green text-white font-bold rounded-full shadow-xl hover:bg-green-800 transition-all"
            >
              View Full Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-brand-dark relative py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-gold opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-green opacity-10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2 text-center lg:text-left">
              <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                Connections
              </span>
              <h2 className="text-white text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Begin Your <br />
                <span className="text-brand-gold italic">Pure Journey</span> With Us
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
                Whether you&apos;re looking for wholesale opportunities or a single
                premium cup, we&apos;re here to share the essence of Sri Lanka with
                you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-white/80 font-medium tracking-wide hover:text-brand-gold transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-5">
                  <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="text-white/80 font-medium tracking-wide">
                    {siteConfig.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="luxury-card p-8 md:p-12 rounded-[2rem]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function ContactForm() {
  return (
    <form
      action={`mailto:${siteConfig.email}`}
      method="post"
      encType="text/plain"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-brand-gold/60 text-[10px] uppercase font-bold tracking-widest ml-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="contact-input w-full px-6 py-4 rounded-xl text-white outline-none placeholder:text-gray-600"
            placeholder="E.g. John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-brand-gold/60 text-[10px] uppercase font-bold tracking-widest ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="contact-input w-full px-6 py-4 rounded-xl text-white outline-none placeholder:text-gray-600"
            placeholder="E.g. john@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-brand-gold/60 text-[10px] uppercase font-bold tracking-widest ml-1">
          Your Message
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="contact-input w-full px-6 py-4 rounded-xl text-white outline-none placeholder:text-gray-600 resize-none"
          placeholder="Share your inquiry or thoughts..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-brand-gold hover:bg-white hover:text-brand-dark text-white py-5 rounded-xl font-bold text-sm uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
      >
        Send Inquiry
      </button>
    </form>
  );
}
