import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const OurStory = () => {
  return (
    <section className="bg-white py-10 lg:py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/founders-working.png"
                alt="BlissMatch Founders"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-warm-linen -z-10 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Our Story
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-6">
              Restoring authenticity to <br />
              <span className="italic">modern connection.</span>
            </h2>

            <div className="space-y-6 text-stone-600 leading-relaxed max-w-lg">
              <p>
                BlissMatch was founded by two lifelong friends, uniting
                backgrounds in
                <span className="text-deep-midnight-navy font-medium">
                  {" "}
                  Human Behaviour
                </span>{" "}
                and
                <span className="text-deep-midnight-navy font-medium">
                  {" "}
                  Business Law
                </span>{" "}
                to create a sanctuary for meaningful love in a digital world.
              </p>

              <blockquote className="border-l-2 border-muted-burgundy-rose pl-6 py-2 italic text-deep-midnight-navy font-serif text-lg">
                "We don’t introduce many. We introduce meaningfully."
              </blockquote>

              <p className="text-sm">
                Our philosophy is simple: Love is deliberate. We combine
                psychological insight with refined matchmaking to help you
                connect on every level—intellectual, emotional, and spiritual.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center group text-deep-midnight-navy font-bold uppercase text-xs tracking-widest border-b border-stone-200 pb-2 hover:border-muted-burgundy-rose transition-all"
              >
                Discover Our Full Philosophy
                <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2 text-muted-burgundy-rose" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
