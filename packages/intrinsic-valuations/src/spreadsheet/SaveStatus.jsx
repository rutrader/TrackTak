import { Box, Typography } from "@material-ui/core";
import React from "react";
import CachedIcon from "@material-ui/icons/Cached";
import CloudDoneIcon from "@material-ui/icons/CloudDone";

const SaveStatus = ({ isSaving }) => {
  const status = isSaving ? "Saving..." : "Saved";
  const Icon = isSaving ? CachedIcon : CloudDoneIcon;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon
        fontSize="small"
        color="action"
        sx={{
          mr: (theme) => theme.spacing(0.5),
        }}
      />
      <Typography
        variant="body2"
        whiteSpace="nowrap"
        fontSize="small"
        sx={{
          cursor: "default",
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};

export default SaveStatus;
