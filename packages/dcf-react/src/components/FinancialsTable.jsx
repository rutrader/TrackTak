import React from "react";
import TTTable from "./TTTable";

const FinancialsTable = ({ sx, ...props }) => {
  return (
    <TTTable
      sx={{
        "& .MuiTableCell-head": {
          whiteSpace: "nowrap",
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default FinancialsTable;
