'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

const Header = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] shadow-sm">
      <div className="overflow-hidden bg-stone-950 text-white py-2 border-b border-white/5">
        <div className="flex whitespace-nowrap min-w-full relative">
          <div className="animate-marquee flex shrink-0 items-center">
            <p className="text-[11px] md:text-[13px] uppercase font-medium">
              A Private Matchmaking Consultancy for Exceptional Individuals •
              <span className="text-muted-burgundy-rose"> Confidential</span> •
              Intentional •
              <span className="text-muted-burgundy-rose">
                {" "}
                By Appointment Only
              </span>{" "}
              • Book a Private Consultation &nbsp;
            </p>
          </div>

          <div className="animate-marquee flex shrink-0 items-center">
            <p className="text-[11px] md:text-[13px] uppercase font-medium">
              A Private Matchmaking Consultancy for Exceptional Individuals •
              <span className="text-muted-burgundy-rose"> Confidential</span> •
              Intentional •
              <span className="text-muted-burgundy-rose">
                {" "}
                By Appointment Only
              </span>{" "}
              • Book a Private Consultation &nbsp;
            </p>
          </div>
        </div>
      </div>

      <Navbar />

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
