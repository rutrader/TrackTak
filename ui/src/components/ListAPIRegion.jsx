import React from "react";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

const ListAPIRegion = ({
  iconSvg,
  regionName,
  price,
  checked,
  handleOnChangeChecked,
}) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box>
      <Grid item xs={12}>
        <List>
          <ListItem disablePadding>
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
                />
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
};

export default ListAPIRegion;
