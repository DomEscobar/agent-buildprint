export async function indexUploadedDocument(file: File, policy: { allowedExtensions: string[]; maxBytes: number; storagePolicy: string }) {
  return {
    documentId: crypto.randomUUID(),
    name: file.name,
    status: "indexed",
    policy,
    chunks: 1,
    vectorStore: "sqlite-libsql"
  };
}
