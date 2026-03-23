
import { Plus, Trash2 } from "lucide-react";
import { FormField } from "./form-field";
import { cn } from "@/lib/utils";

export function ServicesOverviewSection({ data, selectedIndex, setSelectedIndex, onHeadingChange, onAdd, onDelete, onUpdateCard }: any) {
  const inputStyle = "w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all";

  return (
    <div className="space-y-8">
      <FormField label="Heading">
        <input value={data.heading} onChange={(e) => onHeadingChange(e.target.value)} className={inputStyle} />
      </FormField>

      <div className="grid gap-6 md:grid-cols-[220px_1fr] pt-6 border-t border-stone-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Cards</p>
            <button onClick={onAdd} className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all">
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {data.cards.map((card: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all",
                  selectedIndex === index ? "bg-white border-muted-burgundy-rose shadow-sm" : "bg-stone-50/50 border-transparent hover:border-stone-200"
                )}
              >
                <span className={cn("text-[11px] font-bold uppercase", selectedIndex === index ? "text-deep-midnight-navy" : "text-stone-400")}>
                  {card.title || `Card ${index + 1}`}
                </span>
                <Trash2 size={12} className="text-stone-300 hover:text-red-500" onClick={(e) => { e.stopPropagation(); onDelete(index); }} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-stone-50/30 rounded-2xl p-6 border border-stone-100 space-y-6">
          {data.cards[selectedIndex] ? (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Number (e.g. 01.)">
                  <input value={data.cards[selectedIndex].id} onChange={(e) => onUpdateCard(selectedIndex, { id: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30" />
                </FormField>
                <FormField label="Title">
                  <input value={data.cards[selectedIndex].title} onChange={(e) => onUpdateCard(selectedIndex, { title: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30" />
                </FormField>
              </div>
              <FormField label="Short description">
                <textarea rows={3} value={data.cards[selectedIndex].description} onChange={(e) => onUpdateCard(selectedIndex, { description: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30 resize-none" />
              </FormField>
              <FormField label="Button text">
                <input value={data.cards[selectedIndex].ctaLabel} onChange={(e) => onUpdateCard(selectedIndex, { ctaLabel: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30" />
              </FormField>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-[10px] font-bold text-stone-300 uppercase tracking-widest italic">Add a card to start</div>
          )}
        </div>
      </div>
    </div>
  );
}