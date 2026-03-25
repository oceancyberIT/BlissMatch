import Link from "next/link";
import { services } from "@/app/data/constant";
import { ArrowRight } from "lucide-react";
import { HomeContent } from "@/components/admin/home-editor/types";

type ServiceQuestionsProps = {
  data?: HomeContent["servicesOverview"];
};

const ServiceQuestions = ({ data }: ServiceQuestionsProps) => {
  const heading = data?.heading || "Elevated Relational Support";
  const cards = data?.cards?.length ? data.cards : services;

  return (
    <section className="bg-soft-ivory-white py-10 lg:py-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center md:mb-20 mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-deep-midnight-navy md:mb-4">
            {heading}
          </h2>
          {/* <div className="w-24 h-px bg-muted-burgundy-rose mx-auto opacity-50"></div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {cards.map((service: any) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-0 border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-muted-burgundy-rose/30"
            >
              <span className="text-4xl font-serif text-deep-midnight-navy opacity-10 mb-2 group-hover:opacity-20 transition-opacity">
                {service.id}
              </span>
              <h3 className="text-lg font-bold text-muted-burgundy-rose uppercase tracking-wider mb-4">
                {service.title}
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-6 grow">
                {service.description}
              </p>
              <Link
                href="/appointment"
                className="flex items-center text-deep-midnight-navy text-xs font-bold uppercase tracking-[0.2em]
                group-hover:text-muted-burgundy-rose group-focus-within:text-muted-burgundy-rose active:text-muted-burgundy-rose
                transition-colors"
                aria-label={`Let's talk about ${service.title}`}
              >
                {service.ctaLabel || "Let's Talk"}
                <ArrowRight
                  className="ml-2 w-4 h-4 transition-transform
                  group-hover:translate-x-2 group-focus-within:translate-x-2 active:translate-x-2"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceQuestions;
