import { useState } from 'react'
import playListSongs from '../data/playlists.json'
import { Album, UseAlbumChangeReturn } from '../types';

export const useAlbumChange = (): UseAlbumChangeReturn => {

    const [album, setAlbum] = useState<Album | null>(null);
    const [tabValue, setTabValue] = useState<number>(0);
    
    
    const handleChangeAlbum = (albumSelected: string): void => {
        const newAlbum = playListSongs.playlists.find(album => album.name === albumSelected);
        if (!newAlbum) throw new Error(`Album "${albumSelected}" not found`); 
        setAlbum(newAlbum);
    };

    const handleTabChange = (newValue: number): void => {
        setTabValue(newValue);
    };

    return {
        album,
        handleChangeAlbum,
        tabValue,
        handleTabChange,
    }
}
