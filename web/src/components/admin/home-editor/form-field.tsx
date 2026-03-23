// import React from 'react';

// export function FormField({
//   label,
//   children,
//   hint,
// }: {
//   label: string;
//   children: React.ReactNode;
//   hint?: string;
// }) {
//   return (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between">
//         <label className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
//           {label}
//         </label>
//         {hint ? <span className="text-[10px] text-stone-400">{hint}</span> : null}
//       </div>
//       {children}
//     </div>
//   );
// }

import React from 'react';

export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center justify-between pl-1">
        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 group-focus-within:text-muted-burgundy-rose transition-colors">
          {label}
        </label>
        {hint ? <span className="text-[9px] font-bold text-stone-300 uppercase italic">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}