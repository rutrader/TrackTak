import React from "react";
import { List, Paper } from "@material-ui/core";
import { Box } from "@material-ui/system";
import ListAPIRegion from "../components/ListAPIRegion";
import { Header } from "./PricingPlan";
import { useLocation } from "@reach/router";
import { apiRegionsHashLink } from "../pages/pricing";
import USAIconSvg from "../icons/united-states.svg";
import ChinaIconSvg from "../icons/china.svg";
import LatinIconSvg from "../icons/brazil.svg";
import EuropeIconSvg from "../icons/europe.svg";
import UKIconSvg from "../icons/united-kingdom.svg";
import ListRegion from "./ListRegion";

export const listAPIRegions = [
  {
    priceId: "price_1JhdQPDOsUBI2OhCOkxiOM9Q",
    regionName: "China & Asia",
    iconSvg: <ChinaIconSvg alt="china" />,
  },
  {
    priceId: "price_1Ji1WGDOsUBI2OhC1wdJ7FcD",
    regionName: "Latin America, Middle East & Africa",
    iconSvg: <LatinIconSvg alt="latin" />,
  },
  {
    priceId: "price_1JhdQpDOsUBI2OhCztCOuKki",
    regionName: "Europe",
    iconSvg: <EuropeIconSvg alt="europe" />,
  },
  {
    priceId: "price_1JhdRHDOsUBI2OhCVVGyzsZF",
    regionName: "Canada, Australia, UK & Ireland",
    iconSvg: <UKIconSvg alt="uk" />,
  },
];

const SelectAPIRegion = ({ checked, setChecked }) => {
  const location = useLocation();

  const handleOnChangeChecked = (value) => {
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
          }}
        >
          <Paper
            elevation={6}
            sx={{
              boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
              borderRadius: "10px",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              display: "flex",
              flex: "0 1 auto",
              m: 1,
              height: "100%",
              padding: (theme) => `${theme.spacing(4)}  ${theme.spacing(4)} `,
            }}
          >
            <Header>Select API Regions</Header>
            <List>
              <ListRegion
                regionName="United States"
                price="$0.00/month"
                iconSvg={<USAIconSvg alt="usa" />}
                checked={checked}
                disabled={true}
              />
              {listAPIRegions.map((listAPIRegion) => {
                return (
                  <>
                    <ListAPIRegion
                      key={listAPIRegion.priceId}
                      handleOnChangeChecked={() => {
                        handleOnChangeChecked(listAPIRegion.priceId);
                      }}
                      regionName={listAPIRegion.regionName}
                      priceId={listAPIRegion.priceId}
                      iconSvg={listAPIRegion.iconSvg}
                      checked={
                        !!checked.find((x) => x === listAPIRegion.priceId)
                      }
                    />
                  </>
                );
              })}
            </List>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SelectAPIRegion;
