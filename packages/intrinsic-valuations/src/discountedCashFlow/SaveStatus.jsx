import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { DCFControlTypography } from "./ExportToExcel";
import CachedIcon from '@material-ui/icons/Cached';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

const SaveStatus = ({ isSaving }) => {
  const status = isSaving ? 'Saving...' : 'Saved';
  const Icon = isSaving ? CachedIcon : CloudDoneIcon;
  const iconStyle = {
    marginRight: theme => theme.spacing(0.5),
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon color="action" sx={iconStyle} />
      <DCFControlTypography>{status}</DCFControlTypography>
    </Box>
  );
};

export default SaveStatus;
