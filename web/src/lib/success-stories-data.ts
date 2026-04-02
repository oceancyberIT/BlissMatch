/** Pure helpers for success stories — safe for Server Components. */

export type SuccessStory = {
  id?: string;
  quote: string;
  author: string;
  location: string;
  stars: number;
};

export const SUCCESS_STORIES_FALLBACK: SuccessStory[] = [
  {
    quote:
      "I had forgotten what it felt like to be seen. BlissMatch reminded me that love can be elegant and kind.",
    author: "Ella",
    location: "London",
    stars: 5,
  },
  {
    quote:
      "They understood me in a way no app ever could. Every introduction was thoughtful and sincere.",
    author: "Kwame",
    location: "Accra",
    stars: 5,
  },
  {
    quote:
      "Professionalism with heart. Confidential, intuitive, and refined — exactly what I hoped for.",
    author: "Marie",
    location: "Paris",
    stars: 5,
  },
];

function storyRecord(story: unknown): Record<string, unknown> {
  if (story !== null && typeof story === "object") {
    return story as Record<string, unknown>;
  }
  return {};
}

export function mapSuccessStoriesFromApi(data: unknown[]): SuccessStory[] {
  return data.map((story): SuccessStory => {
    const s = storyRecord(story);
    return {
      id: typeof s.id === "string" ? s.id : undefined,
      quote: typeof s.quote === "string" ? s.quote : "",
      author: typeof s.author === "string" ? s.author : "",
      location: typeof s.location === "string" ? s.location : "",
      stars: Number(s.stars ?? 5),
    };
  });
}
