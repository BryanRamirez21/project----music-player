import { Box, IconButton, Slider, Typography } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import React, { useEffect, useRef, useState } from "react"
import { VolumeOff, VolumeUp } from "@mui/icons-material"
import { PlayerControlsProps, UseAlbumChangeReturn } from "../types";
import { useSongChange } from "../hooks/useSongChange"
import { useAlbumChange } from "../hooks/useAlbumChange"


export function PlayerControls({song, onChangeSong}: PlayerControlsProps) {

    const {album}: UseAlbumChangeReturn = useAlbumChange();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState<number>(60);
    const [pause, setPause] = useState<boolean>(true);
    const [currTime, setCurrTime] = useState<number>(0);

    const {formatTime} = useSongChange(album);

    useEffect(() => {
        if (!audioRef.current) return;

        setPause(true);
        setCurrTime(0);

        const updateTime = () => setCurrTime(audioRef.current!.currentTime);

        const audio = audioRef.current;
        audio.addEventListener("timeupdate", updateTime);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };
    }, [song]);
    

    const handleVolumeChange = (newValue: number | number[]): void => {
        setVolume(newValue as number);
        if (audioRef.current) audioRef.current.volume = volume / 100;
    };

    const handlePause = (): void => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setPause(true);
        } else {
            audioRef.current.pause();
            setPause(false);
        }
    }
    
    const handleCurrSongTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newTime = parseFloat(e.target.value)
        setCurrTime(newTime);
        if (audioRef.current) audioRef.current.currentTime = newTime;        
    }

    if (!song) {
        return (
            <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                No song selected
            </Box>
        );
    }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <audio className="hidden" key={song.url} autoPlay controls ref={audioRef}><source src={song.url} type="audio/mpeg"/></audio>

        <Slider value={currTime} defaultValue={0} sx={{ width: "100%", mb: 2 }} onChange={() => handleCurrSongTime} max={song.duration}/>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="caption" color="text.secondary">
                {formatTime(currTime)}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                

                <IconButton size="small">
                    <SkipPreviousIcon onClick={() => onChangeSong(0)}/>
                </IconButton>

                <IconButton
                    onClick={handlePause}
                    sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    "&:hover": { bgcolor: "action.hover" },
                    mx: 1,
                    }}
                >
                    {pause ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                <IconButton size="small">
                    <SkipNextIcon onClick={() => onChangeSong(1)}/>
                </IconButton>
            </Box>

            <Typography variant="caption" color="text.secondary">
                {formatTime(song.duration)}
            </Typography>

        </Box>


        <Box sx={{ display: "flex", alignItems: "center", width: "90%" }}>
            {volume === 0 ? (
                <VolumeOff fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
            ) : (
                <VolumeUp fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
            )}
            <Slider value={volume} onChange={() => handleVolumeChange} sx={{ width: "100%" }} />
        </Box>


    </Box>
  
    
  )
}
