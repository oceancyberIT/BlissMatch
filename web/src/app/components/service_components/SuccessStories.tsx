const SuccessStories = () => {
  const stories = [
    {
      quote:
        "I had forgotten what it felt like to be seen. Bliss Match reminded me that love can be elegant and kind.",
      author: "Ella",
      city: "London",
    },
    {
      quote:
        "They understood me in a way no app ever could. Every introduction was thoughtful and sincere.",
      author: "Kwame",
      city: "Accra",
    },
  ];

  return (
    <section className="py-32 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-muted-burgundy-rose text-[10px] font-bold tracking-[0.5em] uppercase mb-8 block">
          Stories of Connection
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {stories.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-serif text-deep-midnight-navy italic leading-snug mb-8">
                "{s.quote}"
              </p>
              <div className="h-px w-10 bg-muted-burgundy-rose mb-4" />
              <p className="text-deep-midnight-navy font-bold text-xs uppercase tracking-widest">
                {s.author}, {s.city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
