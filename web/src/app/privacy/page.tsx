export default function PrivacyPage() {
  return (
    <main className="mx-auto mt-[var(--site-header-offset)] max-w-4xl px-6 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-burgundy-rose">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-serif text-deep-midnight-navy md:text-4xl">
        Privacy Policy
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-700 md:text-base">
        <p>
          BlissMatch respects your privacy. We only collect information required
          to provide our services, communicate with you, and fulfill legal
          obligations.
        </p>
        <p>
          Your personal details are treated as confidential and are never sold.
          Access is limited to authorized team members and trusted processors
          involved in service delivery.
        </p>
        <p>
          If you would like to update or remove your information, please contact
          us via the contact page.
        </p>
      </div>
    </main>
  );
}
