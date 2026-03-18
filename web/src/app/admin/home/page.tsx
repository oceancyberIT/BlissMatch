// 'use client';

// import { useState } from 'react';
// import AdminLayout from '@/components/admin/admin-layout';
// import { Button } from '@/components/ui/button';

// export default function AdminHomePage() {
//   const [message, setMessage] = useState<string | null>(null);

//   const [heroTagline, setHeroTagline] = useState('Where Love Meets Intention');
//   const [heroTitle, setHeroTitle] = useState(
//     'Building great relationships leads to an amazing life!',
//   );
//   const [heroSubtitle, setHeroSubtitle] = useState(
//     'Expert relationship consultancy designed to help you navigate the complexities of love, connection, and lasting partnership.',
//   );
//   const [heroPrimaryCta, setHeroPrimaryCta] = useState(
//     'Book a Private Consultation',
//   );
//   const [heroSecondaryCta, setHeroSecondaryCta] = useState(
//     'Explore Services',
//   );

//   const [storyHeading, setStoryHeading] = useState('Our Story');
//   const [storyBody, setStoryBody] = useState(
//     'Bliss Match is a private matchmaking consultancy in London serving discerning clients who value intentional, values-led relationships.',
//   );

//   const [serviceHeading, setServiceHeading] = useState(
//     'How we can support you',
//   );
//   const [serviceIntro, setServiceIntro] = useState(
//     'From private matchmaking to relationship coaching, each offering is designed to meet you where you are.',
//   );

//   const [loveHeading, setLoveHeading] = useState('Love, but more intentional');
//   const [loveBody, setLoveBody] = useState(
//     'We prioritise values, lifestyle, and long-term compatibility over quick matches.',
//   );

//   const [blissCircleHeading, setBlissCircleHeading] = useState(
//     'The Bliss Circle',
//   );
//   const [blissCircleBody, setBlissCircleBody] = useState(
//     'An intimate circle for clients ready to invest deeply in their search for lasting partnership.',
//   );

//   const [whyHeading, setWhyHeading] = useState('Why clients choose Bliss Match');
//   const [whyPoints, setWhyPoints] = useState(
//     'Discreet and personal service\nValues-led matching\nThoughtful, human guidance at every step',
//   );

//   const [successHeading, setSuccessHeading] = useState('Success stories');
//   const [successIntro, setSuccessIntro] = useState(
//     'A glimpse into lives quietly transformed through Bliss Match.',
//   );

//   function handleSaveLocally() {
//     setMessage(
//       'Changes saved in this admin view. Next step is wiring these fields to your backend and homepage components.',
//     );
//   }

//   return (
//     <AdminLayout
//       title="Home Page"
//       description="Edit the hero, story, and key sections shown on the public homepage."
//     >
//       <div className="space-y-10">
//         {/* HERO */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Hero section
//           </h2>
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//                 Tagline (eyebrow)
//               </label>
//               <input
//                 value={heroTagline}
//                 onChange={(e) => setHeroTagline(e.target.value)}
//                 className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//                 Main title
//               </label>
//               <input
//                 value={heroTitle}
//                 onChange={(e) => setHeroTitle(e.target.value)}
//                 className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Supporting paragraph
//             </label>
//             <textarea
//               value={heroSubtitle}
//               onChange={(e) => setHeroSubtitle(e.target.value)}
//               rows={3}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//                 Primary button label
//               </label>
//               <input
//                 value={heroPrimaryCta}
//                 onChange={(e) => setHeroPrimaryCta(e.target.value)}
//                 className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//                 Secondary button label
//               </label>
//               <input
//                 value={heroSecondaryCta}
//                 onChange={(e) => setHeroSecondaryCta(e.target.value)}
//                 className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//               />
//             </div>
//           </div>
//         </section>

//         {/* OUR STORY */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Our Story
//           </h2>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Section heading
//             </label>
//             <input
//               value={storyHeading}
//               onChange={(e) => setStoryHeading(e.target.value)}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Main copy
//             </label>
//             <textarea
//               value={storyBody}
//               onChange={(e) => setStoryBody(e.target.value)}
//               rows={4}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//         </section>

//         {/* SERVICES OVERVIEW */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Services overview
//           </h2>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Section heading
//             </label>
//             <input
//               value={serviceHeading}
//               onChange={(e) => setServiceHeading(e.target.value)}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Intro copy
//             </label>
//             <textarea
//               value={serviceIntro}
//               onChange={(e) => setServiceIntro(e.target.value)}
//               rows={3}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//         </section>

//         {/* LOVE CONNECTION SECTION */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Love connection section
//           </h2>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Heading
//             </label>
//             <input
//               value={loveHeading}
//               onChange={(e) => setLoveHeading(e.target.value)}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Supporting copy
//             </label>
//             <textarea
//               value={loveBody}
//               onChange={(e) => setLoveBody(e.target.value)}
//               rows={3}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//         </section>

//         {/* BLISS CIRCLE */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Bliss Circle highlight
//           </h2>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Heading
//             </label>
//             <input
//               value={blissCircleHeading}
//               onChange={(e) => setBlissCircleHeading(e.target.value)}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Intro copy
//             </label>
//             <textarea
//               value={blissCircleBody}
//               onChange={(e) => setBlissCircleBody(e.target.value)}
//               rows={3}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//         </section>

//         {/* WHY CHOOSE US */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Why choose us
//           </h2>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Section heading
//             </label>
//             <input
//               value={whyHeading}
//               onChange={(e) => setWhyHeading(e.target.value)}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Key points (one per line)
//             </label>
//             <textarea
//               value={whyPoints}
//               onChange={(e) => setWhyPoints(e.target.value)}
//               rows={4}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//         </section>

//         {/* SUCCESS STORIES */}
//         <section className="space-y-4">
//           <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
//             Success stories
//           </h2>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Section heading
//             </label>
//             <input
//               value={successHeading}
//               onChange={(e) => setSuccessHeading(e.target.value)}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
//               Intro copy
//             </label>
//             <textarea
//               value={successIntro}
//               onChange={(e) => setSuccessIntro(e.target.value)}
//               rows={3}
//               className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
//             />
//           </div>
//         </section>

//         <div className="flex items-center justify-between pt-4 border-t border-stone-100">
//           {message && (
//             <p className="text-xs text-stone-500 max-w-md">{message}</p>
//           )}
//           <Button
//             type="button"
//             onClick={handleSaveLocally}
//             className="rounded-full bg-deep-midnight-navy text-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] hover:bg-muted-burgundy-rose"
//           >
//             Save homepage content
//           </Button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// // 'use client';

// // import AdminLayout from '@/components/admin/admin-layout';

// // export default function AdminHomeEditPage() {
// //   return (
// //     <AdminLayout
// //       title="Home Page"
// //       description="Edit the hero, story, and key sections shown on the public homepage."
// //     >
// //       <div className="space-y-4">
// //         <p className="text-sm text-stone-600">
// //           This area will let you adjust the main hero copy, featured sections
// //           (Our Story, Services overview, Bliss Circle, and success stories),
// //           so the front page always reflects your current focus.
// //         </p>
// //         <p className="text-xs text-stone-400">
// //           Coming next: structured controls for headings, subcopy, CTAs, and
// //           imagery pulled from the live homepage.
// //         </p>
// //       </div>
// //     </AdminLayout>
// //   );
// // }


'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Save, Layout as LayoutIcon, Type, MousePointer2 } from 'lucide-react';

export default function AdminHomePage() {
  const [message, setMessage] = useState<string | null>(null);

  // State Logic (Unchanged)
  const [heroTagline, setHeroTagline] = useState('Where Love Meets Intention');
  const [heroTitle, setHeroTitle] = useState('Building great relationships leads to an amazing life!');
  const [heroSubtitle, setHeroSubtitle] = useState('Expert relationship consultancy designed to help you navigate the complexities of love, connection, and lasting partnership.');
  const [heroPrimaryCta, setHeroPrimaryCta] = useState('Book a Private Consultation');
  const [heroSecondaryCta, setHeroSecondaryCta] = useState('Explore Services');
  const [storyHeading, setStoryHeading] = useState('Our Story');
  const [storyBody, setStoryBody] = useState('Bliss Match is a private matchmaking consultancy in London serving discerning clients who value intentional, values-led relationships.');
  const [serviceHeading, setServiceHeading] = useState('How we can support you');
  const [serviceIntro, setServiceIntro] = useState('From private matchmaking to relationship coaching, each offering is designed to meet you where you are.');
  const [loveHeading, setLoveHeading] = useState('Love, but more intentional');
  const [loveBody, setLoveBody] = useState('We prioritise values, lifestyle, and long-term compatibility over quick matches.');
  const [blissCircleHeading, setBlissCircleHeading] = useState('The Bliss Circle');
  const [blissCircleBody, setBlissCircleBody] = useState('An intimate circle for clients ready to invest deeply in their search for lasting partnership.');
  const [whyHeading, setWhyHeading] = useState('Why clients choose Bliss Match');
  const [whyPoints, setWhyPoints] = useState('Discreet and personal service\nValues-led matching\nThoughtful, human guidance at every step');
  const [successHeading, setSuccessHeading] = useState('Success stories');
  const [successIntro, setSuccessIntro] = useState('A glimpse into lives quietly transformed through Bliss Match.');

  function handleSaveLocally() {
    setMessage('Changes saved in this admin view. Next step: backend integration.');
    setTimeout(() => setMessage(null), 5000);
  }

  // Sub-component for form rows to keep the JSX clean
  const FormField = ({ label, children, description }: any) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
          {label}
        </label>
        {description && <span className="text-[9px] text-stone-300 italic">{description}</span>}
      </div>
      {children}
    </div>
  );

  return (
    <AdminLayout
      title="Homepage Editor"
      description="Manage the narrative and visual cues of your digital storefront."
    >
      <div className="max-w-5xl space-y-12 p-5">
        
        {/* HERO SECTION */}
        <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3 border-b border-stone-50 pb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-400">
              <LayoutIcon size={16} />
            </div>
            <h2 className="font-serif text-xl text-deep-midnight-navy">Hero Narrative</h2>
          </div>
          
          <div className="grid gap-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Tagline / Eyebrow">
                <input
                  value={heroTagline}
                  onChange={(e) => setHeroTagline(e.target.value)}
                  className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm transition-colors focus:border-muted-burgundy-rose outline-none"
                />
              </FormField>
              <FormField label="Main Heading Title">
                <input
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm transition-colors focus:border-muted-burgundy-rose outline-none font-serif italic"
                />
              </FormField>
            </div>

            <FormField label="Supporting Subtext">
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={2}
                className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm transition-colors focus:border-muted-burgundy-rose outline-none resize-none"
              />
            </FormField>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Primary CTA" description="Main action button">
                <div className="flex items-center gap-2 border-b border-stone-200 focus-within:border-muted-burgundy-rose transition-colors">
                  <MousePointer2 size={12} className="text-stone-300" />
                  <input
                    value={heroPrimaryCta}
                    onChange={(e) => setHeroPrimaryCta(e.target.value)}
                    className="w-full bg-transparent py-2 text-sm outline-none"
                  />
                </div>
              </FormField>
              <FormField label="Secondary CTA" description="Alternative link">
                <div className="flex items-center gap-2 border-b border-stone-200 focus-within:border-muted-burgundy-rose transition-colors">
                  <MousePointer2 size={12} className="text-stone-300" />
                  <input
                    value={heroSecondaryCta}
                    onChange={(e) => setHeroSecondaryCta(e.target.value)}
                    className="w-full bg-transparent py-2 text-sm outline-none"
                  />
                </div>
              </FormField>
            </div>
          </div>
        </div>

        {/* CORE STORY & PHILOSOPHY */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Story Card */}
          <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-lg text-deep-midnight-navy">Brand Story</h2>
            <div className="space-y-6">
              <FormField label="Heading">
                <input
                  value={storyHeading}
                  onChange={(e) => setStoryHeading(e.target.value)}
                  className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
              <FormField label="Body Copy">
                <textarea
                  value={storyBody}
                  onChange={(e) => setStoryBody(e.target.value)}
                  rows={4}
                  className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose leading-relaxed"
                />
              </FormField>
            </div>
          </div>

          {/* Love Connection Card */}
          <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-lg text-deep-midnight-navy">Intentionality Section</h2>
            <div className="space-y-6">
              <FormField label="Section Heading">
                <input
                  value={loveHeading}
                  onChange={(e) => setLoveHeading(e.target.value)}
                  className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
              <FormField label="Supporting Statement">
                <textarea
                  value={loveBody}
                  onChange={(e) => setLoveBody(e.target.value)}
                  rows={4}
                  className="w-full rounded-none border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose leading-relaxed"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* SERVICE OFFERINGS & BLISS CIRCLE */}
        <div className="rounded-2xl border border-stone-100 bg-stone-900 p-8 shadow-sm text-white">
          <div className="mb-8 border-b border-white/10 pb-5">
            <h2 className="font-serif text-xl">Service Strategy</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <FormField label="Service Intro Heading">
                <input
                  value={serviceHeading}
                  onChange={(e) => setServiceHeading(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
              <FormField label="Introduction Text">
                <textarea
                  value={serviceIntro}
                  onChange={(e) => setServiceIntro(e.target.value)}
                  rows={3}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-stone-300 outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
            </div>
            <div className="space-y-6 border-l border-white/10 pl-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-burgundy-rose" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-burgundy-rose">Premium Tier</span>
              </div>
              <FormField label="The Bliss Circle Heading">
                <input
                  value={blissCircleHeading}
                  onChange={(e) => setBlissCircleHeading(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-muted-burgundy-rose font-serif italic"
                />
              </FormField>
              <FormField label="Circle Description">
                <textarea
                  value={blissCircleBody}
                  onChange={(e) => setBlissCircleBody(e.target.value)}
                  rows={3}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-stone-300 outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* TRUST SIGNALS: WHY & SUCCESS */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-lg text-deep-midnight-navy">Trust Factors</h2>
            <div className="space-y-6">
              <FormField label="Why Us Heading">
                <input
                  value={whyHeading}
                  onChange={(e) => setWhyHeading(e.target.value)}
                  className="w-full border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
              <FormField label="Values / Points" description="Standard list view">
                <textarea
                  value={whyPoints}
                  onChange={(e) => setWhyPoints(e.target.value)}
                  rows={4}
                  className="w-full border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose font-mono text-xs tracking-tight"
                />
              </FormField>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-lg text-deep-midnight-navy">Social Proof</h2>
            <div className="space-y-6">
              <FormField label="Success Heading">
                <input
                  value={successHeading}
                  onChange={(e) => setSuccessHeading(e.target.value)}
                  className="w-full border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose"
                />
              </FormField>
              <FormField label="Stories Introduction">
                <textarea
                  value={successIntro}
                  onChange={(e) => setSuccessIntro(e.target.value)}
                  rows={4}
                  className="w-full border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-muted-burgundy-rose leading-relaxed"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* FIXED FOOTER ACTION BAR */}
        <div className=" bottom-0 left-0 right-0 z-50 ml-0 flex items-center justify-between border-t border-stone-100 bg-white/80 px-12 py-4 backdrop-blur-md md:left-72">
          <div className="flex items-center gap-3">
            {message ? (
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-burgundy-rose">
                <div className="h-1 w-1 animate-pulse rounded-full bg-muted-burgundy-rose" />
                {message}
              </div>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300">Unsaved Session</span>
            )}
          </div>
          <Button
            type="button"
            onClick={handleSaveLocally}
            className="group flex items-center gap-3 rounded-full bg-deep-midnight-navy px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-xl transition-all hover:bg-muted-burgundy-rose"
          >
            <Save size={14} className="transition-transform group-hover:-translate-y-0.5" />
            Publish Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}