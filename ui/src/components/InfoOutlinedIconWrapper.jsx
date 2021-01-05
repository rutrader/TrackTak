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
    <Box {...props} sx={{ position: "relative", ...props.sx }}>
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
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box onMouseLeave={handlePopoverClose}>
          <Typography gutterBottom>{text}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              component={Link}
              to={`/documentation#${hash}`}
              variant="outlined"
              color="primary"
              size="medium"
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </PopoverOnHover>
    </Box>
  );
};
