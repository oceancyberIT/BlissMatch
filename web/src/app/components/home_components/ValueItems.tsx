const ValueItem = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div
    className="group flex flex-col space-y-4 p-5 bg-white border border-stone-100 
                  shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] 
                  transition-all duration-500 ease-out
                  hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] 
                  hover:-translate-y-2 hover:border-muted-burgundy-rose/20"
  >
    <div
      className="w-12 h-12 flex items-center justify-center rounded-lg bg-stone-50 
                    text-muted-burgundy-rose transition-colors duration-500 
                    group-hover:bg-muted-burgundy-rose group-hover:text-white mb-2"
    >
      {icon}
    </div>
    <h4
      className="text-xs font-bold uppercase tracking-[0.2em] text-deep-midnight-navy 
                   group-hover:text-muted-burgundy-rose transition-colors duration-500"
    >
      {title}
    </h4>

    <p className="text-sm text-stone-500 leading-relaxed transition-colors duration-500 group-hover:text-stone-600">
      {desc}
    </p>

    <div className="pt-4">
      <div className="h-0.5 w-0 bg-muted-burgundy-rose transition-all duration-500 group-hover:w-full opacity-30" />
    </div>
  </div>
);

export default ValueItem;
