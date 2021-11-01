import React from "react";
import { Typography } from "@material-ui/core";
import RegionStatus from "./RegionStatus";
import {
  listAPIregions,
  mediumCapUSPlusPriceId,
  worldwidePriceId,
} from "../data/regions";

const CurrentPlan = ({ currentPlan }) => {
  return (
    <>
      <Typography variant="h8" fontWeight="bold" gutterBottom>
        Enabled Regions
      </Typography>
      {listAPIregions.map((listAPIRegion, i) => {
        const enabled =
          listAPIRegion.priceId === mediumCapUSPlusPriceId ||
          currentPlan?.priceIds.includes(worldwidePriceId) ||
          currentPlan?.priceIds.includes(listAPIRegion.priceId);

        return (
          <RegionStatus
            key={i}
            regionName={listAPIRegion.regionName}
            iconSvg={listAPIRegion.iconSvg}
            enabled={enabled}
          />
        );
      })}
    </>
  );
};

export default CurrentPlan;
