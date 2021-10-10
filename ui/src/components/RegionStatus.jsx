import React from "react";
import { Box } from "@material-ui/system";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@material-ui/core/colors";

const RegionStatus = ({ iconSvg, regionName, enabled }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        width: "100%",
        gap: (theme) => theme.spacing(1),
        mb: (theme) => theme.spacing(1),
      }}
    >
      <Box
        sx={{
          height: "33px",
          width: "33px",
        }}
      >
        {iconSvg}
      </Box>
      {regionName}
      <Box
        sx={{
          marginLeft: "auto",
        }}
      >
        {enabled ? (
          <CheckIcon color="primary" />
        ) : (
          <ClearIcon sx={{ color: red[500] }} />
        )}
      </Box>
    </Box>
  );
};

export default RegionStatus;
