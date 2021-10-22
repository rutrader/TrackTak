import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../shared/utils";
import { getPrice } from "../api/api";
import ListRegion from "./ListRegion";

const ListAPIRegion = ({ priceId, ...props }) => {
  const { getAccessToken } = useAuth();
  const [price, setPrice] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      const {
        data: { price },
      } = await getPrice(priceId, token?.jwtToken);

      setPrice(price);
    };

    fetchData();
  }, [getAccessToken, priceId]);

  const formattedPrice = price ? (
    <>
      {formatPrice({
        unitAmount: price.unit_amount,
        currency: price.currency.toUpperCase(),
      })}
      /{price?.recurring.interval}
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
