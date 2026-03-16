const PrivacyCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="p-8 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
    <div className="text-muted-burgundy-rose mb-4 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-3">
      {title}
    </h4>
    <p className="text-stone-400 text-xs leading-relaxed">{desc}</p>
  </div>
);

export default PrivacyCard;
