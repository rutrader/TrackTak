import React from "react";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

const ListRegion = ({
  iconSvg,
  regionName,
  checked,
  handleOnChangeChecked,
  disabled,
  price,
}) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <ListItem>
      <ListItemButton
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          flexWrap: "wrap",
          justifyContent: "left",
        }}
        onClick={handleOnChangeChecked}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              height: "30px",
            }}
          >
            {iconSvg}
          </ListItemIcon>
          <ListItemText primary={regionName} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: isOnMobile ? "right" : "center",
            marginLeft: "16px",
            marginRight: "-11px",
            alignItems: "center",
          }}
        >
          {price}
          <Checkbox
            edge="end"
            checked={checked}
            sx={{ marginRight: "-12px" }}
            inputProps={{ "aria-label": "controlled" }}
            disabled={disabled}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default ListRegion;
