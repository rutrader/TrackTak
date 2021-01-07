import {
  Box,
  Typography,
  withStyles,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
import SearchTicker from "../components/SearchTicker";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SettingsIcon from "@material-ui/icons/Settings";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import { ReactComponent as BackgroundPurple } from "../icons/backgroundPurple.svg";

const VerifiedUserIconHome = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    minWidth: "40px",
    minHeight: "40px",
    color: theme.palette.primary.main,
  },
}))(VerifiedUserIcon);

const SettingsIconHome = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    minWidth: "40px",
    minHeight: "40px",
    color: theme.palette.primary.main,
  },
}))(SettingsIcon);

const VerticalSplitIconHome = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    minWidth: "40px",
    minHeight: "40px",
    color: theme.palette.primary.main,
  },
}))(VerticalSplitIcon);

const TypographyHeader = withStyles((theme) => ({
  root: {
    fontWeight: "bold",
    fontSize: 37,
    textAlign: "center",
    color: "#292929",
  },
}))(Typography);

const TypographyText = withStyles((theme) => ({
  root: {
    fontSize: 20,
    textAlign: "center",
    color: "#292929",
  },
}))(Typography);

const Home = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box style={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TypographyHeader>
            Goodbye, spreadsheets.
            <Box>Hello, automated Discounted Cash Flows.</Box>
          </TypographyHeader>
        </Box>

        <Box>
          <Box flexWrap="wrap" justifyContent={["center", "center", "initial"]}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                minWidth: "300px",
                mt: "5%",
              }}
            >
              <TypographyText>
                <Box>
                  <SettingsIconHome />
                </Box>
                Automates your models inputs based on historical and current
                data.
              </TypographyText>

              <TypographyText>
                <Box>
                  <VerticalSplitIconHome />
                </Box>
                Store all of your model variations in one place instead of 100’s
                of spreadsheets.
              </TypographyText>

              <TypographyText>
                <Box>
                  <VerifiedUserIconHome />
                </Box>
                Diagnoses errors and unrealistic free cash flows in your models.
              </TypographyText>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            justifyContent: "center",
            pt: 2.5,
            mb: 2,
            mt: "5%",
          }}
        >
          <Typography
            style={{ color: "#292929" }}
            variant="h5"
            align="center"
            gutterBottom
          >
            Search now to automate your DCF.
          </Typography>
          <SearchTicker />
        </Box>
        <Box
          className="landing-page-background-purple"
          style={{
            width: "100%",
            height: 240,
            bottom: 0,
            left: 0,
            position: "absolute",
          }}
          zIndex={-1}
        >
          <Hidden smDown>
            <BackgroundPurple
              height="100%"
              width="100%"
              style={{ transform: "rotateX(180deg)" }}
            />
          </Hidden>
        </Box>
      </Box>
    </>
  );
};

export default Home;
