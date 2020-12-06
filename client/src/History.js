import React, { useEffect, useState } from "react";
import NavigationBar from "./NavBar/NavigationBar";
import "./css/styles.css";
import client from "./axios";
import HistoryList from "./HistoryList";
import { Grid } from "@material-ui/core";
import VideoDetail from "./VideoDetail";
import HistoryVideoDetail from "./HistoryVideoDetail";
import SearchBar from "./SearchBar";

export default function History() {
    const [videoList, setVideoList] = useState([]);
    const [selectedVideo, setselectedVideo] = useState(null);
    useEffect(() => {
        let videos = [];
        client
            .get("/viewhistory")
            .then((res) => {
                for (let video in res.data) {
                    videos.push(res.data[video]);
                }
            })
            .then(() => {
                setVideoList(videos);
                console.log(videos[0]);
                setselectedVideo(videos[0]);
            });
    }, []);

    console.log(videoList);
    console.log(selectedVideo);

    const onVideoSelect = (video) => {
        setselectedVideo(video);
    };

    return (
        <div>
            <NavigationBar />
            <Grid style={{ justifyContent: "center" }} container spacing={10}>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={8} className="selectedVideoGrid">
                            <HistoryVideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <HistoryList
                                videos={videoList}
                                onVideoSelect={onVideoSelect}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
