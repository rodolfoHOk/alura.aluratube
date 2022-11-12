import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppConfig } from '../../@types/AppConfig';
import appConfig from '../../../config.json';
import { Header } from '../../components/Header';
import { Menu } from '../../components/Menu';
import { VideoModel } from '../../model/video';
import { VideoService } from '../../services/VideoService';

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
  const [video, setVideo] = useState<VideoModel | null>(null);

  useEffect(() => {
    VideoService.getVideoById(Number(videoId)).then((data) => setVideo(data));
  }, [videoId]);

  function extractGoogleVideoId(url: string): string {
    return url.split('/watch?v=')[1];
  }

  return (
    <StyledVideoPage>
      <Menu showSearch={false} />

      <Header showBanner={false} config={config} />

      {video && (
        <div className="video">
          <h2>{video.title}</h2>

          <iframe
            width="960"
            height="540"
            src={`https://www.youtube.com/embed/${extractGoogleVideoId(
              video.url
            )}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
    </StyledVideoPage>
  );
}
