"use client";
import Image from "next/image";
import {
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";
import ContactLink from "@/components/ContactLinks";
import InputGroup from "@/components/InputGroup";

const AppointmentPage = () => {
  return (
    // Change pt-12 to pt-40 (or 48 depending on your exact header height)
    <main className="min-h-screen bg-soft-ivory-white pt-38 md:pt-48 pb-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER: Tightened spacing --- */}
        <div className="mb-8 md:mb-10 lg:w-2/3">
          <span className="text-muted-burgundy-rose text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
            Begin Your Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-midnight-navy leading-tight tracking-tighter">
            Let’s <span className="italic">Connect</span>
          </h1>
          <p className="mt-3 text-stone-500 text-sm md:text-base font-light leading-relaxed max-w-lg">
            Our advisors are here to listen with absolute discretion.
          </p>
        </div>

        {/* --- GRID: items-start ensures components don't center vertically --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Image & Tertiary Links */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative aspect-[4/5] md:aspect-[4.5/5] rounded-t-full overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/image.png"
                alt="A couple"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-midnight-navy/20 to-transparent" />
            </div>
          </div>

          {/* RIGHT: Form & Primary Contact Links */}
          <div className="lg:col-span-8 flex flex-col">
            {/* THE FORM: Negative margin-top pulls it up on desktop */}
            <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 relative lg:-mt-40 z-20">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg className="w-full h-full">
                  <rect
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#1a2e4c"
                    strokeWidth="1"
                    strokeDasharray="50 300"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-serif text-deep-midnight-navy mb-7 italic tracking-tight">
                Private Request Form
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  <InputGroup label="Full Name" placeholder="Alexander Vance" />
                  <InputGroup
                    label="Email Address"
                    placeholder="alex@vance.com"
                    type="email"
                  />
                  <InputGroup label="Your Location" placeholder="London, UK" />

                  <div className="flex flex-col space-y-1 border-b border-stone-200 pb-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">
                      Inquiry Type
                    </label>
                    <select className="bg-transparent outline-none text-deep-midnight-navy text-sm font-medium cursor-pointer">
                      <option>Private Matchmaking</option>
                      <option>Relationship Coaching</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 border-b border-stone-200 pb-1.5 pt-2">
                  <label className="text-[9px] uppercase tracking-widest font-black text-stone-400">
                    Your Message
                  </label>
                  <textarea
                    rows={2}
                    className="bg-transparent outline-none text-deep-midnight-navy text-sm font-medium resize-none"
                    placeholder="Briefly share your story..."
                  />
                </div>

                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 opacity-30">
                    <div className="flex flex-col items-center">
                      <Shield size={14} />
                      <span className="text-[6px] uppercase tracking-widest mt-1">
                        Encrypted
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock size={14} />
                      <span className="text-[6px] uppercase tracking-widest mt-1">
                        24h Lead
                      </span>
                    </div>
                  </div>

                  <button className="w-full md:w-auto px-8 py-4 bg-deep-midnight-navy text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-muted-burgundy-rose transition-all shadow-lg">
                    Send Private Request
                  </button>
                </div>
              </form>
            </div>

            {/* CONTACT LINKS: Now integrated directly under form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
              <ContactLink
                icon={<MessageSquare size={16} />}
                title="WhatsApp"
                subtitle="+44 700 000"
                href="#"
              />
              <ContactLink
                icon={<Phone size={16} />}
                title="Callback"
                subtitle="Request Call"
                href="#"
              />
              <ContactLink
                icon={<Mail size={16} />}
                title="Email"
                subtitle="enquiries@bliss"
                href="#"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentPage;
