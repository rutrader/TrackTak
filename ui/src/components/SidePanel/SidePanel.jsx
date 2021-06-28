import React, { useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  ListItemIcon,
} from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import * as styles from "./sidepanel.module.css";

const SidePanel = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerOpenWidth = 240;
  const drawerClosedWidth = 60;
  const tabs = ["Valuations"];

  useEffect(() => {
    setOpen(!isOnMobile);
  }, [isOnMobile]);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        docked: open ? styles.drawerOpen : styles.drawerClosed,
      }}
      PaperProps={{
        sx: {
          width: open ? `${drawerOpenWidth}px` : `${drawerClosedWidth}px`,
          overflowX: "none !important",
          zIndex: "0 !important",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(0, 1),
          // necessary for content to be below app bar
          ...theme.mixins.toolbar,
          justifyContent: "flex-end",
        }}
      ></Box>
      <List>
        {tabs.map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidePanel;
