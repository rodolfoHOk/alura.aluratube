import styled from 'styled-components';
import { AppConfig } from '../@types/AppConfig';

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

interface HeaderProps {
  config: AppConfig;
}

export function Header({ config }: HeaderProps) {
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
