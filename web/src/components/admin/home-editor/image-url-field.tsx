'use client';

import { useCallback, useEffect, useState } from 'react';
import { Image as ImageIcon, Library, RefreshCw, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MediaAsset } from '@/lib/media-library-types';

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
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryItems, setLibraryItems] = useState<MediaAsset[]>([]);
  const [libraryMessage, setLibraryMessage] = useState<string | null>(null);

  const compressImageFile = useCallback(async (file: File): Promise<string> => {
    const readAsDataUrl = () =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ''));
        reader.onerror = () => reject(new Error('Could not read image file.'));
        reader.readAsDataURL(file);
      });

    const sourceDataUrl = await readAsDataUrl();

    // Skip re-encoding very small files.
    if (file.size <= 220 * 1024) return sourceDataUrl;

    const img = document.createElement('img');
    img.src = sourceDataUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Could not decode image.'));
    });

    const maxWidth = 1400;
    const maxHeight = 1400;
    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
    const targetWidth = Math.max(1, Math.round(img.width * ratio));
    const targetHeight = Math.max(1, Math.round(img.height * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return sourceDataUrl;
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    // JPEG compression greatly reduces payload for admin JSON saves.
    return canvas.toDataURL('image/jpeg', 0.82);
  }, []);

  const fetchLibrary = useCallback(async () => {
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('blissmatch_admin_token')
        : null;
    if (!token) return;
    setLibraryLoading(true);
    try {
      const res = await fetch('/api/admin/media', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !Array.isArray(data)) {
        setLibraryMessage('Could not load media library.');
        return;
      }
      setLibraryItems(data as MediaAsset[]);
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  const saveToLibrary = useCallback(
    async (imageUrl: string, preferredName?: string) => {
      const token =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('blissmatch_admin_token')
          : null;
      if (!token || !imageUrl) return;
      const payload = {
        name: preferredName?.trim() || 'Library image',
        url: imageUrl,
      };
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setLibraryMessage('Saved to media library.');
        fetchLibrary();
      } else {
        setLibraryMessage('Could not save to media library.');
      }
    },
    [fetchLibrary],
  );

  useEffect(() => {
    if (!libraryOpen) return;
    fetchLibrary();
  }, [libraryOpen, fetchLibrary]);

  const onFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file?.type.startsWith('image/')) {
        try {
          const result = await compressImageFile(file);
          onChange(result);
          // Save in background; don't block form interaction.
          void saveToLibrary(result, file.name);
        } catch {
          setLibraryMessage('Could not process image file.');
        }
      }
      e.target.value = '';
    },
    [compressImageFile, onChange, saveToLibrary],
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
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[10px] font-black uppercase tracking-wide text-red-500 hover:text-red-600"
          >
            Remove image
          </button>
          <button
            type="button"
            onClick={() => saveToLibrary(value)}
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-deep-midnight-navy hover:text-muted-burgundy-rose"
          >
            <Save className="h-3.5 w-3.5" />
            Save to library
          </button>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setLibraryOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wider text-stone-600 hover:text-deep-midnight-navy"
      >
        {libraryOpen ? <X className="h-3.5 w-3.5" /> : <Library className="h-3.5 w-3.5" />}
        {libraryOpen ? 'Close media library' : 'Choose from media library'}
      </button>
      {libraryOpen ? (
        <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-wider text-stone-500">
              Media library
            </p>
            <button
              type="button"
              onClick={fetchLibrary}
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-stone-500 hover:text-deep-midnight-navy"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
          {libraryMessage ? (
            <p className="text-[10px] font-semibold text-muted-burgundy-rose">{libraryMessage}</p>
          ) : null}
          {libraryLoading ? (
            <p className="text-xs text-stone-500">Loading library...</p>
          ) : libraryItems.length === 0 ? (
            <p className="text-xs text-stone-500">No saved images yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
              {libraryItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange(item.url)}
                  className="rounded-lg border border-stone-200 p-2 text-left hover:border-muted-burgundy-rose transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-20 w-full rounded object-cover border border-stone-100"
                  />
                  <p className="mt-1 truncate text-[10px] font-semibold text-stone-600">
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
