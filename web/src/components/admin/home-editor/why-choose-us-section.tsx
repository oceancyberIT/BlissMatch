import { cn } from "@/lib/utils";
import { FormField } from "./form-field";
import { Plus, Trash2 } from "lucide-react";

export function WhyChooseUsSection({ data, selectedIndex, setSelectedIndex, onFieldChange, onAddValueCard, onDeleteValueCard, onUpdateValueCard }: any) {
  const inputStyle = "w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm text-deep-midnight-navy outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <FormField label="Small line above the title">
        <input value={data.eyebrow} onChange={(e) => onFieldChange('eyebrow', e.target.value)} className={inputStyle} />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Main heading">
          <input value={data.headingMain} onChange={(e) => onFieldChange('headingMain', e.target.value)} className={inputStyle} />
        </FormField>
        <FormField label="Second line (italics)">
          <input value={data.headingAccent} onChange={(e) => onFieldChange('headingAccent', e.target.value)} className={inputStyle} />
        </FormField>
      </div>

      <FormField label="Intro text">
        <textarea rows={3} value={data.paragraphOne} onChange={(e) => onFieldChange('paragraphOne', e.target.value)} className={cn(inputStyle, "resize-none")} />
      </FormField>

      {/* Points (sidebar + editor) */}
      <div className="grid gap-6 md:grid-cols-[220px_1fr] pt-6 border-t border-stone-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Points</p>
            <button onClick={onAddValueCard} className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"><Plus size={14} /></button>
          </div>
          <div className="space-y-2">
            {data.valueCards.map((card: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-tight",
                  selectedIndex === index ? "bg-white border-muted-burgundy-rose shadow-sm text-deep-midnight-navy" : "bg-stone-50/50 border-transparent text-stone-400 hover:border-stone-200"
                )}
              >
                {card.title || `Point ${index + 1}`}
                <Trash2 size={12} className="hover:text-red-500" onClick={(e) => { e.stopPropagation(); onDeleteValueCard(index); }} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-stone-50/30 rounded-2xl p-6 border border-stone-100 space-y-6">
          {data.valueCards[selectedIndex] ? (
            <>
              <FormField label="Title">
                <input value={data.valueCards[selectedIndex].title} onChange={(e) => onUpdateValueCard(selectedIndex, { title: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30" />
              </FormField>
              <FormField label="Description">
                <textarea rows={3} value={data.valueCards[selectedIndex].description} onChange={(e) => onUpdateValueCard(selectedIndex, { description: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30 resize-none" />
              </FormField>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-[10px] font-bold text-stone-300 uppercase tracking-widest italic">Add a point to start</div>
          )}
        </div>
      </div>
    </div>
  );
}