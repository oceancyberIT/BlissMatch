"use client";
import { ServicesContent } from "@/components/admin/services-editor/types";
import { INITIAL_SERVICES_CONTENT } from "@/components/admin/services-editor/constants";

type ServiceGridProps = {
  data?: ServicesContent["grid"];
};

const ServiceGrid = ({ data }: ServiceGridProps) => {
  const grid = data ?? INITIAL_SERVICES_CONTENT.grid;
  const services = grid.cards;
  const banner = grid.banner;

  return (
    <section className="py-20 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className={`p-10 border border-stone-100 group hover:border-muted-burgundy-rose transition-colors duration-500
            ${s.size === "lg" ? "md:col-span-8 bg-[#F9F7F5]" : "md:col-span-4"}`}
          >
            <h3 className="text-2xl font-serif text-deep-midnight-navy mb-4">
              {s.title}
            </h3>
            <p className="text-stone-500 leading-relaxed">{s.desc}</p>
            {s.size === "lg" && (
              <div className="mt-8 h-px w-20 bg-muted-burgundy-rose group-hover:w-full transition-all duration-700" />
            )}
          </div>
        ))}

        <div className="md:col-span-12 bg-deep-midnight-navy p-12 rounded-sm flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <span className="text-muted-burgundy-rose text-[10px] font-bold tracking-widest uppercase">
              {banner.eyebrow}
            </span>
            <h3 className="text-3xl font-serif mt-2">{banner.title}</h3>
          </div>
          <p className="text-white/60 max-w-sm mt-4 md:mt-0 italic">
            {banner.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
