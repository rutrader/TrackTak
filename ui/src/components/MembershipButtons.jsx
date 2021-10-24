import React from "react";
import { Button, Stack } from "@material-ui/core";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import { navigate } from "gatsby-link";

const MembershipButtons = ({ route }) => {
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{ justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
          }}
          startIcon={<PersonIcon />}
        >
          Keep My Benefits
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
          }}
          startIcon={<AcUnitIcon />}
        >
          Freeze Payment Plan
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
          }}
          onClick={() => {
            navigate(route);
          }}
        >
          End My Membership
        </Button>
      </Stack>
    </>
  );
};

export default MembershipButtons;
