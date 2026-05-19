import path from 'node:path';

export function toPosixPath(value) {
  return String(value).replaceAll(path.sep, '/').replaceAll('\\', '/');
}
