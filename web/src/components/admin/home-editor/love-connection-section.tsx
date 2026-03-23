
import { cn } from "@/lib/utils";
import { FormField } from "./form-field";
import { ImageUrlField } from "./image-url-field";
import { Plus } from "lucide-react";

export function LoveConnectionSection({
  data,
  selectedIndex,
  setSelectedIndex,
  onFieldChange,
  onAdd,
  onDelete,
  onUpdateImage,
}: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid gap-6">
        <FormField label="Heading">
          <input
            value={data.heading}
            onChange={(e) => onFieldChange('heading', e.target.value)}
            className="w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all"
          />
        </FormField>

        <FormField label="Support text">
          <textarea
            rows={3}
            value={data.subtext}
            onChange={(e) => onFieldChange('subtext', e.target.value)}
            className="w-full bg-stone-50/50 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-muted-burgundy-rose/30 focus:bg-white transition-all resize-none"
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_1fr] pt-6 border-t border-stone-100">
        {/* Left Nav: Selection List */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Images</p>
            <button onClick={onAdd} className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all">
              <Plus size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {data.images.map((_: any, index: number) => (
               <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all",
                    selectedIndex === index ? "bg-white border-muted-burgundy-rose shadow-sm" : "bg-stone-50/50 border-transparent hover:border-stone-200"
                  )}
               >
                  <div className="h-8 w-8 rounded bg-stone-200 flex items-center justify-center text-[10px] font-bold">{index + 1}</div>
                  <span className="text-[10px] font-black text-stone-500 uppercase">Image</span>
               </button>
            ))}
          </div>
        </div>

        {/* Right Pane: Editor */}
        <div className="bg-stone-50/30 rounded-2xl p-6 border border-stone-100 space-y-6">
          {data.images[selectedIndex] ? (
            <>
              <FormField label="Image" hint="Link or upload from your device">
                <ImageUrlField
                  value={data.images[selectedIndex].url}
                  onChange={(v) => onUpdateImage(selectedIndex, { url: v })}
                  urlInputClassName="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none focus:border-muted-burgundy-rose/30"
                />
              </FormField>
              <FormField label="Alt text">
                <input
                  value={data.images[selectedIndex].alt}
                  onChange={(e) => onUpdateImage(selectedIndex, { alt: e.target.value })}
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-stone-200 outline-none"
                />
              </FormField>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center text-stone-300 italic text-sm">Pick an image to edit</div>
          )}
        </div>
      </div>
    </div>
  );
}