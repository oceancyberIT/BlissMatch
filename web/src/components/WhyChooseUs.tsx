import { ShieldCheck, Heart, UserCheck, Sparkles } from "lucide-react";
import ValueItem from "./ValueItems";

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <span className="text-muted-burgundy-rose text-xs font-bold uppercase tracking-[0.2em] mb-6 block">
              The BlissMatch Distinction
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight mb-5">
              Because love <br />
              <span className="italic">deserves craft.</span>
            </h2>

            <div className="space-y-8 text-stone-600 text-lg md:text-[18px] leading-relaxed max-w-2xl">
              <p>
                At BlissMatch, we bring together relationship counseling, human
                psychology, emotional intelligence, and culture. We listen
                deeply before we introduce.
                <span className="text-deep-midnight-navy font-medium">
                  {" "}
                  We see the human beyond the profile.
                </span>
              </p>

              <div className="py-4 border-y border-stone-100">
                <p className="text-muted-burgundy-rose font-serif italic text-xl">
                  “We are not an app. We are an ally.”
                </p>
              </div>

              <p className="text-base text-stone-500">
                Our clients choose us because they value substance over speed,
                privacy over publicity, and timeless connection over fleeting
                encounters. We believe that real love isn’t rare.{" "}
                <span className="text-deep-midnight-navy font-semibold underline decoration-muted-burgundy-rose underline-offset-4">
                  It’s just rarely done right.
                </span>
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 self-center">
            <ValueItem
              icon={<ShieldCheck size={24} />}
              title="Confidentiality"
              desc="Absolute discretion in every interaction."
            />
            <ValueItem
              icon={<UserCheck size={24} />}
              title="Psychology"
              desc="Rooted in human behavior studies."
            />
            <ValueItem
              icon={<Heart size={24} />}
              title="Substance"
              desc="Depth over digital algorithms."
            />
            <ValueItem
              icon={<Sparkles size={24} />}
              title="Craft"
              desc="Bespoke matchmaking at its finest."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
