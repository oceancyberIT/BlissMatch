import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/app/data/constant";
import { HomeContent } from "@/components/admin/home-editor/types";

type OurServicesProps = {
  data?: HomeContent["servicesOverview"];
};

const OurServices = ({ data }: OurServicesProps) => {
  const cards = data?.cards?.length ? data.cards : services;
  const lead =
    "We offer a bespoke, confidential matchmaking experience for discerning professionals and global citizens seeking lasting love.";

  return (
    <section className="relative overflow-hidden bg-white py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <div className="service-float-1 absolute left-4 top-6 rounded-full bg-white/85 p-2 shadow-sm ring-1 ring-stone-200/80 lg:left-[4%] lg:top-[12%]">
          <Image src="/logo1.png" alt="" width={24} height={24} className="h-6 w-6 object-contain opacity-70" />
        </div>
        <div className="service-float-2 absolute right-5 top-10 rounded-full bg-white/85 p-2 shadow-sm ring-1 ring-stone-200/80 lg:right-[7%] lg:top-[16%]">
          <Image src="/logo1.png" alt="" width={22} height={22} className="h-5.5 w-5.5 object-contain opacity-60" />
        </div>
        <div className="service-float-3 absolute right-6 bottom-10 rounded-full bg-white/85 p-2 shadow-sm ring-1 ring-stone-200/80 lg:right-[11%] lg:bottom-[12%]">
          <Image src="/logo1.png" alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain opacity-70" />
        </div>
        <div className="service-float-4 absolute left-6 bottom-8 rounded-full bg-white/85 p-2 shadow-sm ring-1 ring-stone-200/80 lg:left-[12%] lg:bottom-[10%]">
          <Image src="/logo1.png" alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain opacity-70" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="z-10 p-1 lg:pr-10">
            <span className="mb-3 block text-[13px] font-black uppercase tracking-[0.3em] text-muted-burgundy-rose">
              Our Service
            </span>
            <p className="mb-5 text-sm md:text-base leading-relaxed text-stone-600">
              {lead}
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center border-b border-stone-300 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-deep-midnight-navy transition-colors hover:border-muted-burgundy-rose hover:text-muted-burgundy-rose"
            >
              Our Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative mx-auto aspect-square w-full max-w-[230px] overflow-hidden rounded-full">
                <Image
                  src="/image copy 6.png"
                  alt="Couple walking by the beach"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[230px] overflow-hidden rounded-full">
                <Image
                  src="/image copy 2.png"
                  alt="Couple sharing a warm moment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-full">
              <Image
                src="/image copy 7.png"
                alt="Elegant service planning details"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes serviceFloatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes serviceFloatB {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-9px) translateX(3px); }
        }
        @keyframes serviceFloatC {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .service-float-1 { animation: serviceFloatA 4.8s ease-in-out infinite; }
        .service-float-2 { animation: serviceFloatB 5.6s ease-in-out infinite; }
        .service-float-3 { animation: serviceFloatC 4.2s ease-in-out infinite; }
        .service-float-4 { animation: serviceFloatA 5.2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default OurServices;
