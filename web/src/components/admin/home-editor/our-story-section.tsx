import React from 'react';
import { cn } from '@/lib/utils';
import { FormField } from './form-field';
import { ImageUrlField } from './image-url-field';
import { TextQuote, Type, Link2, ImageIcon, AlignLeft } from 'lucide-react';

export function OurStorySection({ data, onFieldChange }: any) {
  const inputStyle = "w-full bg-stone-50/40 rounded-xl px-4 py-3 text-sm text-deep-midnight-navy outline-none border border-stone-200/50 focus:border-muted-burgundy-rose/40 focus:bg-white focus:shadow-[0_0_0_4px_rgba(159,18,57,0.03)] transition-all placeholder:text-stone-300";
  
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* Titles */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Type size={14} className="text-muted-burgundy-rose" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Titles</h4>
        </div>
        
        <FormField label="Small line above the title" hint="Shows above the main heading">
          <input 
            value={data.eyebrow} 
            onChange={(e) => onFieldChange('eyebrow', e.target.value)} 
            className={inputStyle}
            placeholder="e.g. Our Journey"
          />
        </FormField>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Main heading">
            <input 
              value={data.headingMain} 
              onChange={(e) => onFieldChange('headingMain', e.target.value)} 
              className={inputStyle} 
            />
          </FormField>
          <FormField label="Second line (italics)">
            <input 
              value={data.headingAccent} 
              onChange={(e) => onFieldChange('headingAccent', e.target.value)} 
              className={cn(inputStyle, "italic font-serif")} 
            />
          </FormField>
        </div>
      </section>

      {/* Story text */}
      <section className="space-y-6 pt-8 border-t border-stone-100">
        <div className="flex items-center gap-2 mb-2">
          <AlignLeft size={14} className="text-muted-burgundy-rose" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Story text</h4>
        </div>

        <FormField label="First paragraph">
          <textarea 
            rows={4} 
            value={data.paragraphOne} 
            onChange={(e) => onFieldChange('paragraphOne', e.target.value)} 
            className={cn(inputStyle, "resize-none leading-relaxed")} 
          />
        </FormField>

        <div className="relative py-2">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-stone-100 rounded-full" />
          <div className="pl-6">
            <FormField label="Quote" hint="Short line that stands out">
              <div className="relative">
                <TextQuote className="absolute right-4 top-3 text-stone-200" size={20} />
                <input 
                  value={data.quote} 
                  onChange={(e) => onFieldChange('quote', e.target.value)} 
                  className={cn(inputStyle, "font-medium text-muted-burgundy-rose")} 
                />
              </div>
            </FormField>
          </div>
        </div>

        <FormField label="Second paragraph">
          <textarea 
            rows={4} 
            value={data.paragraphTwo} 
            onChange={(e) => onFieldChange('paragraphTwo', e.target.value)} 
            className={cn(inputStyle, "resize-none leading-relaxed")} 
          />
        </FormField>
      </section>

      {/* Button and photo */}
      <section className="pt-8 border-t border-stone-100">
        <div className="grid gap-8 md:grid-cols-2">
          
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Link2 size={14} className="text-muted-burgundy-rose" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Button</h4>
            </div>
            <FormField label="Button text">
              <input value={data.ctaLabel} onChange={(e) => onFieldChange('ctaLabel', e.target.value)} className={inputStyle} />
            </FormField>
            <FormField label="Button link" hint="Page or full web address">
              <input value={data.ctaHref} onChange={(e) => onFieldChange('ctaHref', e.target.value)} className={cn(inputStyle, "font-mono text-[12px]")} />
            </FormField>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <ImageIcon size={14} className="text-muted-burgundy-rose" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Main photo</h4>
            </div>
            <FormField label="Large image (left)" hint="Paste a link or upload a file">
              <ImageUrlField
                value={data.imageUrl}
                onChange={(v) => onFieldChange('imageUrl', v)}
                urlInputClassName={cn(inputStyle, 'font-mono text-[12px]')}
              />
            </FormField>
            <FormField label="Describe the main photo" hint="Helps visitors who use screen readers">
              <input value={data.imageAlt} onChange={(e) => onFieldChange('imageAlt', e.target.value)} className={inputStyle} />
            </FormField>
          </div>

          <div className="space-y-5 md:col-span-2">
            <div className="flex items-center gap-2 pt-2 border-t border-stone-100 md:border-0 md:pt-0">
              <ImageIcon size={14} className="text-muted-burgundy-rose" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Stacked photos (right column)</h4>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <FormField label="Top small image" hint="Matches homepage right column, top">
                  <ImageUrlField
                    value={data.sideImage1Url}
                    onChange={(v) => onFieldChange('sideImage1Url', v)}
                    urlInputClassName={cn(inputStyle, 'font-mono text-[12px]')}
                  />
                </FormField>
                <FormField label="Top image description">
                  <input value={data.sideImage1Alt} onChange={(e) => onFieldChange('sideImage1Alt', e.target.value)} className={inputStyle} />
                </FormField>
              </div>
              <div className="space-y-4">
                <FormField label="Bottom small image" hint="Matches homepage right column, bottom">
                  <ImageUrlField
                    value={data.sideImage2Url}
                    onChange={(v) => onFieldChange('sideImage2Url', v)}
                    urlInputClassName={cn(inputStyle, 'font-mono text-[12px]')}
                  />
                </FormField>
                <FormField label="Bottom image description">
                  <input value={data.sideImage2Alt} onChange={(e) => onFieldChange('sideImage2Alt', e.target.value)} className={inputStyle} />
                </FormField>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}