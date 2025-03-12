import { Album } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { SongProps } from "../types";

export function NowPlaying({song, albumName, albumArtist}: SongProps){
    
    if (!song) return null;
    
    return(
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Box
                sx={{ position: "relative", width: 192, height: 192, mb: 2, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
            >
                
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
            </Box>

            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" noWrap sx={{ maxWidth: 250 }}>
                    {song.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {albumName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {albumArtist}
                </Typography>
            </Box>
        </Box>
    );
}