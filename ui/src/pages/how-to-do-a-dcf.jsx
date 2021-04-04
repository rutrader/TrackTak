import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { Box, Hidden, ListItemText, useMediaQuery } from "@material-ui/core";
import wikiContent from "../data/wikiContent";
import { replaceSpaceWithHyphen } from "@tracktak/dcf-react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { navigate } from "gatsby";

const drawerWidth = 240;

const removeNonHashableChars = (str) => {
  const newStr = replaceSpaceWithHyphen(str);

  return newStr.replace(/\?|\(|\)|,|&/g, "");
};

const Docs = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const top = theme.mixins.toolbar.minHeight - 2;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>{getTitle("How to do a Discounted Cash Flow (DCF)")}</title>
        <link rel="canonical" href={`${resourceName}/how-to-do-a-dcf`} />
        <meta
          name="description"
          content="Learn how to do a full DCF with projections of cash flows, terminal value and WACC."
        />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          "& .MuiDrawer-root": {
            [theme.breakpoints.down(1550)]: {
              width: open ? drawerWidth : "initial",
            },
          },
        }}
      >
        <Drawer
          variant={isOnMobile ? "persistent" : "permanent"}
          anchor="left"
          open={open}
          PaperProps={{
            style: {
              top,
              width: drawerWidth,
              height: `calc(100% - ${top}px)`,
            },
          }}
        >
          <>
            <Hidden smUp implementation="css">
              <Box>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
              <Divider />
            </Hidden>
            <List>
              {wikiContent.map(({ title }) => {
                const to = `/how-to-do-a-dcf#${removeNonHashableChars(title)}`;

                return (
                  <ListItem
                    key={title}
                    component={AnchorLink}
                    onAnchorLinkClick={() => {
                      navigate(to);
                    }}
                    to={to}
                    button
                  >
                    <ListItemText primary={title} />
                  </ListItem>
                );
              })}
            </List>
          </>
        </Drawer>
        <Hidden smUp implementation="css">
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              position: "fixed",
              padding: 0,
              left: 0,
              top: (theme) => theme.mixins.toolbar.minHeight + 10,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Hidden>
        <Box component="main">
          {wikiContent.map(({ title, text, cellsText = "" }, i) => {
            return (
              <Box key={i}>
                <Typography
                  variant="h6"
                  gutterBottom
                  id={removeNonHashableChars(title)}
                >
                  {cellsText ? title.concat(` - Cells: ${cellsText}`) : title}
                </Typography>
                <Typography paragraph>{text}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
export default Docs;
