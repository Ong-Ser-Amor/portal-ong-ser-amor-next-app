import { useEffect, useState } from 'react';

/**
 * Custom hook para observar mudanças no tema
 * Força re-renderização quando a classe do documento HTML muda
 * @returns themeVersion - contador que incrementa a cada mudança de tema
 */
export function useThemeObserver() {
  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return themeVersion;
}
