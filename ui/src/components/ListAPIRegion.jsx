import React from "react";
import { formatPrice } from "../shared/utils";
import ListRegion from "./ListRegion";
import useFetchPrice from "../hooks/useFetchPrice";

const ListAPIRegion = ({ priceId, ...props }) => {
  const priceData = useFetchPrice(priceId);

  const formattedPrice = priceData ? (
    <>
      {formatPrice({
        unitAmount: priceData.unit_amount,
        currency: priceData.currency.toUpperCase(),
      })}
      /{priceData?.recurring.interval}
    </>
  ) : null;

  return (
    <ListRegion
      {...props}
      price={formattedPrice}
      iconSvg={props.iconSvg}
      regionName={props.regionName}
      checked={props.checked}
      handleOnChangeChecked={props.handleOnChangeChecked}
      disabled={props.disabled}
    />
  );
};

export default ListAPIRegion;
