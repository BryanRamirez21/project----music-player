import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import MusicNoteIcon from "@mui/icons-material/MusicNote"

interface Song {
    name: string;
    url: string;
    duration: number;
}

interface Album {
    name: string;
    artist: string;
    year: number;
    tracks: Song[];
}

interface PlaylistProps {
    //songs: Song[],
    album: Album | null,
    onChangeSong: (song: string) => void
}

export function Playlist({ album, onChangeSong }: PlaylistProps) {
    if (!album) {
        return (
            <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                No album selected
            </Box>
        );
    }

    

    return (
        <List sx={{ maxHeight: 256, overflow: "auto" }}>
            {album.tracks.map((song, id) => (
                <ListItem
                    key={id}
                    sx={{
                    cursor: "pointer",
                    //bgcolor: currentSongId === song.id ? "action.selected" : "transparent",
                    //"&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <ListItemIcon>
                        <MusicNoteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={song.name}
                        secondary={album.artist}
                        primaryTypographyProps={{ noWrap: true }}
                        secondaryTypographyProps={{ noWrap: true }}
                        onClick={() => onChangeSong(song.name)}
                    />
                    <Box component="span" sx={{ flexShrink: 0, ml: 2, fontSize: "0.75rem", color: "text.secondary" }}>
                        {song.duration}
                    </Box>
            </ListItem>
            ))}
        </List>
    )
}

