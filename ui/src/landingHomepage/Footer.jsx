import {
  Box,
  makeStyles,
  Typography,
  Button,
  withStyles,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { ReactComponent as TracktakPurple } from "../icons/tracktak-purple.svg";
import { ReactComponent as FooterImage } from "../icons/footer-bg.svg";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const CustomButton = withStyles({
  root: {
    textTransform: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: 600,
    color: "#313450",
    padding: "16px",
  },
})(Button);

const CustomIconButton = withStyles({
  root: {
    width: "45px",
    height: "45px",
    lineHeight: "48px",
    borderRadius: "50%",
    color: "#6B6F92",
    background: "#fff",
    margin: "0 8px",
  },
})(IconButton);

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    paddingTop: "150px",
    background: "#F4F7FC",
  },
  row: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  },

  image: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: -1,
  },

  footerMenu: {
    background: "#fff",
    borderRadius: "10px",
    width: "100%",
  },

  footerCopyright: {
    padding: "30px 0",
    display: "flex",
    justifyContent: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <FooterImage className={classes.image} />
      <Box>
        <Box className={classes.row}>
          <Box style={{ width: "100%" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box style={{ marginBottom: "30px" }}>
                <TracktakPurple src="icons/tracktak-black.svg" alt="" />
              </Box>
              <Box style={{ marginBottom: "30px" }}>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <CustomIconButton
                    onClick={() => {
                      window.location.href =
                        "https://linkedin.com/company/tracktak";
                    }}
                  >
                    <LinkedInIcon />
                  </CustomIconButton>
                </Box>
              </Box>
              <Box className={classes.footerMenu}>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Box>
                    <CustomButton>Home</CustomButton>
                  </Box>
                  <Box>
                    <CustomButton>Features</CustomButton>
                  </Box>
                  <Box>
                    <CustomButton>Process</CustomButton>
                  </Box>
                  <Box>
                    <CustomButton>Valuations</CustomButton>
                  </Box>
                  <Box>
                    <CustomButton>Contact</CustomButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.footerCopyright}>
          <Typography style={{ fontSize: "16px" }}>
            © 2021 tracktak ltd. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
