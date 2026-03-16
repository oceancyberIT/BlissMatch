import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointment", href: "/appointment" },
  ];

  return (
    <footer className="bg-deep-midnight-navy text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* --- COMPACT CTA SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 mb-6 gap-6">
          <div className="text-center md:text-left">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
              Inquiry
            </span>
            <h2 className="text-2xl md:text-3xl font-serif leading-tight">
              Ready for a <span className="italic">meaningful</span>{" "}
              introduction?
            </h2>
          </div>

          <Link
            href="/appointment"
            className="group relative flex items-center justify-center px-20  w-20 h-10 bg-muted-burgundy-rose transition-transform hover:scale-105 duration-500 shrink-0"
          >
            <div className="text-center flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-widest">
                Book
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </Link>
        </div>

        {/* --- TIGHTENED GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo1.png"
                  alt="BlissMatch"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
              <span className="text-lg font-serif tracking-widest uppercase">
                BlissMatch
              </span>
            </div>
            <p className="text-white text-[11px] leading-relaxed max-w-xs font-bold tracking-wider">
              Private matchmaking consultancy for exceptional individuals.
              Worldwide.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em]  text-stone-300">
              Navigation
            </h4>
            <ul className="flex flex-col space-y-1 text-xs text-stone-300 font-bold">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors tracking-widest"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[9px] font-black uppercase tracking-widest  text-stone-300">
              Contact
            </h4>
            <div className="text-xs text-stone-300 space-y-1 font-bold tracking-widest">
              <p className="italic font-serif normal-case tracking-normal">
                London • Accra • Paris
              </p>
              <a
                href="mailto:hello@blissmatch.com"
                className="block hover:text-white transition-colors"
              >
                hello@blissmatch.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 flex lg:justify-end items-start pt-2">
            <div className="flex gap-4 opacity-70">
              {[Instagram, Linkedin, Mail].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="hover:text-muted-burgundy-rose transition-colors"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- MINIMAL FOOTNOTE --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-300">
          <p>© {currentYear} BlissMatch Registry.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
