import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import './css/styles.css'

export default function HistoryVideoDetail(props) {
    if (!props.video) return <div>Loading....</div>
    console.log(props.video)
    let videoSrc = props.video['video_url']
    console.log(videoSrc)
    return (
        <div>
            <div className='framePaper' id='selectedVideo'>
            <Paper elevation={6} className='selectedVideo'>
                <iframe frameBorder='0' height='100%' width='100%' title='Video Player' src={videoSrc}/>
            </Paper>
            <Paper elevation={6} className='videoDetail'>
                <Typography variant="h4">{props.video.snippet_title} - {props.video.snippet_channelTitle}</Typography>
                <Typography variant="subtitle1">{props.video.snippet_channelTitle}</Typography>
                <Typography variant="subtitle2">{props.video.snippet_description}</Typography>
            </Paper>
            </div>
        </div>
    )
}
