import React from "react";
import { List, Paper, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import RoundButton from "./RoundButton";
import { listAPIregions } from "../data/regions";
import ListRegion from "../components/ListRegion";

const SelectAPIRegion = ({ checked, disabled, setChecked, handleOnClick }) => {
  const handleOnChangeChecked = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            boxShadow: "0 1px 6px rgb(60 64 67 / 30%)",
            borderRadius: "10px",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            display: "flex",
            flex: "0 1 auto",
            m: 1,
            height: "100%",
            padding: (theme) => `${theme.spacing(4)} ${theme.spacing(4)}`,
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.purple,
              fontWeight: "bold",
              fontSize: "1.6rem",
            }}
            gutterBottom
          >
            Select API Regions
          </Typography>
          <List>
            {listAPIregions.map((listAPIRegion) => {
              const priceIdPredicate = (x) => x === listAPIRegion.priceId;

              return (
                <ListRegion
                  key={listAPIRegion.priceId}
                  handleOnChangeChecked={() => {
                    handleOnChangeChecked(listAPIRegion.priceId);
                  }}
                  regionName={listAPIRegion.regionName}
                  priceId={listAPIRegion.priceId}
                  iconSvg={listAPIRegion.iconSvg}
                  disabled={!!disabled.find(priceIdPredicate)}
                  checked={!!checked.find(priceIdPredicate)}
                />
              );
            })}
          </List>
          <RoundButton
            disabled={checked.length === 1 || disabled.length === 6}
            onClick={() => {
              handleOnClick();
            }}
            variant="contained"
            sx={{
              lineHeight: 1,
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            Buy Now
          </RoundButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default SelectAPIRegion;
