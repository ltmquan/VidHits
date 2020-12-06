import React from 'react'
import {Paper, Typography} from '@material-ui/core'
import './css/styles.css'
import client from './axios'

function VideoDetail(props) {
    if (!props.video) return <div>Loading....</div>
    const videoSrc = `https://www.youtube.com/embed/${props.video.id.videoId}`
    const handleVideoClicked = () => {
        client.post('/addVideo', {
            video_url : videoSrc,
            snippet_title : props.video.snippet.title,
            snippet_channelTitle : props.video.snippet.channelTitle,
            snippet_description: props.video.snippet.description,
            snippet_thumbnail: props.video.snippet.thumbnails.medium.url,
            user_name : props.userName
        })
        .then(res => console.log(res.data))
    }
    return (
        <div className='framePaper' id='selectedVideo' onClick={handleVideoClicked}>
            <Paper elevation={6} className='selectedVideo'>
                <iframe frameBorder='0' height='100%' width='100%' title='Video Player' src={videoSrc}/>
            </Paper>
            <Paper elevation={6} className='videoDetail'>
                <Typography variant="h4">{props.video.snippet.title} - {props.video.snippet.channelTitle}</Typography>
                <Typography variant="subtitle1">{props.video.snippet.channelTitle}</Typography>
                <Typography variant="subtitle2">{props.video.snippet.description}</Typography>
            </Paper>
        </div>
    )
}

export default VideoDetail
