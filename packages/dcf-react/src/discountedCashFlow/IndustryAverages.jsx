import React from "react";
import TTTable from "../components/TTTable";
import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import industryAveragesUSJson from "../data/industryAveragesUS.json";
import industryAveragesGlobalJson from "../data/industryAveragesGlobal.json";
import SubSection from "../components/SubSection";
import getHeader from "../shared/getHeader";
import BoldValueLabel from "../components/BoldValueLabel";
import getTableRowBackgroundOpacity from "../shared/getTableRowBackgroundOpacity";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";

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
  },
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
  const usTableClasses = useUSTableClasses({ isInUS });
  const globalTableClasses = useGlobalTableClasses({
    isInUS,
  });

  const industryAveragesSortComparer = getIndustryAveragesSortComparer(
    currentIndustry.industryName,
  );

  const industryAveragesUS = industryAveragesUSJson.sort(
    industryAveragesSortComparer,
  );
  const industryAveragesGlobal = industryAveragesGlobalJson.sort(
    industryAveragesSortComparer,
  );

  // TODO: Implement sticky first column
  return (
    <React.Fragment>
      <SubSection>
        <Typography variant="h6" gutterBottom>
          Industry Averages
        </Typography>
        <Box>
          <Typography style={{ fontWeight: theme.typography.fontWeightBold }}>
            {currentIndustry.industryName}
          </Typography>
          <BoldValueLabel
            value={isInUS ? "US" : "Global"}
            label="Company Region"
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: isInUS ? "column" : "column-reverse",
          }}
        >
          <Box>
            <Typography variant="h6">United States</Typography>
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
            <Typography variant="h6">Global</Typography>
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
      </SubSection>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(IndustryAverages);
