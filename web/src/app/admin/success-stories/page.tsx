'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';

type Story = {
  id: number;
  coupleNames: string;
  headline: string;
  summary: string;
};

export default function AdminSuccessStoriesPage() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      coupleNames: 'Alex & Sienna',
      headline: 'From parallel lives to shared chapters',
      summary:
        'Two busy professionals who kept orbiting the same circles finally met through an intentionally curated introduction.',
    },
  ]);

  const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({
    coupleNames: '',
    headline: '',
    summary: '',
  });

  function handleAddStory() {
    if (!newStory.coupleNames || !newStory.headline || !newStory.summary) {
      return;
    }
    setStories((prev) => [
      ...prev,
      { id: prev.length + 1, ...newStory },
    ]);
    setNewStory({ coupleNames: '', headline: '', summary: '' });
  }

  return (
    <AdminLayout
      title="Success Stories"
      description="Draft and manage the stories that appear on the homepage carousel."
    >
      <div className="space-y-8">
        {/* Form to add a new story */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Add a new story
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
                Couple names
              </label>
              <input
                value={newStory.coupleNames}
                onChange={(e) =>
                  setNewStory((s) => ({ ...s, coupleNames: e.target.value }))
                }
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
                placeholder="Alex & Sienna"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
                Headline
              </label>
              <input
                value={newStory.headline}
                onChange={(e) =>
                  setNewStory((s) => ({ ...s, headline: e.target.value }))
                }
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
                placeholder="From parallel lives to shared chapters"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">
              Short summary
            </label>
            <textarea
              value={newStory.summary}
              onChange={(e) =>
                setNewStory((s) => ({ ...s, summary: e.target.value }))
              }
              rows={3}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-deep-midnight-navy"
              placeholder="A 2–3 sentence overview of their journey together."
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleAddStory}
              className="rounded-full bg-deep-midnight-navy text-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] hover:bg-muted-burgundy-rose"
            >
              Add story
            </Button>
          </div>
        </section>

        {/* Existing stories list */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            Stories in rotation
          </h2>
          <div className="space-y-3">
            {stories.map((story) => (
              <div
                key={story.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-burgundy-rose">
                  {story.coupleNames}
                </p>
                <p className="mt-1 text-sm font-semibold text-deep-midnight-navy">
                  {story.headline}
                </p>
                <p className="mt-1 text-xs text-stone-600">{story.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

