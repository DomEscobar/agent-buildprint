export function extractMemory(message: string) {
  if (/\b(i prefer|always use|we use|my stack)\b/i.test(message)) {
    return [{ type: "preference", content: message.slice(0, 200) }];
  }
  return [];
}
