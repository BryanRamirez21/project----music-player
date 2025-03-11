import { Album } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Song {
    name: string;
    url: string;
    duration: number;
}
interface SongProps {
    song: Song | null
}

export function NowPlaying({song}: SongProps){
    
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    useEffect(() => {
        if (song && audioElement) {
            audioElement.src = song.url;
            audioElement.load();
        }
    }, [song, audioElement]);

    if (!song) {
        return (
            <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                No song selected
            </Box>
        );
    }
    
    return(
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Box
                sx={{ position: "relative", width: 192, height: 192, mb: 2, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
            >
                <Box
                    component="img"
                    alt={` album cover`}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0,0,0,0.4)",
                        opacity: 1,
                    }}
                >
                    <Album sx={{ fontSize: 48, color: "rgba(255,255,255,0.8)" }} />
                </Box>
                <audio ref={setAudioElement} controls>
                    <source src={song.url} type="audio/mpeg" />
                </audio>

            </Box>

            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" noWrap sx={{ maxWidth: 250 }}>
                    song.name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    album.artist
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    album.name
                </Typography>
            </Box>
        </Box>
    );
}