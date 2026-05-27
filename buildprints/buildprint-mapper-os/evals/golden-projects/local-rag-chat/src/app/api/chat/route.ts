import { streamText } from "ai";
import { ollamaProvider } from "../../../lib/ollama-provider";
import { loadConversationContext, persistAssistantTurn } from "../../../lib/rag/context";

export async function POST(request: Request) {
  const body = await request.json();
  const context = await loadConversationContext(body.conversationId, body.message);
  const result = streamText({
    model: ollamaProvider(body.model ?? "auto"),
    messages: context.messages,
    tools: {
      search_knowledge_base: context.searchTool
    }
  });
  await persistAssistantTurn(body.conversationId, result);
  return result.toDataStreamResponse();
}
