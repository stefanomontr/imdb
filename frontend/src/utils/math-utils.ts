function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function formatNumVotes(numVotes: number): string {
  const millions = Math.floor(numVotes / 1000000);
  if (millions > 0) {
    return `${round(numVotes / 1000000, 1)}M`;
  }
  const thousands = Math.floor(numVotes / 1000);
  return thousands
    ? `${thousands}K`
    : numVotes.toString()
}