import { Plus, Trash2 } from "lucide-react";
import { FormField } from "./form-field";
import { cn } from "@/lib/utils";


export function BlissCircleSection({
  data,
  selectedBadgeIndex,
  setSelectedBadgeIndex,
  onFieldChange,
  onAddBadge,
  onDeleteBadge,
  onUpdateBadge,
}: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid gap-6">
        <FormField label="Small line above the title">
          <input
            value={data.eyebrow}
            onChange={(e) => onFieldChange('eyebrow', e.target.value)}
            className="w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm text-deep-midnight-navy outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all"
          />
        </FormField>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Main heading">
            <input
              value={data.headingMain}
              onChange={(e) => onFieldChange('headingMain', e.target.value)}
              className="w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all"
            />
          </FormField>
          <FormField label="Second line (shown in italics)">
            <input
              value={data.headingAccent}
              onChange={(e) => onFieldChange('headingAccent', e.target.value)}
              className="w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all"
            />
          </FormField>
        </div>

        <FormField label="Paragraph">
          <textarea
            rows={3}
            value={data.paragraphOne}
            onChange={(e) => onFieldChange('paragraphOne', e.target.value)}
            className="w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all resize-none"
          />
        </FormField>
      </div>

      {/* Labels */}
      <div className="grid gap-6 md:grid-cols-[220px_1fr] pt-6 border-t border-stone-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Labels</p>
            <button onClick={onAddBadge} className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all">
              <Plus size={14} />
            </button>
          </div>

          <div className="space-y-2">
            {data.badges.map((_: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedBadgeIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedBadgeIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-tighter",
                  selectedBadgeIndex === index 
                    ? "bg-white border-muted-burgundy-rose shadow-sm text-deep-midnight-navy" 
                    : "bg-stone-50/50 border-transparent text-stone-400 hover:border-stone-200"
                )}
              >
                Label {index + 1}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBadge(index);
                    }}
                    className="hover:text-red-500 p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-stone-50/30 rounded-2xl p-6 border border-stone-100">
          {data.badges[selectedBadgeIndex] ? (
            <FormField label={`Text for Label ${selectedBadgeIndex + 1}`}>
              <input
                value={data.badges[selectedBadgeIndex].label}
                onChange={(e) => onUpdateBadge(selectedBadgeIndex, { label: e.target.value })}
                className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30"
              />
            </FormField>
          ) : (
            <div className="h-full flex items-center justify-center text-[10px] font-bold text-stone-400 uppercase tracking-widest italic">
              Select a label or add a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}