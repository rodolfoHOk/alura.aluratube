import styled from 'styled-components';
import appConfig from '../../config.json';
import { AppConfig, PlayLists } from '../@types/AppConfig';
import { CSSReset } from '../components/CSSReset';
import { Menu } from '../components/Menu';
import { StyledTimeline } from '../components/TimeLine';

const config = appConfig as AppConfig;

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function HomePage() {
  return (
    <>
      <CSSReset />
      <StyledHomePage>
        <Menu />
        <Header />
        <TimeLine playlists={config.playlists} />
      </StyledHomePage>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  .user-info {
    margin-top: 64px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px, 32px;
    gap: 16px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      {/* <img src="" alt="header banner" /> */}
      <section className="user-info">
        <img
          src={`https://github.com/${config.github}.png`}
          alt="foto do perfil"
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

interface TimeLineProps {
  playlists: PlayLists;
}

function TimeLine(props: TimeLineProps) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistsName) => {
        const videos = props.playlists[playlistsName];
        return (
          <section>
            <h2>{playlistsName}</h2>

            <div>
              {videos.map((video, index) => {
                return (
                  <a key={index} href={video.url}>
                    <img src={video.thumb} />
                    <p>{video.title}</p>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
