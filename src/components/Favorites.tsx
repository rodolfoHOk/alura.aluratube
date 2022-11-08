import styled from 'styled-components';
import { GithubPerson } from '../@types/AppConfig';

const StyledFavorites = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-bottom: 8px;

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }

  section {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    overflow: hidden;
  }

  .github-person {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    a {
      font-size: 14px;
      text-decoration: none;
      color: black;

      :hover {
        opacity: unset;
        color: black;
      }
    }
  }
`;

interface FavoritesProps {
  favorites: GithubPerson[];
}

export function Favorites({ favorites }: FavoritesProps) {
  return (
    <StyledFavorites>
      <h2>AluraTubes Favoritos</h2>
      <section>
        {favorites.map((favorite) => (
          <div className="github-person">
            <img
              src={`https://github.com/${favorite.username}.png`}
              alt="github user avatar"
            />
            <a href={`https://github.com/${favorite.username}`}>
              @{favorite.username}
            </a>
          </div>
        ))}
      </section>
    </StyledFavorites>
  );
}
