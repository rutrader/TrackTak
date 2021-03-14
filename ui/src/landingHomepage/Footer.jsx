import {
  Box,
  makeStyles,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import React from "react";
import TracktakPurple from "../assets/tracktak-purple.svg";
import FooterImage from "../assets/footer-bg.svg";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

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
    paddingTop: "150px",
    display: "flex",
    justifyContent: "center",
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
    width: "100%",
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
              <Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <CustomIconButton
                    onClick={() => {
                      window.location.href =
                        "https://linkedin.com/company/tracktak";
                    }}
                  >
                    <LinkedInIcon style={{ color: "#43cea2" }} />
                  </CustomIconButton>
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
