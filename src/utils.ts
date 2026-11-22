/** Prefixes a path inside /public with the deploy base (e.g. "/weboldal/"). */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
