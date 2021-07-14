import { Box, Typography } from "@material-ui/core";
import React from "react";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";

const StyledImage = ({ sx, ...props }) => {
  return (
    <Box
      component={Img}
      sx={{
        borderRadius: "10px",
        width: "100%",
        flex: "1 1 100%",
      }}
      {...props}
    />
  );
};

export const BoxColumnWrapper = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flex: "1 1 100%",
        width: "100%",
        textAlign: "center",
        ...sx,
      }}
      {...props}
    />
  );
};

const BoxIcon = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
        visibility: "visible",
        animationDuration: "1.3s",
        animationDelay: "0.8s",
        animationName: "fadeInUp",
        ...sx,
      }}
      {...props}
    />
  );
};

const FeatureHeader = (props) => (
  <Typography
    {...props}
    sx={{
      whiteSpace: "nowrap",
      visibility: "visible",
      animationDelay: "0.4s",
      animationName: "fadeInUp",
      fontSize: "25px",
      color: "#313450",
      fontWeight: "bold",
      marginBottom: (theme) => theme.spacing(2),
    }}
  />
);

const FeatureText = (props) => (
  <Typography
    {...props}
    sx={{
      fontSize: "18px",
      visibility: "visible",
      animationDelay: "0.6s",
      animationName: "fadeInUp",
    }}
    color="textSecondary"
  />
);

function ProcessSection() {
  const data = useStaticQuery(graphql`
    query {
      templates: file(relativePath: { eq: "templates.PNG" }) {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      finPlugin: file(relativePath: { eq: "fin-plugin.png" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      formulas: file(relativePath: { eq: "formulas.png" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Box>
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
          We Offering
        </Typography>
        <Typography
          sx={{
            visibility: "visible",
            animationDelay: "0.4s",
            animationName: "fadeInUp",
            fontWeight: "bold",
            color: "#313450",
            marginBottom: (theme) => theme.spacing(2),
          }}
          variant="h3"
        >
          Spreadsheet Solution
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Finding a companies true value just got a whole lot easier with our
          free intrinsic value calculator.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 6.2,
        }}
      >
        <BoxColumnWrapper>
          <BoxIcon>
            <FeatureHeader variant="h4">Templates</FeatureHeader>
            <Box sx={{ display: "flex" }}>
              <StyledImage fluid={data.templates.childImageSharp.fluid} />
              <FeatureText>
                Based on Aswath Damodaran's models showing you each formula.
              </FeatureText>
            </Box>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <FeatureHeader variant="h4">Financial plugin</FeatureHeader>
            <Box sx={{ display: "flex" }}>
              <StyledImage fluid={data.finPlugin.childImageSharp.fluid} />
              <FeatureText>
                Calculates your DCF inputs based on historical and current data.
              </FeatureText>
            </Box>
          </BoxIcon>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxIcon>
            <FeatureHeader variant="h4">Formulas</FeatureHeader>
            <Box sx={{ display: "flex" }}>
              <StyledImage fluid={data.formulas.childImageSharp.fluid} />
              <FeatureText>
                Immediately shows you the different estimated price of various
                inputs.
              </FeatureText>
            </Box>
          </BoxIcon>
        </BoxColumnWrapper>
      </Box>
    </Box>
  );
}

export default ProcessSection;
