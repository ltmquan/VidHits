import React from "react";
import HistoryVideoItem from "./HistoryVideoItem";
import {Grid} from '@material-ui/core';

export default function HistoryList({videos, onVideoSelect}) {
    const listOfVideos = videos.map((video, id) => (
        <HistoryVideoItem key={id} video={video} onVideoSelect={onVideoSelect}/>
    ));
    return (
        <div>
            <Grid container spacing={10} style={{'margin-top':'10%'}}>
                {listOfVideos}
            </Grid>
        </div>
    );
}
