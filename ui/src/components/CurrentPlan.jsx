import React from "react";
import { Typography } from "@material-ui/core";
import RegionStatus from "./RegionStatus";
import useCurrentPlan from "../hooks/useCurrentPlan";
import { listAPIregions, mediumCapUSPlusPriceId } from "../data/regions";
import { WORLDWIDE_PRICE_ID } from "../pages/switching-plan";

const CurrentPlan = () => {
  const { currentPlan } = useCurrentPlan();
  return (
    <>
      <Typography variant="h8" fontWeight="bold" gutterBottom>
        Enabled Regions
      </Typography>
      {listAPIregions.map((listAPIRegion, i) => {
        const enabled =
          listAPIRegion.priceId === mediumCapUSPlusPriceId ||
          currentPlan?.priceIds.includes(WORLDWIDE_PRICE_ID) ||
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
