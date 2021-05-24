import React from "react";
import { BoxColumnWrapper } from "../landingPage/FeaturesSection";
import Img from "gatsby-image";
import { Box, Typography } from "@material-ui/core";

const StyledImage = ({ sx, ...props }) => {
  return (
    <Box
      component={Img}
      sx={{
        borderRadius: "10px",
      }}
      {...props}
    />
  );
};

const BoxInfoWrapper = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        flex: "1 1 300px",
        maxWidth: 300,
      }}
      {...props}
    />
  );
};

const TypographyMemberName = ({ sx, ...props }) => {
  return (
    <Typography
      sx={{
        visibility: "visible",
        animationDelay: "0.4s",
        animationName: "fadeInUp",
        fontWeight: "bold",
        color: (theme) => theme.palette.primary.mainTextColor,
        marginTop: (theme) => theme.spacing(2),
      }}
      variant="h4"
      {...props}
    />
  );
};

const TeamMember = ({ memberInfo, memberTitle, memberName, fluid }) => {
  return (
    <BoxColumnWrapper>
      <BoxInfoWrapper>
        <StyledImage fluid={fluid} />
        <TypographyMemberName>{memberName}</TypographyMemberName>
        <Typography variant="h6">{memberTitle}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {memberInfo}
        </Typography>
      </BoxInfoWrapper>
    </BoxColumnWrapper>
  );
};

export default TeamMember;
