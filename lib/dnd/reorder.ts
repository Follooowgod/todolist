export function getPutAfterItemId(orderedIds: string[], movedId: string): string | null {
  const idx = orderedIds.indexOf(movedId);
  if (idx <= 0) return null;
  return orderedIds[idx - 1];
}
