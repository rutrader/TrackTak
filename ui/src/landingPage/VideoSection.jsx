import React from "react";
import { Box, Hidden } from "@material-ui/core";
import GridDots from "../assets/grid-dots-purple.svg";
import YoutubeTutorial from "../components/YoutubeTutorial";

const VideoSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <YoutubeTutorial />
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
