import tokens from '../styles/tokens.css?raw';

function pageBackground(theme: 'dark' | 'light'): string {
  const block = tokens.match(new RegExp(`:root\\[data-theme="${theme}"\\]\\s*\\{([^}]*)\\}`));
  const bg = block?.[1].match(/--bg:\s*(#[0-9a-fA-F]{6})\s*;/);
  if (!bg) throw new Error(`tokens.css: could not read --bg for the ${theme} theme`);
  return bg[1];
}

export const themeColors = {
  dark: pageBackground('dark'),
  light: pageBackground('light'),
};
