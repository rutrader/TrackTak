import {
  makeStyles,
  Box,
  Typography,
  Button,
  TextField,
  withStyles,
} from "@material-ui/core";
import React from "react";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff",
    },
    "& .PrivateNotchedOutline-root-9": {
      top: 0,
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "#9B5FEC",
      backgroundColor: "#9B5FEC",

      "& fieldset": {
        border: "none",
      },
      "&.Mui-focused": {
        borderColor: "#fff",
      },
    },
  },
})(TextField);

const TypographyHeader = withStyles({
  root: {
    fontWeight: 700,
    marginBottom: "15px",
    color: "#fff",
    animationDuration: "1.3s",
    animationDelay: "0.4s",
    animationName: "fadeInDown",
  },
})(Typography);

const TypographySubHeader = withStyles({
  root: {
    fontSize: "25px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#fff",
    visibility: "visible",
    animationDelay: "0.2s",
    animationName: "fadeInDown",
    animationDuration: "1.3s",
  },
})(Typography);

const TypographyText = withStyles({
  root: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "28px",
    color: "#fff",
    animationDuration: "1.3s",
    animationDelay: "0.6s",
    animationName: "fadeInLeft",
  },
})(Typography);

const CustomButton = withStyles({
  root: {
    background: "#43cea2",
    fontWeight: 600,
    padding: "17px 44px",
    fontSize: "20px",
    borderRadius: "50px",
    transition: "all .4s ease-in-out",
  },
})(Button);

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
      paddingTop: "70px",
      paddingBottom: "70px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    shapeOne: shape,
    shapeTwo: {
      ...shape,
      top: "auto",
      left: "auto",
      bottom: "-220px",
      right: "-220px",
    },
    subscribeForm: {
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      visibility: "visible",
      animationDelay: "0.8s",
      animationName: "fadeInUp",
      width: "100%",
      rowGap: "20px",
    },
    row: {
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
    },
    input: {
      maxWidth: "487px",
      minWidth: "300px",
      borderRadius: "33px",
      color: "#fff",
      fontSize: "16px",
      marginRight: "15px",
      height: "69px",
      padding: "0 30px",
      border: "1px solid transparent",
      transition: "all 0.3s ease-out 0s",
    },
  };
});

const SubscribeSection = () => {
  const classes = useStyles();

  return (
    <Box style={{ paddingTop: "100px" }}>
      <Box className={classes.subscribeWrapper}>
        <Box className={classes.shapeOne}></Box>
        <Box className={classes.shapeTwo}></Box>
        <Box className={classes.row}>
          <TypographySubHeader variant="h4">Newsletter</TypographySubHeader>
          <TypographyHeader variant="h3">
            Subscribe Our Newsletter
          </TypographyHeader>
          <TypographyText variant="h6">
            Sign up today to get exclusive access to the premium and more.
          </TypographyText>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "30px",
              width: "100%",
            }}
          >
            <form className={classes.subscribeForm}>
              <CssTextField
                variant="outlined"
                placeholder="Enter your email"
                InputProps={{
                  className: classes.input,
                  disableUnderline: true,
                }}
              />
              <CustomButton variant="contained" type="submit">
                SUBSCRIBE
              </CustomButton>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscribeSection;
