export function removeAny(str: string, ...items: string[]): string {
  for (let item of items) {
    str = str.replace(item, '');
  }
  return str;
}
