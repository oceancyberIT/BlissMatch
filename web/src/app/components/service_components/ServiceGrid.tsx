const ServiceGrid = () => {
  const services = [
    {
      title: "Private Matchmaking",
      desc: "A bespoke, confidential experience for global citizens seeking lasting love.",
      // icon: "01",
      size: "lg",
    },
    {
      title: "Relationship Coaching",
      desc: "Strengthen communication and resolve emotional barriers.",
      // icon: "02",
      size: "sm",
    },
    {
      title: "Image & Confidence",
      desc: "Radiate authenticity through body language and personal presentation.",
      // icon: "03",
      size: "sm",
    },
    {
      title: "Dating Concierge",
      desc: "Elegant, personalized date experiences designed for comfort and memory.",
      // icon: "04",
      size: "sm",
    },
  ];

  return (
    <section className="py-20 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className={`p-10 border border-stone-100 group hover:border-muted-burgundy-rose transition-colors duration-500
            ${s.size === "lg" ? "md:col-span-8 bg-[#F9F7F5]" : "md:col-span-4"}`}
          >
            {/* <span className="text-muted-burgundy-rose font-serif italic text-4xl mb-6 block opacity-20 group-hover:opacity-100">
              {s.icon}
            </span> */}
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
              Coming Soon
            </span>
            <h3 className="text-3xl font-serif mt-2">Retreats & Experiences</h3>
          </div>
          <p className="text-white/60 max-w-sm mt-4 md:mt-0 italic">
            Refined spaces for connection, reflection, and discovery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
