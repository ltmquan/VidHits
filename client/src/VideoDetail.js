import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./css/styles.css";
import client from "./axios";
import { Button, Alert } from "react-bootstrap";

function VideoDetail(props) {
    const [addVideoMessage, setaddVideoMessage] = useState(null);
    const [popupColor, setpopupColor] = useState(null);
    
    if (!props.video) return <div>Please type in your search above ....</div>;
    const videoSrc = `https://www.youtube.com/embed/${props.video.id.videoId}`;
    const handleVideoClicked = () => {
        client
            .post("/addVideo", {
                video_url: videoSrc,
                snippet_title: props.video.snippet.title,
                snippet_channelTitle: props.video.snippet.channelTitle,
                snippet_description: props.video.snippet.description,
                snippet_thumbnail: props.video.snippet.thumbnails.medium.url,
                user_name: props.userName,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data === "Video added to watch history successfully") {
                    setaddVideoMessage(
                        "Video added to watch history successfully"
                    );
                    setpopupColor('success')
                    props.setShow(true);
                } else if (
                    res.data === "Video already added to history database"
                ) {
                    setaddVideoMessage(
                        "Video already added to history database"
                    );
                    setpopupColor('danger')
                    props.setShow(true);
                } else {
                    setaddVideoMessage("Unable to add video at the moment");
                    setpopupColor('danger')
                    props.setShow(true);
                }
            });
    };

    return (
        <div>
            <Button
                variant="outline-danger"
                className="addToHistory"
                onClick={handleVideoClicked}
            >
                Add Video to Your Watch History
            </Button>
            {addVideoMessage && props.show === true && (
                <Alert
                    variant={popupColor}
                    onClose={() => props.setShow(false)}
                    dismissible
                    className='alertMessage'
                >
                    <Alert.Heading>{addVideoMessage}</Alert.Heading>
                </Alert>
            )}
            <div className="framePaper" id="selectedVideo">
                <Paper elevation={6} className="selectedVideo">
                    <iframe
                        id="iframe"
                        frameBorder="0"
                        height="100%"
                        width="100%"
                        title="Video Player"
                        src={videoSrc}
                    />
                </Paper>
                <Paper elevation={6} className="videoDetail">
                    <Typography variant="h3">
                        {props.video.snippet.title} -{" "}
                        {props.video.snippet.channelTitle}
                    </Typography>
                    <br />
                    <br />
                    <Typography
                        variant="subtitle2"
                        style={{ fontSize: "1.5vw" }}
                    >
                        {props.video.snippet.description}
                    </Typography>
                </Paper>
            </div>
        </div>
    );
}

export default VideoDetail;
