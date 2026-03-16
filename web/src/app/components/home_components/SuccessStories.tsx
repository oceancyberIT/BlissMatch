"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const stories = [
  {
    quote:
      "I had forgotten what it felt like to be seen. BlissMatch reminded me that love can be elegant and kind.",
    author: "Ella",
    location: "London",
    stars: 5,
  },
  {
    quote:
      "They understood me in a way no app ever could. Every introduction was thoughtful and sincere.",
    author: "Kwame",
    location: "Accra",
    stars: 5,
  },
  {
    quote:
      "Professionalism with heart. Confidential, intuitive, and refined — exactly what I hoped for.",
    author: "Marie",
    location: "Paris",
    stars: 5,
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-[#F9F7F5] py-20 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-10">
          <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-4xl font-serif text-deep-midnight-navy">
            Stories of Connection
          </h2>
          {/* <div className="w-16 h-[1px] bg-muted-burgundy-rose mx-auto mt-6"></div> */}
        </div>

        {/* Stories Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between border-b-2 border-transparent hover:border-muted-burgundy-rose transition-all duration-500 group"
            >
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(story.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-muted-burgundy-rose text-muted-burgundy-rose opacity-60"
                    />
                  ))}
                </div>

                <Quote
                  className="text-stone-100 mb-4 group-hover:text-muted-burgundy-rose/10 transition-colors"
                  size={30}
                />

                <p className="text-deep-midnight-navy text-lg font-serif italic leading-relaxed mb-5">
                  “{story.quote}”
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-widest text-deep-midnight-navy">
                  — {story.author}
                </span>
                <span className="text-xs text-stone-400 mt-1">
                  {story.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 w-full h-1px bg-stone-200 relative text-center">
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-6 bg-[#F9F7F5] text-stone-600 text-[10px] tracking-[0.2em] uppercase font-bold">
            Privacy is our Priority
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
