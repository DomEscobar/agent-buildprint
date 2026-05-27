export function ollamaProvider(model: string) {
  const baseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
  return {
    provider: "ollama",
    model,
    baseUrl,
    mode: baseUrl.includes("localhost") ? "local-live-or-blocked" : "configured-remote"
  };
}
