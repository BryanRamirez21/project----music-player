export interface Song {
  name: string;
  url: string;
  duration: number;
}

export interface Album {
  name: string;
  artist: string;
  year: number;
  tracks: Song[];
}

export interface SongProps {
  song: Song | null;
  albumName: string;
  albumArtist: string;
}

export interface PlaylistProps {
  currSong: string;
  album: Album | null;
  onSelectSong: (song: string) => void;
}

export interface PlayerControlsProps {
  song: Song | null;
  onChangeSong: (action: number) => void;
}

export interface UseSongChangeReturn {
  song: Song | null;
  handleSelectedSong: (songSelected: string) => void;
  handleChangeSong: (btnPressedVal: number) => void;
  albumSongData: { albumName: string; albumArtist: string };
  songError: boolean;
  formatTime: (time: number) => string;
}

export interface UseAlbumChangeReturn {
  album: Album | null;
  handleChangeAlbum: (albumSelected: string) => void;
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}