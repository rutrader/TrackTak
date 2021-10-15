import React from "react";
import { Typography } from "@material-ui/core";
import RegionStatus from "./RegionStatus";
import useCurrentPlan from "../hooks/useCurrentPlan";
import { listAPIregions } from "../data/regions";

const CurrentPlan = () => {
  const { currentPlan } = useCurrentPlan();
  return (
    <>
      <Typography variant="h8" fontWeight="bold" gutterBottom>
        Enabled API Regions
      </Typography>
      {listAPIregions
        .filter((region) => region.id !== "all")
        .map((listAPIRegion, i) => {
          const enabled = currentPlan?.addons.includes(listAPIRegion.id);

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
