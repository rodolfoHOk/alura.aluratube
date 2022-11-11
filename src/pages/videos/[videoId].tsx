import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import appConfig from '../../../config.json';
import { AppConfig, Video } from '../../@types/AppConfig';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';

const config = appConfig as AppConfig;

const StyledVideoPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .video {
    margin-top: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    h2 {
      font-weight: bold;
      font-size: 20px;
      padding: 0 16px;
    }

    iframe {
      max-width: 100%;
    }
  }
`;

export default function VideoPage() {
  const { videoId } = useRouter().query;
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const playlistsNames = Object.keys(config.playlists);
    let videos: Video[] = [];
    playlistsNames.forEach((playlistsName) =>
      videos.push(...config.playlists[playlistsName])
    );
    const video = videos.filter((video) =>
      video.url.includes(videoId as string)
    )[0];
    setVideo(video);
  }, [videoId]);

  return (
    <StyledVideoPage>
      <Menu showSearch={false} />

      <Header showBanner={false} config={config} />

      <div className="video">
        <h2>{video?.title}</h2>

        <iframe
          width="960"
          height="540"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </StyledVideoPage>
  );
}
