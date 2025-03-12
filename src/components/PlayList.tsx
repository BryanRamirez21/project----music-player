import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import { PlaylistProps } from "../types";
import { useSongChange } from "../hooks/useSongChange";

export function Playlist({ album, onSelectSong, currSong }: PlaylistProps) {
    const {formatTime} = useSongChange();

    if (!album) return null;

    return (
        <List sx={{ maxHeight: 256, overflow: "auto" }}>
            {album.tracks.map((song, id) => (
                <ListItem
                    key={id}
                    sx={{
                    cursor: "pointer",
                    bgcolor: currSong === song.name ? "action.selected" : "transparent",
                    "&:hover": { bgcolor: "action.hover" },
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
                        onClick={() => onSelectSong(song.name)}
                    />
                    <Box component="span" sx={{ flexShrink: 0, ml: 2, fontSize: "0.75rem", color: "text.secondary" }}>
                        {formatTime(song.duration)}
                    </Box>
            </ListItem>
            ))}
        </List>
    )
}
