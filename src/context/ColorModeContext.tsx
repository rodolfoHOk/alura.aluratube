import { createContext, ReactNode, useState } from 'react';

interface ColorModeContextData {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const ColorModeContext = createContext({} as ColorModeContextData);

interface ColorModeProviderProps {
  children: ReactNode;
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  function toggleMode() {
    if (mode === 'light') setMode('dark');
    if (mode === 'dark') setMode('light');
  }

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
