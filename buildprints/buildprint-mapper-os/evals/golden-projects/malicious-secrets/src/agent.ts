const key = process.env.OPENAI_API_KEY;
const tokenName = process.env.PRIVATE_TOKEN;
export async function run() { return { ok: Boolean(key && tokenName) }; }
