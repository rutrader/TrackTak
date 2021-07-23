import { Button, useTheme } from "@material-ui/core";
import React from "react";

const RoundButton = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        borderRadius: 50,
        p: `${theme.spacing(2)} ${theme.spacing(5)}`,
        ...sx,
      }}
      {...props}
    />
  );
};

export default RoundButton;
