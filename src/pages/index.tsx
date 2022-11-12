import { useEffect, useState } from 'react';
import styled from 'styled-components';
import appConfig from '../../config.json';
import { AppConfig } from '../@types/AppConfig';
import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { TimeLine } from '../components/TimeLine';
import { Favorites } from '../components/Favorites';
import { VideoModel } from '../model/video';
import { PlaylistModel } from '../model/playlist';
import { VideoService } from '../services/VideoService';
import { PlaylistService } from '../services/PlaylistService';
import { RegisterVideo } from '../components/RegisterVideo';
import { FavoriteModel } from '../model/favorite';
import { FavoriteService } from '../services/FavoriteService';

const config = appConfig as AppConfig;

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  a {
    color: ${({ theme }) => theme.textColorBase};
  }
`;

export default function HomePage() {
  const [filterValue, setFilterValue] = useState('');
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [hydratedPlaylists, setHydratedPlaylists] =
    useState<Map<string, VideoModel[]>>();
  const [favorites, setFavorites] = useState<FavoriteModel[]>([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    PlaylistService.getAllPlaylists().then((data) => setPlaylists(data));
  }, []);

  useEffect(() => {
    if (showRegisterForm === false) {
      VideoService.getAllVideos().then((data) => setVideos(data));
    }
  }, [showRegisterForm]);

  useEffect(() => {
    if (playlists.length && videos.length) {
      let hydrate = new Map<string, VideoModel[]>();
      videos.forEach((video) => {
        const videoPlayListName = playlists.filter(
          (playlist) => playlist.id === video.playlist_id
        )[0].name;
        if (!hydrate[videoPlayListName]) {
          hydrate[videoPlayListName] = [];
        }
        hydrate[videoPlayListName].push(video);
      });
      setHydratedPlaylists(hydrate);
    }
  }, [playlists, videos]);

  useEffect(() => {
    FavoriteService.getAllFavorites().then((data) => setFavorites(data));
  }, []);

  return (
    <>
      <StyledHomePage>
        <Menu
          showSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />

        <Header config={config} showBanner />

        {hydratedPlaylists && (
          <TimeLine filterValue={filterValue} playlists={hydratedPlaylists} />
        )}

        {favorites.length > 0 && <Favorites favorites={favorites} />}
      </StyledHomePage>
      <RegisterVideo show={showRegisterForm} setShow={setShowRegisterForm} />
    </>
  );
}
