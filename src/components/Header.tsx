import styled from 'styled-components';
import { AppConfig } from '../@types/AppConfig';
import { Banner } from './Banner';

const StyledHeader = styled.div`
  margin-top: 64px;
  background-color: ${({ theme }) => theme.backgroundLevel1};

  .user-info {
    display: flex;
    align-items: center;
    width: calc(100% - 32px);
    padding: 16px, 32px;
    margin: 16px;
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
      <Banner url={config.banner} />
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
