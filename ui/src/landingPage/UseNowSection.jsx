import { Box, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "gatsby";
import React from "react";
import RoundButton from "../components/RoundButton";
import { useTheme } from "@material-ui/styles";

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

const UseNowSection = () => {
  const theme = useTheme();
  return (
    <Box
      id="get-started"
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
            color: theme.palette.primary.contrastText,
          }}
          variant="h3"
          gutterBottom
        >
          Get Started Now
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            color: theme.palette.primary.contrastText,
          }}
          variant="h6"
          gutterBottom
        >
          By proceeding to create your account and use TRACKTAK, you are
          agreeing to our{" "}
          <Link href="/terms-and-conditions">
            <b>terms and conditions</b>
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy">
            <b>privacy policy</b>
          </Link>
          .
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2.5 }}>
          <RoundButton
            variant="contained"
            type="submit"
            component={RouterLink}
            to="/sign-up"
            sx={{ mb: 2.5 }}
          >
            <Typography fontSize={20} sx={{ textTransform: "none" }}>
              Sign up with email and password
            </Typography>
          </RoundButton>
          <RoundButton
            variant="outlined"
            type="submit"
            component={RouterLink}
            to="/sign-in"
            sx={{
              mb: 2.5,
              "&:hover": {
                borderColor: theme.palette.primary.contrastText,
                backgroundColor: "rgba(255, 255, 255, 0.288)",
              },
              borderColor: theme.palette.primary.contrastText,
            }}
          >
            <Typography
              fontSize={20}
              sx={{
                textTransform: "none",
                color: theme.palette.primary.contrastText,
              }}
            >
              Already have an account? Log in
            </Typography>
          </RoundButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UseNowSection;
