const key = process.env.ANTHROPIC_API_KEY;
export async function draft(){ return key ? 'draft' : 'mock'; }
