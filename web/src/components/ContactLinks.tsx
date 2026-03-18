const ContactLink = ({
  icon,
  title,
  subtitle,
  href,
}: {
  icon: any;
  title: string;
  subtitle: string;
  href: string;
}) => (
  <a
    href={href}
    className="group flex items-center gap-6 p-6 bg-white border border-stone-100 hover:border-muted-burgundy-rose/30 transition-all duration-500 rounded-sm"
  >
    <div className="text-muted-burgundy-rose group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <div>
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-deep-midnight-navy">
        {title}
      </h4>
      <p className="text-stone-400 text-sm font-light mt-1">{subtitle}</p>
    </div>
  </a>
);

export default ContactLink;
