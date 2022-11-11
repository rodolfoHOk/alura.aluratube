import { useRouter } from 'next/router';
import styled from 'styled-components';
import { PlayLists, Video } from '../@types/AppConfig';

const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }

  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }

  section {
    width: 100%;
    padding: 0;
    overflow: hidden;

    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px, 1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;

      a {
        scroll-snap-align: start;

        :hover,
        :focus {
          opacity: unset;
          color: red;
          cursor: pointer;
          transform: scale(1.1);
          transition: all ease-in-out 0.2s;
        }

        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || '#222222'};
        }
      }
    }
  }
`;

interface TimeLineProps {
  playlists: PlayLists;
  filterValue: string;
}

export function TimeLine({ playlists, filterValue }: TimeLineProps) {
  const router = useRouter();
  const playlistsNames = Object.keys(playlists);

  function handleVideoClick(video: Video) {
    const [_, videoId] = video.url.split('/watch?v=');
    router.push(`/videos/${videoId}`);
  }

  return (
    <StyledTimeline>
      {playlistsNames.map((playlistsName, index) => {
        const videos = playlists[playlistsName];
        return (
          <section key={index}>
            <h2>{playlistsName}</h2>

            <div>
              {videos
                .filter((video) =>
                  video.title.toLowerCase().includes(filterValue.toLowerCase())
                )
                .map((video, index) => {
                  return (
                    <a key={index} onClick={() => handleVideoClick(video)}>
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
