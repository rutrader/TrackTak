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
        boxShadow: "4px 4px 10px #ccc",
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
        ...sx,
      }}
      {...props}
    />
  );
};

const BoxImage = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
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
      alignSelf: "center",
      ml: 2,
    }}
    color="textSecondary"
  />
);

function ProcessSection() {
  const data = useStaticQuery(graphql`
    query {
      templates: file(relativePath: { eq: "templates.png" }) {
        childImageSharp {
          fluid(maxWidth: 900, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
      finPlugin: file(relativePath: { eq: "fin-plugin.png" }) {
        childImageSharp {
          fluid(maxWidth: 900, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
      formulas: file(relativePath: { eq: "formulas.png" }) {
        childImageSharp {
          fluid(maxWidth: 900, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
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
          Our Offering
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
          Specifically for financial modelling with no learning curve.
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
          <BoxImage>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <FeatureText>
                <Box>
                  <FeatureHeader variant="h4">Templates</FeatureHeader>
                </Box>
                Choose from multiple templates that does all the heavy work for
                you and stores directly in the cloud.
              </FeatureText>
              <StyledImage fluid={data.templates.childImageSharp.fluid} />
            </Box>
          </BoxImage>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxImage>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <StyledImage fluid={data.finPlugin.childImageSharp.fluid} />
              <FeatureText>
                <Box>
                  <FeatureHeader variant="h4">Financial plugin</FeatureHeader>
                </Box>
                No more third-party API intergrations! Simply type `=𝗙𝗜𝗡()`
                directly into your spreadsheet.
              </FeatureText>
            </Box>
          </BoxImage>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxImage>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <FeatureText>
                <Box>
                  <FeatureHeader variant="h4">Formulas</FeatureHeader>
                </Box>
                Enables you to be more productive from day one with over 400+
                formulas matching Excel.
              </FeatureText>
              <StyledImage fluid={data.formulas.childImageSharp.fluid} />
            </Box>
          </BoxImage>
        </BoxColumnWrapper>
      </Box>
    </Box>
  );
}

export default ProcessSection;
