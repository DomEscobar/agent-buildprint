import { streamText } from 'ai'
export async function POST() { return streamText({ model: 'demo', prompt: 'hello' }).toTextStreamResponse() }
