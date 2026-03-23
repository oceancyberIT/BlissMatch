import type React from "react";

const InputGroup = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  required,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}) => (
  <div className="flex flex-col space-y-2 border-b border-stone-200 focus-within:border-muted-burgundy-rose transition-colors pb-2">
    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="bg-transparent outline-none text-deep-midnight-navy font-light pt-2"
      placeholder={placeholder}
    />
  </div>
);

export default InputGroup;
