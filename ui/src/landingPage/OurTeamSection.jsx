import { Box, Typography, useTheme } from "@material-ui/core";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { BoxColumnWrapper } from "./FeaturesSection";
import styled from "styled-components";

const StyledImage = styled(Img)`
  border-radius: 10px;
`;

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

const OurTeamSection = () => {
  const theme = useTheme();
  const data = useStaticQuery(graphql`
    query {
      memberOne: file(relativePath: { eq: "team-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      memberTwo: file(relativePath: { eq: "purple-background.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  return (
    <>
      <Box id="ourTeam">
        <Box
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "55px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInDown",
            }}
            color="primary"
            fontSize={25}
            fontWeight="bold"
            gutterBottom
          >
            Our Team
          </Typography>
          <Typography
            sx={{
              visibility: "visible",
              animationDelay: "0.4s",
              animationName: "fadeInUp",
              fontWeight: "bold",
              color: theme.palette.primary.mainTextColor,
              marginBottom: (theme) => theme.spacing(2),
            }}
            variant="h3"
          >
            Meet Our Board
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <BoxColumnWrapper>
            <Box
              sx={{
                flex: "1 1 300px",
                maxWidth: 300,
              }}
            >
              <StyledImage
                fluid={data.memberOne.childImageSharp.fluid}
                alt="Member One"
              />
              <TypographyMemberName>Kristina</TypographyMemberName>
              <Typography variant="h6">Co-founder</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Kristina is a founding partner of Tracktak and a value investor.
                Kristina &amp; Martin are jointly responsible for the direction
                of the business. She is invovled in customer relations,
                partnerships, building the application and the company's
                financial health.
              </Typography>
            </Box>
          </BoxColumnWrapper>
          <BoxColumnWrapper>
            <Box
              sx={{
                flex: "1 1 300px",
                maxWidth: 300,
              }}
            >
              <StyledImage
                fluid={data.memberOne.childImageSharp.fluid}
                alt="Member One"
              />
              <TypographyMemberName>Martin</TypographyMemberName>
              <Typography variant="h6">Co-founder</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Martin is a founding partner of Tracktak and a value investor.
                Kristina &amp; Martin are jointly responsible for the direction
                of the business. He is involved in marketing, partnerships,
                building/creating the entire road map application.
              </Typography>
            </Box>
          </BoxColumnWrapper>
          <BoxColumnWrapper>
            <Box
              sx={{
                flex: "1 1 300px",
                maxWidth: 300,
              }}
            >
              <StyledImage
                fluid={data.memberOne.childImageSharp.fluid}
                alt="Member One"
              />
              <TypographyMemberName>Sam</TypographyMemberName>
              <Typography variant="h6">Co-founder</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Sam joined us on April 2021. He is managing the company's
                technological projects and plans. Sam is responsible for
                backend, front-end application and cloud development.
              </Typography>
            </Box>
          </BoxColumnWrapper>
        </Box>
      </Box>
    </>
  );
};

export default OurTeamSection;
