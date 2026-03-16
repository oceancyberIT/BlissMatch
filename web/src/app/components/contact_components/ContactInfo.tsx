const ContactInfo = ({
  icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href?: string;
}) => (
  <div className="flex items-center gap-4 text-stone-500 hover:text-deep-midnight-navy transition-colors">
    <div className="text-muted-burgundy-rose">{icon}</div>
    {href ? (
      <a href={href} className="text-sm tracking-wide">
        {label}
      </a>
    ) : (
      <span className="text-sm tracking-wide">{label}</span>
    )}
  </div>
);

export default ContactInfo;
