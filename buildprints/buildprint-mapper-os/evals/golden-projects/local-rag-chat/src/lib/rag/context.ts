export async function loadConversationContext(conversationId: string, message: string) {
  return {
    messages: [
      { role: "system", content: "Use memory, RAG context, citations, and uncertainty labels." },
      { role: "user", content: message }
    ],
    searchTool: async () => ({ chunks: [], groundingLevel: "low", citations: [] }),
    conversationId
  };
}

export async function persistAssistantTurn(conversationId: string, streamResult: unknown) {
  return { conversationId, persisted: true, streamResult };
}
