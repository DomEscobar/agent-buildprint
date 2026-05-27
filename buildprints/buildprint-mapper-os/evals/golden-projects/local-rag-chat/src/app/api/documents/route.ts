import { indexUploadedDocument } from "../../../lib/rag/ingest";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "missing file" }, { status: 400 });
  const indexed = await indexUploadedDocument(file, {
    allowedExtensions: [".md", ".txt", ".pdf", ".ts", ".js", ".py"],
    maxBytes: 5_000_000,
    storagePolicy: "local-sqlite"
  });
  return Response.json(indexed);
}
