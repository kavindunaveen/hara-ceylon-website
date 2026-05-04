import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#05150d] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 text-center md:text-left">
            <Image
              src="/img/logo.webp"
              alt="Hara Ceylon"
              width={96}
              height={96}
              className="h-24 w-auto mb-8 opacity-90 transition-transform hover:scale-105 duration-500 mx-auto md:mx-0"
            />
            <p className="text-gray-500 leading-relaxed max-w-sm font-light italic mx-auto md:mx-0">
              &ldquo;Cultivating wellness and tradition, from the misty hills of Sri
              Lanka straight to your cherished ritual.&rdquo;
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                <Link href="/" className="footer-link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="footer-link-hover">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/#about" className="footer-link-hover">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="footer-link-hover">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/account" className="footer-link-hover">
                  Account
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-[0.3em] mb-8">
              Customer
            </h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400 mb-10">
              <li>
                <Link href="/shipping-policy" className="footer-link-hover">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="footer-link-hover">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link-hover">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link-hover">
                  Terms
                </Link>
              </li>
            </ul>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <span className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Hara Ceylon Ltd. All rights reserved.
            </span>
            <span className="hidden md:inline text-gray-800">|</span>
            <span className="text-gray-600 text-[10px] uppercase tracking-wider">
              Premium Sri Lankan Heritage
            </span>
          </div>
          <div className="text-gray-600 text-[10px] uppercase tracking-tighter text-center md:text-right">
            Developed by{" "}
            <a
              href="https://www.facebook.com/websynic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold/60 hover:text-brand-gold transition-colors font-bold"
            >
              Websynic Digital Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
