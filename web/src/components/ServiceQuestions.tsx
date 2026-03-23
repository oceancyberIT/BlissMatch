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
    <section className="bg-soft-ivory-white py-20 lg:py-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy mb-4">
            {heading}
          </h2>
          {/* <div className="w-24 h-px bg-muted-burgundy-rose mx-auto opacity-50"></div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {cards.map((service: any) => (
            <div key={service.id} className="group flex flex-col">
              <span className="text-6xl font-serif text-deep-midnight-navy opacity-10 mb-2 group-hover:opacity-20 transition-opacity">
                {service.id}
              </span>
              <h3 className="text-xl font-bold text-muted-burgundy-rose uppercase tracking-wider mb-4">
                {service.title}
              </h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-6 grow">
                {service.description}
              </p>
              <button className="flex items-center text-deep-midnight-navy text-xs font-bold uppercase tracking-[0.2em] group-hover:text-muted-burgundy-rose transition-colors">
                {service.ctaLabel || "Let's Talk"}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceQuestions;
