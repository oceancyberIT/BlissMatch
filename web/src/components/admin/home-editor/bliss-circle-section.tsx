import { Plus, Trash2, ImageIcon, Type, AlignLeft } from "lucide-react";
import { FormField } from "./form-field";
import { ImageUrlField } from "./image-url-field";
import { cn } from "@/lib/utils";

const inputStyle =
  "w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm text-deep-midnight-navy outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all";

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
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Type size={14} className="text-muted-burgundy-rose" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            Copy
          </h3>
        </div>

        <FormField label="Eyebrow">
          <input
            value={data.eyebrow}
            onChange={(e) => onFieldChange("eyebrow", e.target.value)}
            className={inputStyle}
          />
        </FormField>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Main heading">
            <input
              value={data.headingMain}
              onChange={(e) => onFieldChange("headingMain", e.target.value)}
              className={inputStyle}
            />
          </FormField>
          <FormField label="Second line (italics)">
            <input
              value={data.headingAccent}
              onChange={(e) => onFieldChange("headingAccent", e.target.value)}
              className={inputStyle}
            />
          </FormField>
        </div>

        <FormField label="First paragraph">
          <textarea
            rows={3}
            value={data.paragraphOne}
            onChange={(e) => onFieldChange("paragraphOne", e.target.value)}
            className={cn(inputStyle, "resize-none leading-relaxed")}
          />
        </FormField>

        <FormField label="Second paragraph" hint="Shown under the first on the homepage">
          <textarea
            rows={3}
            value={data.paragraphTwo}
            onChange={(e) => onFieldChange("paragraphTwo", e.target.value)}
            className={cn(inputStyle, "resize-none leading-relaxed")}
          />
        </FormField>
      </section>

      <section className="space-y-6 pt-6 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <ImageIcon size={14} className="text-muted-burgundy-rose" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
            Images
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Left — small card below text
            </p>
            <FormField label="Image URL">
              <ImageUrlField
                value={data.secondaryImageUrl ?? ""}
                onChange={(v) => onFieldChange("secondaryImageUrl", v)}
                urlInputClassName={cn(inputStyle, "font-mono text-[12px]")}
              />
            </FormField>
            <FormField label="Alt text">
              <input
                value={data.secondaryImageAlt ?? ""}
                onChange={(e) => onFieldChange("secondaryImageAlt", e.target.value)}
                className={inputStyle}
              />
            </FormField>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Right — large image with overlay
            </p>
            <FormField label="Image URL">
              <ImageUrlField
                value={data.imageUrl ?? ""}
                onChange={(v) => onFieldChange("imageUrl", v)}
                urlInputClassName={cn(inputStyle, "font-mono text-[12px]")}
              />
            </FormField>
            <FormField label="Alt text">
              <input
                value={data.imageAlt ?? ""}
                onChange={(e) => onFieldChange("imageAlt", e.target.value)}
                className={inputStyle}
              />
            </FormField>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 rounded-xl border border-stone-100 bg-stone-50/30 p-4">
          <FormField label="Overlay title">
            <input
              value={data.overlayTitle}
              onChange={(e) => onFieldChange("overlayTitle", e.target.value)}
              className={inputStyle}
            />
          </FormField>
          <FormField label="Overlay button text">
            <input
              value={data.overlayCtaLabel}
              onChange={(e) => onFieldChange("overlayCtaLabel", e.target.value)}
              className={inputStyle}
            />
          </FormField>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-[220px_1fr] pt-6 border-t border-stone-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlignLeft size={14} className="text-muted-burgundy-rose" />
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              Badge labels
            </p>
          </div>
          <div className="flex items-center justify-between px-1">
            <button
              type="button"
              onClick={onAddBadge}
              className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
            >
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
                    : "bg-stone-50/50 border-transparent text-stone-400 hover:border-stone-200",
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
            <FormField label={`Text for label ${selectedBadgeIndex + 1}`}>
              <input
                value={data.badges[selectedBadgeIndex].label}
                onChange={(e) =>
                  onUpdateBadge(selectedBadgeIndex, { label: e.target.value })
                }
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
