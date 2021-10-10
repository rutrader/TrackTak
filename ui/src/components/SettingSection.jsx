import React from "react";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const SettingSection = ({
  children,
  icon,
  heading,
  subHeading,
  detailText,
  sx,
}) => {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
      }}
    >
      {icon}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h7">{heading}</Typography>
        <Typography
          sx={{
            color: (theme) => theme.palette.primary.purple,
          }}
          variant="h6"
        >
          {subHeading}
        </Typography>
        <Typography
          sx={{
            color: (theme) => theme.palette.secondary.grey,
          }}
          variant="h8"
          gutterBottom
        >
          {detailText}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default SettingSection;
