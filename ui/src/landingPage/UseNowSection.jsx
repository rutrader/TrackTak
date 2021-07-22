import { Box, Typography, Link, Paper } from "@material-ui/core";
import { Link as RouterLink } from "gatsby";
import React from "react";
import RoundButton from "../components/RoundButton";
import { useTheme } from "@material-ui/styles";

const HeaderText = (props) => (
  <Typography
    {...props}
    sx={{
      whiteSpace: "nowrap",
      fontSize: (theme) => theme.typography.fontSize3,
      color: (theme) => theme.palette.primary.mainTextColor,
      fontWeight: "bold",
      marginBottom: (theme) => theme.spacing(2),
    }}
  />
);

const UseNowSection = () => {
  const theme = useTheme();
  return (
    <Paper
      id="get-started"
      elevation={6}
      sx={{
        boxShadow: "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
        borderRadius: "10px",
        padding: `${theme.spacing(4)}  ${theme.spacing(4)} `,
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <HeaderText variant="h3" gutterBottom>
        Get Started Now
      </HeaderText>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2.5 }}>
        <RoundButton
          variant="contained"
          type="submit"
          component={RouterLink}
          to="/sign-up"
          sx={{ mb: 2.5 }}
        >
          <Typography fontSize={20}>Sign up</Typography>
        </RoundButton>
        <RoundButton
          type="submit"
          component={RouterLink}
          to="/sign-in"
          sx={{
            mb: 2.5,
          }}
        >
          <Typography
            fontSize={20}
            sx={{
              textTransform: "none",
              color: theme.palette.primary.mainTextColor,
            }}
          >
            Already have an account? Log in
          </Typography>
        </RoundButton>
      </Box>
      <Typography
        color="textSecondary"
        variant="h7"
        gutterBottom
        sx={{ maxWidth: "500px" }}
      >
        By proceeding to create your account and use tracktak, you are agreeing
        to our{" "}
        <Link href="/terms-and-conditions">
          <b>terms and conditions</b>
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy">
          <b>privacy policy</b>
        </Link>
        .
      </Typography>
    </Paper>
  );
};

export default UseNowSection;
