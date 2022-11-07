import styled from 'styled-components';
import appConfig from '../../config.json';
import { AppConfig } from '../@types/AppConfig';
import { CSSReset } from '../components/CSSReset';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TimeLine } from '../components/TimeLine';

const config = appConfig as AppConfig;

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function HomePage() {
  return (
    <>
      <CSSReset />
      <StyledHomePage>
        <Menu />
        <Header config={config} />
        <TimeLine playlists={config.playlists} />
      </StyledHomePage>
    </>
  );
}
