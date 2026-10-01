export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function syncThemeColor(theme: Theme): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const color = meta?.dataset[theme];
  if (meta && color) meta.content = color;
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  syncThemeColor(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function toggleTheme(): void {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}
