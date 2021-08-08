import { Box, ListItem, Paper, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import { Stack } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import RoundButton from "../components/RoundButton";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

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
          color={theme.palette.primary.purple}
          fontWeight="bold"
          variant="h3"
          gutterBottom
        >
          Our Pricing Plan
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
          }}
          variant="h4"
        >
          Choose your plan. Try it free for 7 days.
        </Typography>
        <FormGroup>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Monthly
            </Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography sx={{ fontSize: theme.typography.fontSize2 }}>
              Yearly
            </Typography>
          </Stack>
        </FormGroup>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 500,
            padding: `${theme.spacing(4)}  ${theme.spacing(4)} `,
          },
        }}
      >
        <CustomPaper>
          <Typography
            color={theme.palette.primary.purple}
            fontWeight="bold"
            variant="h4"
            gutterBottom
          >
            Professional Investor
          </Typography>
          <Box>
            Starting from
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.mainTextColor,
                  marginBottom: theme.spacing(2),
                }}
                variant="h4"
                fontWeight="bold"
              >
                $59.99{" "}
                <Box
                  sx={{
                    fontSize: theme.typography.fontSize2,
                    color: "#7B8A98",
                  }}
                >
                  /mo
                </Box>
              </Typography>
            </Box>
            <Grid item xs={12}>
              <List>
                {generate(
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: "33px" }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Single-line item" />
                  </ListItem>,
                )}
              </List>
            </Grid>
            <RoundButton
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Get Started
            </RoundButton>
          </Box>
        </CustomPaper>
        <CustomPaper>
          <Typography
            color={theme.palette.primary.purple}
            fontWeight="bold"
            variant="h4"
            gutterBottom
          >
            Active Investor
          </Typography>
          <Box>
            Starting from
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.mainTextColor,
                  marginBottom: theme.spacing(2),
                }}
                variant="h4"
                fontWeight="bold"
              >
                $34.99
                <Box
                  sx={{
                    fontSize: theme.typography.fontSize2,
                    color: "#7B8A98",
                  }}
                >
                  /mo
                </Box>
              </Typography>
            </Box>
          </Box>
        </CustomPaper>
        <CustomPaper>
          <Typography
            color={theme.palette.primary.purple}
            fontWeight="bold"
            variant="h4"
            gutterBottom
          >
            Non-Active Investor
          </Typography>
          <Box>
            Starting from
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.mainTextColor,
                  marginBottom: theme.spacing(2),
                }}
                variant="h4"
                fontWeight="bold"
              >
                $19.99
                <Box
                  sx={{
                    fontSize: theme.typography.fontSize2,
                    color: "#7B8A98",
                  }}
                >
                  /mo
                </Box>
              </Typography>
            </Box>
          </Box>
        </CustomPaper>
      </Box>
    </>
  );
};

export default Pricing;
