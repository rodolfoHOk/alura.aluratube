import { AppProps } from 'next/app';
import { useContext } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { CSSReset } from '../components/CSSReset';
import { RegisterVideo } from '../components/RegisterVideo';
import {
  ColorModeContext,
  ColorModeProvider,
} from '../context/ColorModeContext';

interface Theme {
  light: DefaultTheme;
  dark: DefaultTheme;
}

const theme: Theme = {
  light: {
    backgroundBase: '#f9f9f9',
    backgroundLevel1: '#ffffff',
    backgroundLevel2: '#f0f0f0',
    borderBase: '#e5e5e5',
    textColorBase: '#222222',
  },
  dark: {
    backgroundBase: '#181818',
    backgroundLevel1: '#202020',
    backgroundLevel2: '#313131',
    borderBase: '#383838',
    textColorBase: '#FFFFFF',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const { mode } = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme[mode]}>
      <CSSReset />
      <Component {...pageProps} />
      <RegisterVideo />
    </ThemeProvider>
  );
}

export default function _APP(props: AppProps) {
  return (
    <ColorModeProvider>
      <MyApp {...props} />
    </ColorModeProvider>
  );
}
