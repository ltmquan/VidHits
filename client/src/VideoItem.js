import React from 'react'
import {Grid, Paper, Typography} from '@material-ui/core'

export default function VideoItem({video, onVideoSelect}) {
    return (
        <div>
            <Grid item xs={12} style={{width:'33vw'}}>
                <Paper style={{display:'flex', alignItems:'center', cursor: 'pointer'}} onClick={()=> onVideoSelect(video)}>
                    <img style={{marginRight:'2vw'}} alt='thumbnail' src={video.snippet.thumbnails.medium.url}/>
                    <Typography variant='subtitle1'><b>{video.snippet.title}</b></Typography>
                </Paper>
            </Grid>
        </div>
    )
}
