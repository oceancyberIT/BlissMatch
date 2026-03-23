const backendCandidates = [
  process.env.BACKEND_URL,
  'http://localhost:4000',
  'http://localhost:4001',
  process.env.NEXT_PUBLIC_API_URL,
  'http://backend:4000',
].filter(Boolean) as string[];

export async function fetchBackend(path: string, init?: RequestInit): Promise<Response> {
  let lastError: unknown = null;
  for (const base of backendCandidates) {
    try {
      const res = await fetch(`${base}${path}`, init);
      // Retry on common "wrong host / wrong route" or transient backend errors.
      // Return immediately for successful or meaningful client/auth responses.
      if (
        res.ok ||
        [400, 401, 403, 409, 422].includes(res.status)
      ) {
        return res;
      }
      if ([404, 405, 500, 502, 503, 504].includes(res.status)) {
        lastError = new Error(`Backend ${base} responded ${res.status}`);
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error('No backend candidates available');
}
