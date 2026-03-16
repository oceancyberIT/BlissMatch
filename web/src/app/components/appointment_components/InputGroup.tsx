const InputGroup = ({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div className="flex flex-col space-y-2 border-b border-stone-200 focus-within:border-muted-burgundy-rose transition-colors pb-2">
    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
      {label}
    </label>
    <input
      type={type}
      className="bg-transparent outline-none text-deep-midnight-navy font-light pt-2"
      placeholder={placeholder}
    />
  </div>
);

export default InputGroup;
