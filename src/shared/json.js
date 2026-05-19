export function parseJson(text, file) {
  try {
    return { ok: true, data: JSON.parse(text), error: null, file };
  } catch (error) {
    return { ok: false, data: null, error: error.message, file };
  }
}

