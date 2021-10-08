import React from "react";
import { Paper } from "@material-ui/core";
import { Box } from "@material-ui/system";
import ListAPIRegion from "../components/ListAPIRegion";
import { Header } from "./PricingPlan";
import { useLocation } from "@reach/router";
import { apiRegionsHashLink } from "../pages/pricing";

const SelectAPIRegion = ({ checked, setChecked, listAPIRegions }) => {
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
            <Box>
              {listAPIRegions.map((listAPIRegion) => {
                return (
                  <ListAPIRegion
                    key={listAPIRegion.priceId}
                    handleOnChangeChecked={() => {
                      if (!listAPIRegion.disabled) {
                        handleOnChangeChecked(listAPIRegion.priceId);
                      }
                    }}
                    regionName={listAPIRegion.regionName}
                    priceId={listAPIRegion.priceId}
                    iconSvg={listAPIRegion.iconSvg}
                    checked={!!checked.find((x) => x === listAPIRegion.priceId)}
                    disabled={listAPIRegion.disabled}
                  />
                );
              })}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SelectAPIRegion;
