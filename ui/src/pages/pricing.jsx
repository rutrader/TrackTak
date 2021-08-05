import { Box, Paper, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Stack } from "@material-ui/core";

const CustomPaper = (props) => (
  <Paper
    elevation={6}
    {...props}
    sx={{
      boxShadow: "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
      borderRadius: "10px",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
    }}
  />
);

const Pricing = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>{getTitle("Pricing")}</title>
        <link rel="canonical" href={`${resourceName}/pricing`} />
        <meta name="description" content="Pricing Plan." />
      </Helmet>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          color="primary"
          fontSize={25}
          fontWeight="bold"
          variant="h3"
          gutterBottom
        >
          Our Pricing Plan
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
          }}
          variant="h4"
        >
          Choose your plan. Try it free for 7 days.
        </Typography>
        <FormGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Monthly</Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Yearly</Typography>
          </Stack>
        </FormGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "& > :not(style)": {
            m: 1,
            width: 300,
            height: 300,
          },
        }}
      >
        <CustomPaper />
        <CustomPaper />
        <CustomPaper />
      </Box>
    </>
  );
};

export default Pricing;
