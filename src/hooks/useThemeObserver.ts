import { useEffect, useState } from 'react';

/**
 * Custom hook para observar mudanças no tema
 * Força re-renderização quando a classe do documento HTML muda
 * @returns objeto com isDark (boolean) e themeVersion (number)
 */
export function useThemeObserver() {
  const [themeVersion, setThemeVersion] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.body.classList.contains('theme-dark'));
      setThemeVersion((v) => v + 1);
    };

    // Verifica tema inicial
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return { isDark, themeVersion };
}
