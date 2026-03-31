
import { Plus, Trash2, LayoutGrid, Type } from "lucide-react";
import { FormField } from "./form-field";
import { ImageUrlField } from "./image-url-field";
import { cn } from "@/lib/utils";

const COLLAGE_SLOT_LABELS = [
  "Large tile (left)",
  "Top right",
  "Middle right",
  "Bottom left",
  "Bottom centre",
  "Bottom right",
];

const inputStyle =
  "w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all";

type CollagePatch = {
  url?: string;
  alt?: string;
  objectPosition?: string;
};

export function ServicesOverviewSection({
  data,
  selectedIndex,
  setSelectedIndex,
  onHeadingChange,
  onAdd,
  onDelete,
  onUpdateCard,
  onIntroFieldChange,
  onUpdateCollageSlot,
}: {
  data: any;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  onHeadingChange: (v: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  onUpdateCard: (index: number, patch: Record<string, unknown>) => void;
  onIntroFieldChange: (field: string, value: string) => void;
  onUpdateCollageSlot: (index: number, patch: CollagePatch) => void;
}) {
  const collage = data.collageImages ?? [];

  return (
    <div className="space-y-8">
      <section className="space-y-6 pb-8 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <LayoutGrid size={14} className="text-muted-burgundy-rose" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            Homepage — Our Service block
          </h3>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          Left column text and image collage beside it on the home page. The section below controls the
          large &ldquo;Elevated Relational Support&rdquo; grid.
        </p>

        <FormField label="Eyebrow" hint="Small label above the paragraph (e.g. Our Service)">
          <input
            value={data.introEyebrow ?? ""}
            onChange={(e) => onIntroFieldChange("introEyebrow", e.target.value)}
            className={inputStyle}
          />
        </FormField>

        <FormField label="Intro paragraph">
          <textarea
            rows={4}
            value={data.introLead ?? ""}
            onChange={(e) => onIntroFieldChange("introLead", e.target.value)}
            className={cn(inputStyle, "resize-none leading-relaxed")}
          />
        </FormField>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Link text">
            <input
              value={data.introCtaLabel ?? ""}
              onChange={(e) => onIntroFieldChange("introCtaLabel", e.target.value)}
              className={inputStyle}
            />
          </FormField>
          <FormField label="Link URL" hint="Usually /services">
            <input
              value={data.introCtaHref ?? ""}
              onChange={(e) => onIntroFieldChange("introCtaHref", e.target.value)}
              className={cn(inputStyle, "font-mono text-[12px]")}
            />
          </FormField>
        </div>

        <div className="space-y-4 pt-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
            Collage — six images (order matches homepage bento)
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {COLLAGE_SLOT_LABELS.map((label, i) => (
              <div
                key={label}
                className="rounded-2xl border border-stone-100 bg-stone-50/30 p-4 space-y-3"
              >
                <p className="text-[10px] font-bold text-stone-500">
                  {i + 1}. {label}
                </p>
                <FormField label="Image">
                  <ImageUrlField
                    value={collage[i]?.url ?? ""}
                    onChange={(v) => onUpdateCollageSlot(i, { url: v })}
                    urlInputClassName={cn(inputStyle, "font-mono text-[12px]")}
                  />
                </FormField>
                <FormField label="Alt text">
                  <input
                    value={collage[i]?.alt ?? ""}
                    onChange={(e) => onUpdateCollageSlot(i, { alt: e.target.value })}
                    className={inputStyle}
                  />
                </FormField>
                <FormField
                  label="Object position (optional)"
                  hint="CSS value, e.g. center 35% — helps crop focus"
                >
                  <input
                    value={collage[i]?.objectPosition ?? ""}
                    onChange={(e) =>
                      onUpdateCollageSlot(i, {
                        objectPosition: e.target.value.trim() || undefined,
                      })
                    }
                    className={cn(inputStyle, "font-mono text-[12px]")}
                    placeholder="center"
                  />
                </FormField>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex items-center gap-2">
        <Type size={14} className="text-muted-burgundy-rose" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
          Service grid section
        </h3>
      </div>
      <p className="text-[11px] text-stone-500 -mt-4 mb-2">
        Heading and cards for the dark band below (four service pillars).
      </p>

      <FormField label="Section heading">
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
