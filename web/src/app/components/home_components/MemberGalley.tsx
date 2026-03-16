"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { members } from "@/app/data/constant";

const MemberGallery = () => {
  return (
    <section className="relative min-h-screen bg-warm-linen py-24 lg:py-12 overflow-hidden">
      <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none">
        <h2 className="text-[20vw] font-serif font-bold text-deep-midnight-navy">
          Exceptional Individuals
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-4 relative z-10">
        <div className="text-center mb-20 lg:mb-8">
          <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            The Circle
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy">
            Meet our <span className="italic">extraordinary</span> members
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: member.delay, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`relative group ${index === 1 ? "md:mt-20" : "md:mt-0"}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-sm shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-deep-midnight-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <p className="text-xs uppercase tracking-widest font-bold mb-1">
                    {member.location}
                  </p>
                  <h4 className="text-2xl font-serif italic">{member.name}</h4>
                </div>
              </div>

              <div className="mt-6 text-center md:text-left">
                <div className="h-px w-8 bg-muted-burgundy-rose mb-4 mx-auto md:mx-0"></div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-deep-midnight-navy">
                  {member.name}
                </h4>
                <p className="text-xs text-stone-400 italic mt-1">
                  {member.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 lg:mt-10 text-center">
          <p className="text-stone-500 text-sm italic max-w-lg mx-auto leading-relaxed">
            We respect the total privacy of our members. Profiles shown are for
            illustrative purposes to represent our high-caliber community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemberGallery;
