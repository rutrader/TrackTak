import React from "react";
import TTTable from "../components/TTTable";
import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import industryAveragesUSJson from "../data/industryAveragesUS.json";
import industryAveragesGlobalJson from "../data/industryAveragesGlobal.json";
import SubSection from "../components/SubSection";
import getHeader from "./getHeader";
import BoldValueLabel from "../components/BoldValueLabel";
import getTableRowBackgroundOpacity from "../shared/getTableRowBackgroundOpacity";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import useVirtualExchange from "../hooks/useVirtualExchange";

const commonTableRootClasses = {
  "& th": {
    marginTop: "auto",
  },
};

const useUSTableClasses = makeStyles((theme) => ({
  root: {
    ...commonTableRootClasses,
    "& .table_row_0": {
      backgroundColor: ({ isInUS }) =>
        isInUS
          ? getTableRowBackgroundOpacity(theme.palette.primary.light)
          : "initial",
    },
  },
}));

const useGlobalTableClasses = makeStyles((theme) => ({
  root: {
    ...commonTableRootClasses,
    "& .table_row_0": {
      backgroundColor: ({ isInUS }) =>
        isInUS
          ? "initial"
          : getTableRowBackgroundOpacity(theme.palette.primary.light),
    },
  },
}));

const tableOptions = {
  defaultColumn: {
    minWidth: 200,
  },
};

const fixedSizeListProps = {
  height: 500,
  itemSize: 53,
};

const industryAveragesColumns = Object.keys(industryAveragesUSJson[0]).map(
  (key) => {
    const columnObject = {
      Header: getHeader(key),
      accessor: key,
      height: 100,
      maxHeight: 100,
    };

    if (key === "industryName") {
      columnObject.width = 310;
    }

    return columnObject;
  }
);

const getIndustryAveragesSortComparer = (industryName) => (a) => {
  if (a.industryName === industryName) {
    return -1;
  }
  return 0;
};

const IndustryAverages = () => {
  const theme = useTheme();
  const isInUS = useSelector(selectIsInUS);
  const currentIndustry = useSelector(selectCurrentIndustry);
  const general = useSelector(selectGeneral);
  const usTableClasses = useUSTableClasses({ isInUS });
  const globalTableClasses = useGlobalTableClasses({
    isInUS,
  });
  const exchange = useVirtualExchange();

  const industryAveragesSortComparer = getIndustryAveragesSortComparer(
    currentIndustry.industryName
  );

  const industryAveragesUS = industryAveragesUSJson.sort(
    industryAveragesSortComparer
  );
  const industryAveragesGlobal = industryAveragesGlobalJson.sort(
    industryAveragesSortComparer
  );

  // TODO: Implement sticky first column
  return (
    <>
      <Helmet>
        <title>
          {getTitle(`${general.Name} Industry Average Financial Ratios`)}
        </title>
        <link
          rel="canonical"
          href={`${resourceName}/industry-averages/${general.Code}.${exchange}`}
        />
      </Helmet>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">{general.Name}</Typography>
        <Typography
          gutterBottom
          style={{ fontWeight: theme.typography.fontWeightBold }}
        >
          {currentIndustry.industryName}
        </Typography>
        &nbsp;
        <BoldValueLabel
          value={isInUS ? "US" : "Global"}
          label="Company Region"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isInUS ? "column" : "column-reverse",
        }}
      >
        <Box>
          <Typography variant="h6">Industry Averages (US)</Typography>
          <SubSection>
            <TTTable
              columns={industryAveragesColumns}
              data={industryAveragesUS}
              classes={usTableClasses}
              tableOptions={tableOptions}
              useVirtualization
              fixedSizeListProps={fixedSizeListProps}
            />
          </SubSection>
        </Box>
        <Box>
          <Typography variant="h6">Industry Averages (Global)</Typography>
          <SubSection>
            <TTTable
              columns={industryAveragesColumns}
              data={industryAveragesGlobal}
              classes={globalTableClasses}
              tableOptions={tableOptions}
              useVirtualization
              fixedSizeListProps={fixedSizeListProps}
            />
          </SubSection>
        </Box>
      </Box>
    </>
  );
};

export default IndustryAverages;
