import React from 'react'
import { Typography } from '@material-ui/core'
import RegionStatus from './RegionStatus'
import { regions } from '@tracktak/common'

const CurrentPlan = ({ currentPlan }) => {
  return (
    <>
      <Typography variant='h8' fontWeight='bold' gutterBottom>
        Enabled Regions
      </Typography>
      {regions.listAPIregions.map((listAPIRegion, i) => {
        const enabled =
          listAPIRegion.priceId === regions.PriceIds.MEDIUM_CAP_US_PLUS ||
          currentPlan?.priceIds.includes(regions.PriceIds.WORLDWIDE) ||
          currentPlan?.priceIds.includes(listAPIRegion.priceId)

        return (
          <RegionStatus
            key={i}
            regionName={listAPIRegion.regionName}
            iconSvg={listAPIRegion.iconSvg}
            enabled={enabled}
          />
        )
      })}
    </>
  )
}

export default CurrentPlan
