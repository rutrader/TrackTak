import { Box, Typography, withStyles, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Popover from "@material-ui/core/Popover";

const PopoverOnHover = withStyles((theme) => ({
  root: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1.2),
    maxWidth: "500px",
  },
}))(Popover);

export const InfoOutlinedIconWrapper = ({ children, text, ...props }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box {...props}>
      {children}
      <InfoOutlinedIcon
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{
          fontSize: theme.typography.htmlFontSize,
          position: "absolute",
        }}
        color="secondary"
      />
      <PopoverOnHover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{text}</Typography>
      </PopoverOnHover>
    </Box>
  );
};
