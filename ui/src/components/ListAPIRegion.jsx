import React, { useState } from "react";
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
import { FormControlLabel } from "@mui/material";

const CustomListItemIcon = (props) => (
  <ListItemIcon
    {...props}
    sx={{
      height: "30px",
    }}
  />
);

const ListAPIRegion = ({ iconSvg, regionName, price }) => {
  return (
    <Box>
      <Grid item xs={12}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <CustomListItemIcon>{iconSvg}</CustomListItemIcon>
              <ListItemText primary={regionName} />
              <FormControlLabel
                labelPlacement="start"
                label={price}
                control={<Checkbox edge="end" />}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
};

export default ListAPIRegion;
