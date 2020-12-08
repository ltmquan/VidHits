import React, {useState, useEffect} from 'react'
import {Paper, Typography} from '@material-ui/core'
import './css/styles.css'
import { Button } from 'react-bootstrap'

export default function HistoryVideoDetail(props) {

    if (!props.video) return <div>Loading....</div>
    console.log(props.video)
    let videoSrc = props.video['video_url']
    console.log(videoSrc)

    return (
        <div>
            <Button variant="outline-danger" className='deleteFromHistory' onClick={props.deleteFromHistory}>Delete Video From Your Watch History</Button>
            <div className='framePaper' id='selectedVideo'>
                <Paper elevation={6} className='selectedVideo'>
                    <iframe frameBorder='0' height='100%' width='100%' title='Video Player' src={videoSrc}/>
                </Paper>
                <Paper elevation={6} className='videoDetail'>
                    <Typography variant="h3">{props.video.snippet_title} - {props.video.snippet_channelTitle}</Typography>
                    <br/>
                    <br/>
                    <Typography variant="subtitle2" style={{'font-size':'1.5vw'}}>{props.video.snippet_description}</Typography>
                </Paper>
            </div>
        </div>
    )
}
