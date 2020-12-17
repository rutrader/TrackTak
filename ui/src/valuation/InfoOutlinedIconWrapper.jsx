import {
  Box,
  Typography,
  withStyles,
  useTheme,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Popover from "@material-ui/core/Popover";
import { Link } from "react-router-dom";

const PopoverOnHover = withStyles((theme) => ({
  paper: {
    padding: theme.spacing(1.2),
    maxWidth: "500px",
  },
}))(Popover);

export const InfoOutlinedIconWrapper = ({ children, text, hash, ...props }) => {
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
        style={{
          fontSize: theme.typography.htmlFontSize,
          position: "absolute",
        }}
        color="secondary"
        onMouseEnter={handlePopoverOpen}
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
        <Box onMouseLeave={handlePopoverClose}>
          <Typography>{text}</Typography>
          <Button
            component={Link}
            to={`/docs#${hash}`}
            // variant="contained"
            color="primary"
            size="medium"
          >
            Click here
          </Button>
        </Box>
      </PopoverOnHover>
    </Box>
  );
};
