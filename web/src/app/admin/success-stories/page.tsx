'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Star, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

type Story = {
  id: string;
  quote: string;
  author: string;
  location: string;
  stars: number;
};

export default function AdminSuccessStoriesPage() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 'story-1',
      quote:
        'I had forgotten what it felt like to be seen. BlissMatch reminded me that love can be elegant and kind.',
      author: 'Ella',
      location: 'London',
      stars: 5,
    },
    {
      id: 'story-2',
      quote:
        'They understood me in a way no app ever could. Every introduction was thoughtful and sincere.',
      author: 'Kwame',
      location: 'Accra',
      stars: 5,
    },
    {
      id: 'story-3',
      quote:
        'Professionalism with heart. Confidential, intuitive, and refined - exactly what I hoped for.',
      author: 'Marie',
      location: 'Paris',
      stars: 5,
    },
  ]);

  const [selectedId, setSelectedId] = useState<string>('story-1');
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({
    quote: '',
    author: '',
    location: '',
    stars: 5,
  });

  const selectedStory =
    stories.find((story) => story.id === selectedId) ?? stories[0];

  useEffect(() => {
    let active = true;

    async function loadStories() {
      try {
        const res = await fetch('/api/admin/success-stories');
        const data = await res.json().catch(() => []);
        if (!active) return;
        if (res.ok && Array.isArray(data) && data.length) {
          const normalized: Story[] = data.map((item: any, index: number) => ({
            id: item.id ?? `story-${index + 1}`,
            quote: item.quote ?? '',
            author: item.author ?? '',
            location: item.location ?? '',
            stars: Number(item.stars ?? 5),
          }));
          setStories(normalized);
          setSelectedId(normalized[0].id);
        }
      } catch {
        // Keep fallback list
      }
    }

    loadStories();
    return () => {
      active = false;
    };
  }, []);

  function handleAddStoryCard() {
    if (!newStory.quote || !newStory.author || !newStory.location) {
      return;
    }

    const id = `story-${Date.now()}`;
    const next: Story = { id, ...newStory };
    setStories((prev) => [
      ...prev,
      next,
    ]);
    setSelectedId(id);
    setNewStory({ quote: '', author: '', location: '', stars: 5 });
    setMessage('New story card added.');
    setTimeout(() => setMessage(null), 2000);
  }

  function handleUpdateStory<K extends keyof Omit<Story, 'id'>>(
    field: K,
    value: Omit<Story, 'id'>[K],
  ) {
    if (!selectedStory) return;
    setStories((prev) =>
      prev.map((story) =>
        story.id === selectedStory.id ? { ...story, [field]: value } : story,
      ),
    );
  }

  function handleDeleteStory(id: string) {
    const next = stories.filter((story) => story.id !== id);
    setStories(next);
    if (next.length) {
      setSelectedId(next[0].id);
    }
    setMessage('Story card removed.');
    setTimeout(() => setMessage(null), 2000);
  }

  async function handleSaveAll() {
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('blissmatch_admin_token')
        : null;

    if (!token) {
      setMessage('Login first.');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/success-stories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stories: stories.map((story) => ({
            quote: story.quote,
            author: story.author,
            location: story.location,
            stars: story.stars,
          })),
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage(data?.message ?? 'Could not save stories.');
        setTimeout(() => setMessage(null), 3000);
        return;
      }

      if (Array.isArray(data)) {
        const normalized: Story[] = data.map((item: any, index: number) => ({
          id: item.id ?? `story-${index + 1}`,
          quote: item.quote ?? '',
          author: item.author ?? '',
          location: item.location ?? '',
          stars: Number(item.stars ?? 5),
        }));
        setStories(normalized);
        if (normalized.length) setSelectedId(normalized[0].id);
      }

      setMessage('Stories saved.');
      setTimeout(() => setMessage(null), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout
      title="Success Stories"
      description="Manage stories shown on the main site."
    >
      <div className="space-y-8">
        <div className="rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-burgundy-rose">
            Story Manager
          </p>
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tight">
            Success Stories
          </h2>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-stone-400">
            Edit quotes, names, locations and ratings for the homepage cards.
          </p>
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="rounded-md bg-white text-deep-midnight-navy px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-stone-100"
            >
              <Save size={14} className="mr-2" />
              {saving ? 'Saving...' : 'Save All Stories'}
            </Button>
          </div>
          {message && (
            <div className="mt-4 inline-flex rounded-md bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-200">
              {message}
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4 rounded-md border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-black uppercase tracking-widest text-stone-500">
                Story Cards
              </p>
              <button
                type="button"
                onClick={handleAddStoryCard}
                className="inline-flex items-center gap-1 rounded-md bg-deep-midnight-navy px-2 py-1 text-[10px] font-semibold uppercase text-white hover:bg-muted-burgundy-rose"
              >
                <Plus size={12} />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {stories.map((story, index) => {
                const isActive = story.id === selectedStory?.id;
                return (
                  <div
                    key={story.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedId(story.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(story.id);
                      }
                    }}
                    className={cn(
                      'w-full rounded-xl border px-3 py-3 transition-all',
                      isActive
                        ? 'border-muted-burgundy-rose bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase text-stone-500">
                        Story {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStory(story.id);
                        }}
                        className="rounded p-1 text-stone-400 hover:bg-red-50 hover:text-red-500"
                        aria-label={`Delete story ${index + 1}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p className="mt-1 truncate text-xs font-semibold text-deep-midnight-navy">
                      {story.author}
                    </p>
                    <p className="truncate text-[11px] text-stone-500">
                      {story.location}
                    </p>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="space-y-6 rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy">
              Edit Selected Story
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Author
                </label>
                <input
                  value={selectedStory?.author ?? ''}
                  onChange={(e) => handleUpdateStory('author', e.target.value)}
                  className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose"
                  placeholder="Ella"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                  Location
              </label>
              <input
                  value={selectedStory?.location ?? ''}
                onChange={(e) =>
                    handleUpdateStory('location', e.target.value)
                }
                  className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose"
                  placeholder="London"
              />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                Quote
              </label>
              <textarea
                rows={5}
                value={selectedStory?.quote ?? ''}
                onChange={(e) => handleUpdateStory('quote', e.target.value)}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose resize-none"
                placeholder="Write the testimonial quote here..."
              />
            </div>

          <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                Star rating
            </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleUpdateStory('stars', n)}
                    className={cn(
                      'rounded-md p-2 border transition-all',
                      (selectedStory?.stars ?? 5) >= n
                        ? 'border-muted-burgundy-rose bg-muted-burgundy-rose/10 text-muted-burgundy-rose'
                        : 'border-stone-200 text-stone-300 hover:border-stone-300',
                    )}
                  >
                    <Star size={14} className="fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/40 p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                Preview
              </p>
              <div className="flex gap-1">
                {[...Array(selectedStory?.stars ?? 5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-muted-burgundy-rose text-muted-burgundy-rose opacity-70"
                  />
                ))}
              </div>
              <p className="text-lg font-serif italic text-deep-midnight-navy">
                "{selectedStory?.quote ?? ''}"
              </p>
              <p className="text-xs font-black uppercase tracking-widest text-deep-midnight-navy">
                - {selectedStory?.author ?? ''}
              </p>
              <p className="text-[11px] text-stone-400">{selectedStory?.location ?? ''}</p>
            </div>
          </section>
        </div>

        <section className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-deep-midnight-navy mb-4">
            New Story Draft
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={newStory.author}
              onChange={(e) =>
                setNewStory((prev) => ({ ...prev, author: e.target.value }))
              }
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose"
              placeholder="Author"
            />
            <input
              value={newStory.location}
              onChange={(e) =>
                setNewStory((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose"
              placeholder="Location"
            />
          </div>
          <textarea
            rows={3}
            value={newStory.quote}
            onChange={(e) =>
              setNewStory((prev) => ({ ...prev, quote: e.target.value }))
            }
            className="mt-4 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-muted-burgundy-rose resize-none"
            placeholder="Quote"
          />
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleAddStoryCard}
              className="rounded-md bg-deep-midnight-navy px-5 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-muted-burgundy-rose"
            >
              Add Story Card
            </Button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

