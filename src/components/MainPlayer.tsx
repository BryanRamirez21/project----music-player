import { Alert, Box, Tab, Tabs } from "@mui/material";
import { NowPlaying } from "./NowPlaying";
import { PlayerControls } from "./PlayingControls";
import { Playlist } from "./PlayList";
import playListSongs from '../data/playlists.json'
import { useSongChange } from "../hooks/useSongChange";
import { UseSongChangeReturn, UseAlbumChangeReturn } from "../types";
import { useAlbumChange } from "../hooks/useAlbumChange";


export default function MainPlayer() {
    const {
        album,
        handleChangeAlbum,
        tabValue,
        handleTabChange,
    }: UseAlbumChangeReturn = useAlbumChange();


    const {
      song,
      handleSelectedSong,
      handleChangeSong,
      albumSongData,
      songError,
    }: UseSongChangeReturn = useSongChange(album);

    return(
        <Box
            sx={{
                width: "100%",
                maxWidth: "600px",
                bgcolor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            
            <Box sx={{p:2}}>
                {songError && <Alert severity="error">There was an error loading the song</Alert>}

                <NowPlaying song={song} albumName={albumSongData.albumName} albumArtist={albumSongData.albumArtist}/>
                
                <PlayerControls song={song} onChangeSong={handleChangeSong} />
            </Box>

            <Tabs value={tabValue} onChange={() => handleTabChange} variant="fullWidth">
                {playListSongs.playlists.map(({name}, id) => (
                    <Tab key={id} label={name} onClick={() => handleChangeAlbum(name)} />
                ))}
            </Tabs>

            <Box sx={{ p: 0 }}>
                <Playlist album={album} onSelectSong={handleSelectedSong} currSong={song?.name || ""}/>

                {tabValue === -1 && (
                <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>Your music library will appear here</Box>
                )}
            </Box>
        </Box>
    );
}