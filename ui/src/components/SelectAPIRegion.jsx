import React from "react";
import RoundButton from "../components/RoundButton";
import PaymentIcon from "@mui/icons-material/Payment";
import { Divider, Paper, ListItemButton } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import USAIconSvg from "../icons/united-states.svg";
import GlobeIconSvg from "../icons/globe.svg";
import ChinaIconSvg from "../icons/china.svg";
import EuropeIconSvg from "../icons/europe.svg";
import UKIconSvg from "../icons/united-kingdom.svg";
import ListAPIRegion from "../components/ListAPIRegion";
import { Header } from "./PricingPlan";

const CustomRoundButton = (props) => (
  <RoundButton
    {...props}
    variant="contained"
    sx={{
      lineHeight: 1,
      fontWeight: "bold",
      marginTop: "15px",
    }}
  >
    Start Trial
  </RoundButton>
);

const CustomPaperAPIRegion = (props) => (
  <Paper
    elevation={6}
    {...props}
    sx={{
      boxShadow: "0 1px 10px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 20%)",
      borderRadius: "10px",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      display: "flex",
      flex: "0 1 auto",
    }}
  />
);

const SelectAPIRegion = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
        "& > :not(style)": {
          m: 1,
          height: "100%",
          padding: `${theme.spacing(4)}  ${theme.spacing(4)} `,
        },
      }}
    >
      <CustomPaperAPIRegion>
        <Header>Select API Regions</Header>
        <Box>
          <ListAPIRegion
            regionName="All Worldwide Regions"
            price="$12.99"
            iconSvg={<GlobeIconSvg alt="globe" />}
          />
          <ListAPIRegion
            regionName="United States &amp; Latin America"
            price="$12.99"
            iconSvg={<USAIconSvg alt="usa" />}
          />
          <ListAPIRegion
            regionName="Asia"
            price="$12.99"
            iconSvg={<ChinaIconSvg alt="china" />}
          />
          <ListAPIRegion
            regionName="Europe, Middle East &amp; Africa"
            price="$12.99"
            iconSvg={<EuropeIconSvg alt="europe" />}
          />
          <ListAPIRegion
            regionName="Canada, Australia, UK &amp; Ireland"
            price="$12.99"
            iconSvg={<UKIconSvg alt="uk" />}
          />
          <Divider sx={{ mt: 3 }} />
          <ListItemButton component={Box} sx={{ transform: "none" }}>
            <PaymentIcon alt="payment" />
            <Box> Total billed monthly/yearly:</Box>
            <Box>$50.99</Box>
          </ListItemButton>
        </Box>
        <CustomRoundButton />
      </CustomPaperAPIRegion>
    </Box>
  );
};

export default SelectAPIRegion;
