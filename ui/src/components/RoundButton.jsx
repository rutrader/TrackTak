import { Button } from "@material-ui/core";
import React from "react";

const RoundButton = ({ ...props }) => {
  return (
    <Button
      sx={{
        borderRadius: 50,
        padding: "17px 44px",
        transition: "all .4s ease-in-out",
      }}
      {...props}
    />
  );
};

export default RoundButton;
