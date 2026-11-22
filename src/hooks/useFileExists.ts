import { useEffect, useState } from 'react';

/**
 * Checks with a HEAD request whether a static file (e.g. the CV PDF) exists.
 * The content-type check matters: the dev server answers unknown paths with
 * index.html and status 200.
 */
export function useFileExists(url: string, expectedType: string) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    fetch(url, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        setExists(res.ok && type.includes(expectedType));
      })
      .catch(() => {
        /* offline or aborted: keep hidden */
      });
    return () => controller.abort();
  }, [url, expectedType]);

  return exists;
}
