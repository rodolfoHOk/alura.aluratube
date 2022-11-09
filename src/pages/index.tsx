import styled from 'styled-components';
import appConfig from '../../config.json';
import { AppConfig } from '../@types/AppConfig';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { TimeLine } from '../components/TimeLine';
import { useState } from 'react';
import { Favorites } from '../components/Favorites';

const config = appConfig as AppConfig;

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  a {
    color: ${({ theme }) => theme.textColorBase};
  }
`;

export default function HomePage() {
  const [filterValue, setFilterValue] = useState('');

  return (
    <StyledHomePage>
      <Menu filterValue={filterValue} setFilterValue={setFilterValue} />

      <Header config={config} />

      <TimeLine filterValue={filterValue} playlists={config.playlists} />

      <Favorites favorites={config.favorites} />
    </StyledHomePage>
  );
}
