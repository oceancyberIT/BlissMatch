import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex pt-38 pb-20 lg:pb-0 md:pt-60 lg:pt-30 items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Happy couple sharing a moment"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-r from-deep-midnight-navy/80 via-deep-midnight-navy/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-2xl text-white">
          <span className="inline-block  text-white text-sm border border-muted-burgundy-rose p-2 font-medium tracking-widest uppercase mb-4 opacity-90">
            Where Love Meets Intention
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 drop-shadow-sm">
            Building great <br />
            <span className="italic text-muted-burgundy-rose">
              relationships
            </span>{" "}
            leads to an amazing life!
          </h1>

          <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-lg leading-relaxed">
            Expert relationship consultancy designed to help you navigate the
            complexities of love, connection, and lasting partnership.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/appointment"
              className="bg-white uppercase text-deep-midnight-navy px-8 py-4 font-semibold text-center hover:bg-muted-burgundy-rose hover:text-white transition-all duration-300 shadow-lg"
            >
              Book a Private Consultation
            </Link>
            <Link
              href="/services"
              className="bg-transparent uppercase border border-white/40 backdrop-blur-sm text-white px-8 py-4 font-semibold text-center hover:bg-white/10 transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;