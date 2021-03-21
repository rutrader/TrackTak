import { Button, useTheme } from "@material-ui/core";
import React from "react";

const RoundButton = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        borderRadius: 50,
        padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
        transition: "all .4s ease-in-out",
        ...sx,
      }}
      {...props}
    />
  );
};

export default RoundButton;
