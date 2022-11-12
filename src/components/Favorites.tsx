import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FavoriteModel } from '../model/favorite';

const StyledFavorites = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 8px;
  overflow: hidden;

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }

  section {
    width: 100%;
    overflow: hidden;

    div {
      width: calc(100vw - 16px * 4);
      height: 130px;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 8px;
      overflow-x: scroll;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        :hover,
        :focus {
          opacity: unset;
          color: red;
          cursor: pointer;
          transform: scale(1.1);
          transition: all ease-in-out 0.2s;
        }

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }

        span {
          display: block;
          font-size: 14px;
          text-decoration: none;
        }
      }
    }
  }
`;

interface FavoritesProps {
  favorites: FavoriteModel[];
}

export function Favorites({ favorites }: FavoritesProps) {
  const router = useRouter();

  return (
    <StyledFavorites>
      <h2>AluraTubes Favoritos</h2>

      <section>
        <div>
          {favorites.map((favorite) => (
            <a
              key={favorite.username}
              onClick={() => router.push(`/favorites/${favorite.id}`)}
            >
              <img
                src={`https://github.com/${favorite.username}.png`}
                alt="github user avatar"
              />

              <span>@{favorite.username}</span>
            </a>
          ))}
        </div>
      </section>
    </StyledFavorites>
  );
}
