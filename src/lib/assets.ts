/** Public folder path with Vite `base` (e.g. `/demo/` on GitHub Pages). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}
