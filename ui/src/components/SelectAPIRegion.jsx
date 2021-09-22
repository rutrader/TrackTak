import React, { useState } from "react";
import RoundButton from "../components/RoundButton";
import { Divider, Paper } from "@material-ui/core";
import { Box, useTheme } from "@material-ui/system";
import USAIconSvg from "../icons/united-states.svg";
import GlobeIconSvg from "../icons/globe.svg";
import ChinaIconSvg from "../icons/china.svg";
import EuropeIconSvg from "../icons/europe.svg";
import UKIconSvg from "../icons/united-kingdom.svg";
import WalletIconSvg from "../icons/wallet.svg";
import ListAPIRegion from "../components/ListAPIRegion";
import { apiRegionsHashLink, Header } from "./PricingPlan";
import { useLocation } from "@reach/router";

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
    Buy now
  </RoundButton>
);

const CustomPaperAPIRegion = (props) => (
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
      flex: "0 1 auto",
    }}
  />
);

const listAPIregions = [
  {
    regionName: "All Worldwide Regions",
    price: "$47.96",
    iconSvg: <GlobeIconSvg alt="globe" />,
  },
  {
    regionName: "United States & Latin America",
    price: "$14.99",
    iconSvg: <USAIconSvg alt="usa" />,
  },
  {
    regionName: "Asia",
    price: "$12.99",
    iconSvg: <ChinaIconSvg alt="china" />,
  },
  {
    regionName: "Europe, Middle East & Africa",
    price: "$9.99",
    iconSvg: <EuropeIconSvg alt="europe" />,
  },
  {
    regionName: "Canada, Australia, UK & Ireland",
    price: "$9.99",
    iconSvg: <UKIconSvg alt="uk" />,
  },
];

const SelectAPIRegion = ({ toggle }) => {
  const theme = useTheme();
  const location = useLocation();
  const [checked, setChecked] = useState([]);

  const handleOnChangeChecked = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box id="Select-API-Regions">
      {location.hash === apiRegionsHashLink && (
        <Box
          sx={{
            mt: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            flexWrap: "wrap",
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
              {listAPIregions.map((listAPIRegion, i) => {
                return (
                  <ListAPIRegion
                    key={i}
                    handleOnChangeChecked={handleOnChangeChecked(i)}
                    regionName={listAPIRegion.regionName}
                    price={
                      toggle
                        ? `${listAPIRegion.price}/y`
                        : `${listAPIRegion.price}/mo`
                    }
                    iconSvg={listAPIRegion.iconSvg}
                    checked={
                      checked.find((x) => x === i) === undefined ? false : true
                    }
                  />
                );
              })}
              <Divider sx={{ mt: 3 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    alt="wallet"
                    component={WalletIconSvg}
                    sx={{ marginRight: "26px", height: "30px" }}
                  />
                  {toggle ? (
                    <Box>Total billed yearly:</Box>
                  ) : (
                    <Box>Total billed monthly:</Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "18px",
                  }}
                >
                  $50.99
                </Box>
              </Box>
            </Box>
            <CustomRoundButton disabled={checked.length === 0} />
          </CustomPaperAPIRegion>
        </Box>
      )}
    </Box>
  );
};

export default SelectAPIRegion;
