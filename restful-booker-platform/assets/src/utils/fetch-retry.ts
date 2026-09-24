import fetchRetry from 'fetch-retry';

export const fetchWithRetry = fetchRetry(global.fetch, {
  retries: 5,
  retryDelay: (attempt: number) => Math.pow(2, attempt) * 1000, // Exponential backoff: 1s, 2s, 4s, 8s, 16s
  retryOn: [408, 429, 500, 502, 503, 504] // Retry on timeout, rate limit, and server errors
});
