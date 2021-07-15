import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import Img from "gatsby-image";
import { graphql, useStaticQuery } from "gatsby";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
        display: "flex",
        gap: "20px",
        alignItems: "center",
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
      alignItems: "center",
      ml: 2,
      maxWidth: "700px",
    }}
    color="textSecondary"
  />
);

const ProcessSection = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("lg"));

  let flexDirectionStyles;

  if (isOnMobile) {
    flexDirectionStyles = {
      flexDirection: "column",
    };
  }

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
          gap: 6.2,
        }}
      >
        <BoxColumnWrapper>
          <BoxImage
            sx={{
              flexDirection: "row-reverse",
              ...flexDirectionStyles,
            }}
          >
            <StyledImage fluid={data.templates.childImageSharp.fluid} />
            <FeatureText>
              <Box>
                <FeatureHeader variant="h4">Templates</FeatureHeader>
              </Box>
              Choose from multiple templates that does all the heavy work for
              you and stores directly in the cloud.
            </FeatureText>
          </BoxImage>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxImage
            sx={{
              ...flexDirectionStyles,
            }}
          >
            <StyledImage fluid={data.finPlugin.childImageSharp.fluid} />
            <FeatureText>
              <Box>
                <FeatureHeader variant="h4">Financial plugin</FeatureHeader>
              </Box>
              No more third-party API intergrations! Simply type `=𝗙𝗜𝗡()`
              directly into your spreadsheet.
            </FeatureText>
          </BoxImage>
        </BoxColumnWrapper>
        <BoxColumnWrapper>
          <BoxImage
            sx={{
              flexDirection: "row-reverse",
              ...flexDirectionStyles,
            }}
          >
            <StyledImage fluid={data.formulas.childImageSharp.fluid} />
            <FeatureText>
              <Box>
                <FeatureHeader variant="h4">Formulas</FeatureHeader>
              </Box>
              Enables you to be more productive from day one with over 400+
              formulas matching Excel.
            </FeatureText>
          </BoxImage>
        </BoxColumnWrapper>
      </Box>
    </Box>
  );
};

export default ProcessSection;
