import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { DCFControlTypography } from "./ExportToExcel";
import SaveIcon from '@material-ui/icons/Save';

const SaveDCF = ({ onClick }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton variant="outlined" onClick={onClick}>
        <SaveIcon />
      </IconButton>
      <DCFControlTypography>Save</DCFControlTypography>
    </Box>
  );
};

export default SaveDCF;
