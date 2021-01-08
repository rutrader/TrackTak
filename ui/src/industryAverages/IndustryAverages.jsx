import React from "react";
import TTTable from "../components/TTTable";
import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import industryAveragesUSJson from "../data/industryAveragesUS.json";
import industryAveragesGlobalJson from "../data/industryAveragesGlobal.json";
import SubSection from "../components/SubSection";
import getHeader from "./getHeader";
import BoldValueLabel from "../components/BoldValueLabel";

const commonTableRootClasses = {
  "& th": {
    marginTop: "auto",
  },
};

const getTableRowBackgroundOpacity = (color) => {
  return `${color}60`;
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
  const fundamentalsIsLoaded = useSelector(
    (state) => state.fundamentals.isLoaded
  );
  const isInUS = useSelector((state) => state.fundamentals.isInUS);
  const currentIndustry = useSelector(
    (state) => state.fundamentals.currentIndustry
  );
  const companyName = useSelector(
    (state) => state.fundamentals.data?.General.Name
  );

  const usTableClasses = useUSTableClasses({ isInUS });
  const globalTableClasses = useGlobalTableClasses({
    isInUS,
  });

  if (!fundamentalsIsLoaded) return null;

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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">{companyName}</Typography>
        <Typography
          gutterBottom
          style={{ fontWeight: theme.typography.fontWeightBold }}
        >
          {currentIndustry.industryName}
        </Typography>{" "}
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
