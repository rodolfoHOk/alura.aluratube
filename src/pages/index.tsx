import styled from 'styled-components';
import appConfig from '../../config.json';
import { AppConfig } from '../@types/AppConfig';

const config = appConfig as AppConfig;

function HomePage() {
  const homePageStyles = { backgroundColor: 'red' };

  return (
    <div style={homePageStyles}>
      <Menu />
      <Header />
      <TimeLine />
    </div>
  );
}

export default HomePage;

function Menu() {
  return (
    <div>
      <p>Menu</p>
    </div>
  );
}

const StyledHeader = styled.div`
  .user-info {
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

function TimeLine() {
  return (
    <div>
      <p>TimeLine</p>
    </div>
  );
}
