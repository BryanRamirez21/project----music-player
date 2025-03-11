interface Volume{
    volume: number,
    onVolumeChange: (value: number) => void
}

export function VolumeControls({volume, onVolumeChange}: Volume){
    const handleVolumeChange = (values: number[]) => onVolumeChange(values[0]);

    return(
        <div className="flex items-center space-x-2 w-32">
            {volume === 0 ? "0" : volume}
            <img />    
        </div>
    );
}