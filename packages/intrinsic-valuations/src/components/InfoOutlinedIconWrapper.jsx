import { Box, Typography, useTheme, Popover, styled } from "@material-ui/core";
import React, { useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const StyledPopover = styled(Popover)(({ theme }) => ({
  pointerEvents: "none",
  "& .MuiPaper-root": {
    padding: theme.spacing(1.2),
    maxWidth: "500px",
  },
}));

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
    <Box {...props} component="span" sx={{ position: "relative" }}>
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

      <StyledPopover
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
        <Typography component="div">{text}</Typography>
      </StyledPopover>
    </Box>
  );
};
