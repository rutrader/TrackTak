import React from 'react'
import {  Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import selectGeneral from '../selectors/fundamentalSelectors/selectGeneral';

const CompanyHeading = () => {
  const general = useSelector(selectGeneral);
  return (
    <React.Fragment>
      <Typography variant="h4">{general.name}</Typography>
      <Typography
        gutterBottom
        color="textSecondary"
        style={{ textTransform: "uppercase" }}
      >
        {general.code}.{general.exchange}
      </Typography>
    </React.Fragment>
  )
}

export default CompanyHeading
