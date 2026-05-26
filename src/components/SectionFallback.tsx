export default function SectionFallback({ minHeight = '12rem' }: { minHeight?: string }) {
  return (
    <div
      className="w-full animate-pulse bg-yz-card/20 rounded-2xl mx-auto max-w-7xl"
      style={{ minHeight }}
      aria-hidden
    />
  );
}
