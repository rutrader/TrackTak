import { makeStyles, Box, Typography, withStyles } from "@material-ui/core";
import React from "react";
import SubscribeMailingList from "../components/SubscribeMailingList";

const Header = withStyles({
  root: {
    fontWeight: 700,
    color: "#fff",
    animationDuration: "1.3s",
    animationDelay: "0.4s",
    animationName: "fadeInDown",
  },
})(Typography);

const Text = withStyles({
  root: {
    fontWeight: 400,
    color: "#fff",
    animationDuration: "1.3s",
    animationDelay: "0.6s",
    animationName: "fadeInLeft",
  },
})(Typography);

const useStyles = makeStyles((theme) => {
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

  return {
    subscribeWrapper: {
      borderRadius: "30px",
      background: "linear-gradient(to right bottom, #6240c8 0%, #a145fe 100%)",
      position: "relative",
      overflow: "hidden",
      zIndex: 1,
      padding: `${theme.spacing(8.75)} ${theme.spacing(2)}`,
    },
    shapeOne: shape,
    shapeTwo: {
      ...shape,
      top: "auto",
      left: "auto",
      bottom: "-220px",
      right: "-220px",
    },
    row: {
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
    },
    input: {
      borderRadius: "33px",
      color: "#fff",
      height: "69px",
      border: "1px solid transparent",
      transition: "all 0.3s ease-out 0s",
    },
  };
});

const SubscribeSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.subscribeWrapper}>
      <Box className={classes.shapeOne} />
      <Box className={classes.shapeTwo} />
      <Box className={classes.row}>
        <Header variant="h3" gutterBottom>
          Keep up to date
        </Header>
        <Text variant="h6" gutterBottom>
          Join our mailing list and be notified immediately when new
          features/valuations are released.
        </Text>
        <SubscribeMailingList />
      </Box>
    </Box>
  );
};

export default SubscribeSection;
