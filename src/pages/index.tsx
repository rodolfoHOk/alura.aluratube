import styled from 'styled-components';
import appConfig from '../../config.json';
import { AppConfig } from '../@types/AppConfig';
import { CSSReset } from '../components/CSSReset';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { TimeLine } from '../components/TimeLine';
import { useState } from 'react';
import { Favorites } from '../components/Favorites';

const config = appConfig as AppConfig;

const StyledHomePage = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#F9F9F9' : '#181818'};
  color: ${({ theme }) => (theme === 'light' ? '#222222' : '#DDDDDD')};

  a {
    color: ${({ theme }) => (theme === 'light' ? '#222222' : '#DDDDDD')};
  }
`;

export default function HomePage() {
  const [filterValue, setFilterValue] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <>
      <CSSReset />
      <StyledHomePage theme={theme}>
        <Menu
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          theme={theme}
          setTheme={setTheme}
        />
        <Header config={config} />
        <TimeLine filterValue={filterValue} playlists={config.playlists} />
        <Favorites favorites={config.favorites} />
      </StyledHomePage>
    </>
  );
}
