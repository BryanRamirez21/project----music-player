import { useState } from 'react'
import { Song, UseSongChangeReturn, Album } from '../types';

export const useSongChange = (album: Album | null): UseSongChangeReturn => {

    const [song, setSong] = useState<Song | null>(null);
    const [albumSongData, setAlbumSongData] = useState<{ albumName: string; albumArtist: string }>({ albumName: "", albumArtist: "" });
    const [songError, setSongError] = useState<boolean>(false);

    const handleSelectedSong = (songSelected: string): void => {
        setSongError(false);
        if (!album) throw new Error("No album selected");
    
        const newSong = album.tracks.find(song => song.name === songSelected);
        if (!newSong) throw new Error(`Song "${songSelected}" not found in album "${album.name}"`);
    
        const audio = new Audio(newSong.url);
        audio.onerror = () => setSongError(true);
        audio.load();
    
        setSong(newSong);
        setAlbumSongData({ albumName: album.name, albumArtist: album.artist });
    };

    const handleChangeSong = (btnPressedVal: number): void => {
        if (!album || !song) throw new Error("No album or song selected");
    
        const trackIndex = album.tracks.findIndex((csong) => csong.name === song.name);
        const nextSong = btnPressedVal === 1 ? album.tracks[trackIndex + 1]?.name : album.tracks[trackIndex - 1]?.name;
    
        if (!nextSong) throw new Error("No next/previous song found");
    
        handleSelectedSong(nextSong);
      };


    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return {
        song,
        handleSelectedSong,
        handleChangeSong,
        albumSongData,
        songError,
        formatTime
    }
}
