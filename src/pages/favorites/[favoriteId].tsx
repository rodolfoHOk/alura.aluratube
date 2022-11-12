import styled from 'styled-components';
import { AppConfig } from '../../@types/AppConfig';
import appConfig from '../../../config.json';
import { Menu } from '../../components/Menu';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { FavoriteModel } from '../../model/favorite';
import { useRouter } from 'next/router';
import { FavoriteService } from '../../services/FavoriteService';
import { GithubUser } from '../../model/githubUser';
import { GithubUserService } from '../../services/GithubUserService';

const config = appConfig as AppConfig;

const StyledFavoritePage = styled.div`
  width: 100vw;
  flex: 1;
  display: flex;
  flex-direction: column;

  .content {
    align-self: center;
    margin-top: 40px;
    min-width: 400px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.backgroundLevel1};
    border-radius: 12px;
    border: 3px solid ${({ theme }) => theme.backgroundLevel2};

    .head {
      width: 400px;
      margin-top: -24px;
      margin-left: -24px;
      align-self: flex-start;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: ${({ theme }) => theme.backgroundLevel1};
      border-radius: 16px;
      border: 3px solid ${({ theme }) => theme.backgroundLevel2};

      img {
        width: 200px;
        height: 200px;
        border-radius: 16px 0 0 16px;
      }

      div {
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        h2 {
          font-size: 18px;
          font-weight: bold;
        }

        span {
          font-size: 16px;
        }
      }
    }

    .user-info {
      margin-top: 8px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      h3 {
        font-size: 20px;
        font-weight: bold;
      }

      span {
        font-size: 16px;
        color: #777777;
      }

      a {
        color: inherit;
      }
    }
  }
`;

export default function FavoritePage() {
  const { favoriteId } = useRouter().query;
  const [favorite, setFavorite] = useState<FavoriteModel | null>(null);
  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);

  useEffect(() => {
    if (favoriteId) {
      FavoriteService.getFavoriteById(Number(favoriteId as string)).then(
        (data) => setFavorite(data)
      );
    }
  }, [favoriteId]);

  useEffect(() => {
    if (favorite) {
      GithubUserService.getGithubUserInfos(favorite.username).then((data) =>
        setGithubUser(data)
      );
    }
  }, [favorite]);

  return (
    <StyledFavoritePage>
      <Menu showSearch={false} />

      <Header showBanner={false} config={config} />

      {githubUser && (
        <div className="content">
          <div className="head">
            <img src={githubUser.avatar_url} alt="Avatar do favorito" />
            <div>
              <h2>{githubUser.name}</h2>
              <span>@{githubUser.login}</span>
            </div>
          </div>
          <div className="user-info">
            <h3>Informações do Github</h3>
            {githubUser.bio && (
              <p>
                <span>Bio:</span> {githubUser.bio}
              </p>
            )}
            {githubUser.company && (
              <p>
                <span>Company:</span> {githubUser.company}
              </p>
            )}
            <p>
              <span>Local:</span> {githubUser.location}
            </p>
            <p>
              <span>Seguidores:</span> {githubUser.followers}
            </p>
            <p>
              <span>Seguindo:</span> {githubUser.following}
            </p>
            <p>
              <span>Usuário desde:</span>{' '}
              {new Date(githubUser.created_at).toLocaleDateString()}
            </p>
            <p>
              <span>Github Page:</span>{' '}
              <a href={githubUser.html_url}>{githubUser.html_url}</a>
            </p>
          </div>
        </div>
      )}
    </StyledFavoritePage>
  );
}
