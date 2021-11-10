import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import wikiContent from "../data/wikiContent";
import replaceSpaceWithHyphen from "../shared/replaceSpaceWithHyphen";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import SidePanel from "../components/SidePanel";

const removeNonHashableChars = (str) => {
  const newStr = replaceSpaceWithHyphen(str);

  return newStr.replace(/\?|\(|\)|,|&/g, "");
};

const Docs = () => {
  const getSidePanelTabs = () => {
    return wikiContent.map(({ title }) => {
      return {
        title,
        to: `/how-to-do-a-dcf#${removeNonHashableChars(title)}`,
      };
    });
  };

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
      <SidePanel tabs={getSidePanelTabs()}>
        {wikiContent.map(({ title, text }, i) => {
          return (
            <Box key={i}>
              <Typography
                variant="h6"
                gutterBottom
                id={removeNonHashableChars(title)}
              >
                {title}
              </Typography>
              <Typography component="div" paragraph>
                {text}
              </Typography>
            </Box>
          );
        })}
      </SidePanel>
    </>
  );
};
export default Docs;
