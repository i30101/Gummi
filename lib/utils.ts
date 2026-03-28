export function formatPrice(cents: number, currency: string = "USD"): string {
  const dollars = cents / 100;
  if (dollars === Math.floor(dollars)) {
    return `$${Math.floor(dollars)}`;
  }
  return `$${dollars.toFixed(2)}`;
}

export function formatPriceRange(
  min: number,
  max: number,
  currency: string = "USD"
): string {
  if (min === max) return formatPrice(min, currency);
  return `${formatPrice(min, currency)} – ${formatPrice(max, currency)}`;
}

export function formatRating(average: number): string {
  return average.toFixed(1);
}

export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
