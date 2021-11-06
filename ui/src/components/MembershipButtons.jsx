import React from "react";
import { Button, Stack } from "@material-ui/core";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import { navigate } from "gatsby";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export const StyledButton = (props) => (
  <Button
    variant="contained"
    sx={{
      textTransform: "none",
      flex: "1 0 auto",
    }}
    {...props}
  />
);

const handleEndMyMembershipClick = () => {
  navigate("/cancel-plan");
};

const MembershipButtons = ({
  onEndMyMembershipClick = handleEndMyMembershipClick,
}) => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const handleKeepMyBenefitsClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: isOnMobile ? theme.spacing(7) : theme.spacing(2),
        }}
      >
        <StyledButton
          startIcon={<PersonIcon />}
          onClick={handleKeepMyBenefitsClick}
        >
          Keep My Benefits
        </StyledButton>
        <StyledButton startIcon={<AcUnitIcon />}>
          Freeze Payment Plan
        </StyledButton>
        <StyledButton variant="outlined" onClick={onEndMyMembershipClick}>
          End My Membership
        </StyledButton>
      </Stack>
    </>
  );
};

export default MembershipButtons;
