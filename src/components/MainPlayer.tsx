import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Tab, Tabs } from "@mui/material";
import { NowPlaying } from "./NowPlaying";
import { PlayerControls } from "./PlayingControls";
import { Playlist } from "./PlayList";
import playListSongs from '../data/playlists.json'

interface Album {
    name: string;
    artist: string;
    year: number;
    tracks: Song[];
}

interface Song {
    name: string;
    url: string;
    duration: number;
}

export default function MainPlayer(){

    
    const [album, setAlbum] = useState<Album | null>(null);
    const [song, setSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        //setTabValue(newValue)
    }
    const handleChangeAlbum = (albumSelected: string) => {
        const newAlbum = playListSongs.playlists.find(album => album.name === albumSelected) || null
        setAlbum(newAlbum);
    }
    const handleChangeSong = (songSelected: string) => {
        const newSong = album?.tracks.find(song => song.name === songSelected) || null
        setSong(newSong);        
    }

    return(
        <Box
            sx={{
                width: "100%",
                maxWidth: "400px",
                bgcolor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            <Box sx={{p:2}}>
                <NowPlaying song={song}/>

                <PlayerControls isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
            </Box>

            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                {
                    playListSongs.playlists.map(({name}, id) => (
                        <Tab key={id} label={name} onClick={() => handleChangeAlbum(name)} />
                    ))
                }
            </Tabs>

            <Box sx={{ p: 0 }}>
                {tabValue === 0 && (
                <Playlist album={album} onChangeSong={handleChangeSong} />
                )}

                {tabValue === 1 && (
                <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>Your music library will appear here</Box>
                )}
            </Box>
        </Box>
    );
}