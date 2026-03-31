export default function TermsPage() {
  return (
    <main className="mx-auto mt-[var(--site-header-offset)] max-w-4xl px-6 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-burgundy-rose">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-serif text-deep-midnight-navy md:text-4xl">
        Terms of Service
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-700 md:text-base">
        <p>
          By using BlissMatch services, you agree to engage respectfully and to
          provide accurate information during consultations and onboarding.
        </p>
        <p>
          Services are provided privately and by appointment. Outcomes are
          individualized and cannot be guaranteed.
        </p>
        <p>
          For questions about these terms or specific agreements, please contact
          us through the contact page.
        </p>
      </div>
    </main>
  );
}
