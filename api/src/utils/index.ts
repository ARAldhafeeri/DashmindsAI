export function getEnumValues<T extends object>(obj: T): string[] {
  return Object.keys(obj);
}
