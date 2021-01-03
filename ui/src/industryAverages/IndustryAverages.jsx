import React from "react";
import TTTable from "../components/TTTable";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import industryAveragesUSJson from "../data/industryAveragesUS.json";
import industryAveragesGlobalJson from "../data/industryAveragesGlobal.json";
import SubSection from "../components/SubSection";
import getHeader from "./getHeader";

const useTableClasses = makeStyles((theme) => ({
  root: {
    "& th": {
      marginTop: "auto",
    },
  },
}));

const tableOptions = {
  defaultColumn: {
    minWidth: 200,
  },
};

const virtualizationProps = {
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

const IndustryAverages = () => {
  const tableClasses = useTableClasses();
  const fundamentals = useSelector((state) => state.fundamentals);

  if (!fundamentals.isLoaded) return null;

  // TODO: Implement sticky first column
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {fundamentals.data.General.Name}
      </Typography>
      <Typography variant="h6">Industry Averages (US)</Typography>
      <SubSection>
        <TTTable
          columns={industryAveragesColumns}
          data={industryAveragesUSJson}
          classes={tableClasses}
          tableOptions={tableOptions}
          useVirtualization
          virtualizationProps={virtualizationProps}
        />
      </SubSection>
      <Typography variant="h6">Industry Averages (Global)</Typography>
      <SubSection>
        <TTTable
          columns={industryAveragesColumns}
          data={industryAveragesGlobalJson}
          classes={tableClasses}
          tableOptions={tableOptions}
          useVirtualization
          virtualizationProps={virtualizationProps}
        />
      </SubSection>
    </>
  );
};

export default IndustryAverages;
