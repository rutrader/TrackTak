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
import { FormControlLabel } from "@mui/material";
import { Box } from "@material-ui/system";

const CustomListItemIcon = (props) => (
  <ListItemIcon
    {...props}
    sx={{
      height: "30px",
    }}
  />
);

const ListAPIRegion = ({
  iconSvg,
  regionName,
  exchanges,
  price,
  checked,
  handleOnChangeChecked,
}) => {
  return (
    <Box>
      <Grid item xs={12}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ paddingTop: 0, paddingBottom: 0 }}
              onClick={handleOnChangeChecked}
            >
              <CustomListItemIcon>{iconSvg}</CustomListItemIcon>
              <ListItemText primary={regionName} secondary={exchanges} />
              <FormControlLabel
                labelPlacement="start"
                label={price}
                control={<Checkbox edge="end" checked={checked} />}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
};

export default ListAPIRegion;
