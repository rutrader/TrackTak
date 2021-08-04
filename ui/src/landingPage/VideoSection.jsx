import React from "react";
import { Box, Hidden } from "@material-ui/core";
import GridDots from "../icons/grid-dots-purple.svg";
import YouTube from "react-youtube";
import * as styles from "../shared/video.module.css";

const VideoSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <YouTube
        videoId="uQOG6k8A-zc"
        containerClassName={styles.videoWrapper}
        opts={{
          width: 1500,
          height: 600,
        }}
      ></YouTube>
      <Box>
        <Hidden mdDown implementation="css">
          <GridDots
            style={{
              position: "absolute",
              right: "-70px",
              bottom: "-50px",
              zIndex: -1,
            }}
          />
        </Hidden>
      </Box>
    </Box>
  );
};

export default VideoSection;
