'use client';

import { useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ImageUrlFieldProps = {
  value: string;
  onChange: (next: string) => void;
  urlInputClassName?: string;
  urlPlaceholder?: string;
};

export function ImageUrlField({
  value,
  onChange,
  urlInputClassName,
  urlPlaceholder = 'Paste image URL or upload a file below',
}: ImageUrlFieldProps) {
  const onFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file?.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => onChange(reader.result as string);
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    },
    [onChange],
  );

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={urlPlaceholder}
        className={cn(
          'w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-muted-burgundy-rose/40',
          urlInputClassName,
        )}
      />
      <p className="text-[10px] font-black uppercase tracking-wider text-stone-400">
        Or upload from your device
      </p>
      <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-6 transition-colors hover:bg-stone-50">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-[1] cursor-pointer opacity-0"
          onChange={onFile}
          aria-label="Upload image file"
        />
        <div className="pointer-events-none flex items-center gap-4">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt=""
                className="h-16 w-16 rounded-lg border border-stone-200 object-cover"
              />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[11px] font-semibold text-stone-700">Preview</p>
                <p className="truncate text-[10px] text-stone-400">
                  {value.startsWith('data:') ? 'Uploaded image (saved with draft)' : value}
                </p>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center justify-center py-2">
              <ImageIcon className="mb-2 h-6 w-6 text-stone-300 transition-colors group-hover:text-muted-burgundy-rose" />
              <span className="text-[10px] font-bold uppercase text-stone-400">
                Click to choose image
              </span>
            </div>
          )}
        </div>
      </div>
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-[10px] font-black uppercase tracking-wide text-red-500 hover:text-red-600"
        >
          Remove image
        </button>
      ) : null}
    </div>
  );
}
