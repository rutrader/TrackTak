import React from "react";
import { Button, useTheme } from "@material-ui/core";

const SocialMediaButton = ({ sx, text, ...props }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 50,
        textTransform: "none",
        padding: `${theme.spacing(1.5)} ${theme.spacing(5)}`,
        width: 150,
        ...sx,
      }}
      type="button"
      {...props}
    >
      {text}
    </Button>
  );
};

export default SocialMediaButton;
