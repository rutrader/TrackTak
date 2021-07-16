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
        gap: "45px",
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
      fontSize: (theme) => theme.typography.fontSize3,
      color: (theme) => theme.palette.primary.mainTextColor,
      fontWeight: "bold",
      marginBottom: (theme) => theme.spacing(2),
    }}
  />
);

const FeatureText = (props) => (
  <Typography
    {...props}
    sx={{
      fontSize: (theme) => theme.typography.fontSize2,
      alignItems: "center",
      flex: "1 1 100px",
      maxWidth: "700px",
    }}
    color="textSecondary"
  />
);

const FunctionText = (props) => {
  return <Typography {...props} component="code" fontWeight="bold" />;
};

const ProcessSection = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("lg"));

  let boxImageStyles;

  if (isOnMobile) {
    boxImageStyles = {
      flexDirection: "column",
    };
  }

  const data = useStaticQuery(graphql`
    query {
      templates: file(relativePath: { eq: "templates.PNG" }) {
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

  const arrayTexts = [
    {
      header: "Templates",
      image: data.templates.childImageSharp.fluid,
      text: (
        <>
          Choose from multiple accredited spreadsheet templates that does all
          the heavy work for you. Theres no need to build your own models,
          simply plug in your inputs and get the models output.
        </>
      ),
    },
    {
      header: "Financial plugin",
      image: data.finPlugin.childImageSharp.fluid,
      text: (
        <>
          No need to keep paying for third-party plugins in Excel. Simply type{" "}
          <FunctionText>=FIN([attribute])</FunctionText> directly into your
          spreadsheet to fill in stock data automatically from 100's of possible
          attributes.
        </>
      ),
    },
    {
      header: "Formulas",
      image: data.formulas.childImageSharp.fluid,
      text: (
        <>
          We match Excel with over 300+ formulas such as{" "}
          <FunctionText>VLOOKUP</FunctionText>, <FunctionText>IF</FunctionText>,{" "}
          <FunctionText>SUM</FunctionText> just to name a few and all of the
          same keyboard shortcuts allowing you to be productive from day one.
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: theme.spacing(7),
          textAlign: "center",
        }}
      >
        <Typography
          color="primary"
          fontSize={25}
          fontWeight="bold"
          gutterBottom
        >
          Our Offering
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.mainTextColor,
            marginBottom: theme.spacing(2),
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
        {arrayTexts.map((arrayText, i) => {
          const isEven = i % 2 === 0;
          return (
            <BoxColumnWrapper>
              <BoxImage
                sx={{
                  flexDirection: isEven ? "row-reverse" : null,
                  ...boxImageStyles,
                }}
              >
                <StyledImage fluid={arrayText.image} />
                <FeatureText>
                  <Box>
                    <FeatureHeader variant="h4">
                      {arrayText.header}
                    </FeatureHeader>
                  </Box>
                  {arrayText.text}
                </FeatureText>
              </BoxImage>
            </BoxColumnWrapper>
          );
        })}
      </Box>
    </>
  );
};

export default ProcessSection;
