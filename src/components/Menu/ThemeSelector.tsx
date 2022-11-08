import styled from 'styled-components';

const StyledThemeSelector = styled.button<{ theme: 'light' | 'dark' }>``;

interface ThemeSelectorProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  function handleThemeSelect() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <StyledThemeSelector theme={theme} onClick={handleThemeSelect}>
      Mudar Tema
    </StyledThemeSelector>
  );
}
