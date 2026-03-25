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
      <div className="flex min-w-0 flex-col gap-1 pl-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <label className="min-w-0 text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 transition-colors group-focus-within:text-muted-burgundy-rose">
          {label}
        </label>
        {hint ? (
          <span className="shrink-0 text-[9px] font-bold uppercase italic text-stone-300 sm:max-w-[50%] sm:text-right">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}