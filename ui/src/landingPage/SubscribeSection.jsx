import { Box, Typography } from "@material-ui/core";
import React from "react";
import SubscribeMailingList from "../components/SubscribeMailingList";

const shapePseudo = {
  content: '""',
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "inherit",
  borderRadius: "50%",
  transform: "scale(1.2)",
};

const shape = {
  position: "absolute",
  width: "367px",
  height: "367px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.04)",
  top: "-220px",
  left: "-220px",
  zIndex: -1,
  "&::before": shapePseudo,
  "&::after": {
    ...shapePseudo,
    transform: "scale(1.4)",
  },
};

const SubscribeSection = () => {
  return (
    <Box
      sx={{
        mt: 15,
        borderRadius: "30px",
        background:
          "linear-gradient(to right bottom, #6240c8 0%, #a145fe 100%)",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        padding: (theme) => `${theme.spacing(8.75)} ${theme.spacing(2)}`,
      }}
    >
      <Box
        sx={{
          ...shape,
        }}
      />
      <Box
        sx={{
          ...shape,
          top: "auto",
          left: "auto",
          bottom: "-220px",
          right: "-220px",
        }}
      />
      <Box
        sx={{
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#fff",
            animationDuration: "1.3s",
            animationDelay: "0.4s",
            animationName: "fadeInDown",
          }}
          variant="h3"
          gutterBottom
        >
          Keep up to date
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            color: "#fff",
            animationDuration: "1.3s",
            animationDelay: "0.6s",
            animationName: "fadeInLeft",
          }}
          variant="h6"
          gutterBottom
        >
          Join our mailing list and be notified immediately when new features
          &amp; valuations are released.
        </Typography>
        <SubscribeMailingList
          inputColor="secondary"
          locationSignup="Landing Page"
        />
      </Box>
    </Box>
  );
};

export default SubscribeSection;
