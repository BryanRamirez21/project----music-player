import { Box, IconButton, Slider, Typography } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import RepeatIcon from "@mui/icons-material/Repeat"

interface PlayerControlsProps {
    isPlaying: boolean
    onPlayPause: () => void
}

export function PlayerControls({ isPlaying, onPlayPause }: PlayerControlsProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Slider defaultValue={33} sx={{ width: "100%", mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="caption" color="text.secondary">
                4:20
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
                <ShuffleIcon fontSize="small" />
            </IconButton>

            <IconButton size="small">
                <SkipPreviousIcon />
            </IconButton>

            <IconButton
                onClick={onPlayPause}
                sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                "&:hover": { bgcolor: "action.hover" },
                mx: 1,
                }}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton size="small">
                <SkipNextIcon />
            </IconButton>

            <IconButton size="small" sx={{ color: "text.secondary" }}>
                <RepeatIcon fontSize="small" />
            </IconButton>
            </Box>
            <Typography variant="caption" color="text.secondary">
            4:03
            </Typography>
        </Box>
    </Box>
  )
}

