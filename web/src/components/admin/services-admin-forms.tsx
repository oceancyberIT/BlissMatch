'use client';

import { ServicesContent } from '@/components/admin/services-editor/types';
import { ImageUrlField } from '@/components/admin/home-editor/image-url-field';
import { FormField } from '@/components/admin/home-editor/form-field';
import { Plus } from 'lucide-react';

const fieldClass =
  'w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose';

export function ServicesGridForm({
  value,
  onChange,
}: {
  value: ServicesContent['grid'];
  onChange: (next: ServicesContent['grid']) => void;
}) {
  const g = value;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase text-stone-400">Service cards</p>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...g,
              cards: [...g.cards, { title: 'New service', desc: '', size: 'sm' }],
            })
          }
          className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
      {g.cards.map((card, idx) => (
        <div key={idx} className="rounded border border-stone-200 p-3 space-y-2">
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[10px] text-red-500 font-bold uppercase"
              onClick={() => {
                const next = g.cards.filter((_, i) => i !== idx);
                onChange({
                  ...g,
                  cards: next.length ? next : [{ title: '', desc: '', size: 'sm' }],
                });
              }}
            >
              Remove
            </button>
          </div>
          <FormField label="Title">
            <input
              className={fieldClass}
              value={card.title}
              onChange={(e) => {
                const next = [...g.cards];
                next[idx] = { ...next[idx], title: e.target.value };
                onChange({ ...g, cards: next });
              }}
            />
          </FormField>
          <FormField label="Description">
            <textarea
              rows={2}
              className={fieldClass}
              value={card.desc}
              onChange={(e) => {
                const next = [...g.cards];
                next[idx] = { ...next[idx], desc: e.target.value };
                onChange({ ...g, cards: next });
              }}
            />
          </FormField>
          <FormField label="Card width" hint="Large = featured">
            <select
              className={fieldClass}
              value={card.size}
              onChange={(e) => {
                const next = [...g.cards];
                next[idx] = { ...next[idx], size: e.target.value as 'lg' | 'sm' };
                onChange({ ...g, cards: next });
              }}
            >
              <option value="sm">Standard</option>
              <option value="lg">Large (featured)</option>
            </select>
          </FormField>
        </div>
      ))}
      <div className="pt-4 border-t border-stone-100 space-y-3">
        <p className="text-[10px] font-black uppercase text-stone-400">Bottom banner</p>
        <FormField label="Small label">
          <input
            className={fieldClass}
            value={g.banner.eyebrow}
            onChange={(e) => onChange({ ...g, banner: { ...g.banner, eyebrow: e.target.value } })}
          />
        </FormField>
        <FormField label="Title">
          <input
            className={fieldClass}
            value={g.banner.title}
            onChange={(e) => onChange({ ...g, banner: { ...g.banner, title: e.target.value } })}
          />
        </FormField>
        <FormField label="Supporting text">
          <textarea
            rows={2}
            className={fieldClass}
            value={g.banner.paragraph}
            onChange={(e) => onChange({ ...g, banner: { ...g.banner, paragraph: e.target.value } })}
          />
        </FormField>
      </div>
    </div>
  );
}

export function ServicesSocialForm({
  value,
  onChange,
}: {
  value: ServicesContent['socialImpact'];
  onChange: (next: ServicesContent['socialImpact']) => void;
}) {
  const s = value;
  return (
    <div className="space-y-4">
      <FormField label="Side image" hint="URL or upload">
        <ImageUrlField value={s.imageUrl} onChange={(v) => onChange({ ...s, imageUrl: v })} />
      </FormField>
      <FormField label="Image alt text">
        <input
          className={fieldClass}
          value={s.imageAlt}
          onChange={(e) => onChange({ ...s, imageAlt: e.target.value })}
        />
      </FormField>
      <FormField label="Quote on image" hint="Line break for second line">
        <textarea
          rows={2}
          className={fieldClass}
          value={s.overlayQuote}
          onChange={(e) => onChange({ ...s, overlayQuote: e.target.value })}
        />
      </FormField>
      <FormField label="Eyebrow">
        <input className={fieldClass} value={s.eyebrow} onChange={(e) => onChange({ ...s, eyebrow: e.target.value })} />
      </FormField>
      <FormField label="Heading (first line)">
        <input
          className={fieldClass}
          value={s.headingMain}
          onChange={(e) => onChange({ ...s, headingMain: e.target.value })}
        />
      </FormField>
      <FormField label="Heading accent">
        <input
          className={fieldClass}
          value={s.headingAccent}
          onChange={(e) => onChange({ ...s, headingAccent: e.target.value })}
        />
      </FormField>
      <FormField label="Paragraph 1">
        <textarea
          rows={2}
          className={fieldClass}
          value={s.paragraphOne}
          onChange={(e) => onChange({ ...s, paragraphOne: e.target.value })}
        />
      </FormField>
      <FormField label="Paragraph 2">
        <textarea
          rows={2}
          className={fieldClass}
          value={s.paragraphTwo}
          onChange={(e) => onChange({ ...s, paragraphTwo: e.target.value })}
        />
      </FormField>
      <FormField label="Commitment title">
        <input
          className={fieldClass}
          value={s.commitmentTitle}
          onChange={(e) => onChange({ ...s, commitmentTitle: e.target.value })}
        />
      </FormField>
      <FormField label="Commitment text">
        <input
          className={fieldClass}
          value={s.commitmentText}
          onChange={(e) => onChange({ ...s, commitmentText: e.target.value })}
        />
      </FormField>
    </div>
  );
}

export function ServicesConfidentialityForm({
  value,
  onChange,
}: {
  value: ServicesContent['confidentiality'];
  onChange: (next: ServicesContent['confidentiality']) => void;
}) {
  const conf = value;
  return (
    <div className="space-y-4">
      <FormField label="Section title">
        <input className={fieldClass} value={conf.title} onChange={(e) => onChange({ ...conf, title: e.target.value })} />
      </FormField>
      <FormField label="Subtitle">
        <input
          className={fieldClass}
          value={conf.subtitle}
          onChange={(e) => onChange({ ...conf, subtitle: e.target.value })}
        />
      </FormField>
      <FormField label="Top-left image" hint="URL or upload">
        <ImageUrlField value={conf.imageTopLeft} onChange={(v) => onChange({ ...conf, imageTopLeft: v })} />
      </FormField>
      <FormField label="Top-right image" hint="URL or upload">
        <ImageUrlField value={conf.imageTopRight} onChange={(v) => onChange({ ...conf, imageTopRight: v })} />
      </FormField>
      <FormField label="Bottom-right image" hint="URL or upload">
        <ImageUrlField value={conf.imageBottomRight} onChange={(v) => onChange({ ...conf, imageBottomRight: v })} />
      </FormField>
      <FormField label="Bottom-left image" hint="URL or upload">
        <ImageUrlField value={conf.imageBottomLeft} onChange={(v) => onChange({ ...conf, imageBottomLeft: v })} />
      </FormField>
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase text-stone-400">Charter points</p>
          <button
            type="button"
            onClick={() => onChange({ ...conf, bullets: [...conf.bullets, ''] })}
            className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-deep-midnight-navy hover:text-white transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
        {conf.bullets.map((b, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className={fieldClass}
              value={b}
              onChange={(e) => {
                const next = [...conf.bullets];
                next[idx] = e.target.value;
                onChange({ ...conf, bullets: next });
              }}
            />
            <button
              type="button"
              className="text-xs text-red-500 shrink-0 px-2"
              onClick={() => {
                const next = conf.bullets.filter((_, i) => i !== idx);
                onChange({ ...conf, bullets: next.length ? next : [''] });
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const SLOT_LABELS = ['Left card', 'Middle card', 'Right card'];

export function ServicesHeroGalleryForm({
  value,
  onChange,
}: {
  value: ServicesContent['hero'];
  onChange: (next: ServicesContent['hero']) => void;
}) {
  const h = value;
  return (
    <div className="space-y-8">
      <p className="text-[11px] text-stone-500 leading-relaxed">
        Title, subtitle, lead text, and the large background image are edited in{' '}
        <strong className="text-deep-midnight-navy">Global → Hero Section</strong> (route: Services).
        Here you control the three staggered images and the footer line.
      </p>

      <FormField label="Footer line" hint="Small text above the bottom-left rule on large screens">
        <input
          className={fieldClass}
          value={h.footerLabel}
          onChange={(e) => onChange({ ...h, footerLabel: e.target.value })}
        />
      </FormField>

      <div className="space-y-6 border-t border-stone-100 pt-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
          Staggered gallery (3)
        </p>
        {SLOT_LABELS.map((label, i) => (
          <div key={label} className="rounded-xl border border-stone-100 bg-stone-50/40 p-4 space-y-3">
            <p className="text-[10px] font-bold text-stone-500">{label}</p>
            <FormField label="Image URL">
              <ImageUrlField
                value={h.gallery[i]?.url ?? ''}
                onChange={(v) => {
                  const next = [...h.gallery];
                  next[i] = { ...next[i], url: v };
                  onChange({ ...h, gallery: next });
                }}
                urlInputClassName={fieldClass}
              />
            </FormField>
            <FormField label="Alt text">
              <input
                className={fieldClass}
                value={h.gallery[i]?.alt ?? ''}
                onChange={(e) => {
                  const next = [...h.gallery];
                  next[i] = { ...next[i], alt: e.target.value };
                  onChange({ ...h, gallery: next });
                }}
              />
            </FormField>
          </div>
        ))}
      </div>
    </div>
  );
}
