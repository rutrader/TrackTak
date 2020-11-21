import React, { useState } from "react";
import Datasheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import styles from "./DCFSheet.module.scss";

const DCFSheet = () => {
  let headerNumberColumns = [];

  for (let index = 1; index < 11; index++) {
    headerNumberColumns.push({
      readOnly: true,
      value: index,
    });
  }

  const initialData = [
    [
      { readOnly: true, value: "" },
      { readOnly: true, value: "Base Year" },
      ...headerNumberColumns,
      {
        readOnly: true,
        value: "Terminal Year",
      },
    ],
    [
      {
        readOnly: true,
        value: "Revenue Growth Rate",
      },
    ],
    [
      {
        readOnly: true,
        value: "Revenues",
      },
    ],
    [
      {
        readOnly: true,
        value: "EBIT (Operating) Margin",
      },
    ],
    [
      {
        readOnly: true,
        value: "EBIT (Operating) Income",
      },
    ],
    [
      {
        readOnly: true,
        value: "Tax Rate",
      },
    ],
    [
      {
        readOnly: true,
        value: "EBIT (1-t)",
      },
    ],
    [
      {
        readOnly: true,
        value: "- Reinvestment",
      },
    ],
    [
      {
        readOnly: true,
        value: "FCFF",
      },
    ],
    [
      {
        readOnly: true,
        value: "NOL",
      },
    ],
    [
      {
        readOnly: true,
        value: "Cost of Capital",
      },
    ],
    [
      {
        readOnly: true,
        value: "Cumulated Discount Factor",
      },
    ],
    [
      {
        readOnly: true,
        value: "PV (FCFF)",
      },
    ],
    [
      {
        readOnly: true,
        value: "Sales to Capital Ratio",
      },
    ],
    [
      {
        readOnly: true,
        value: "Invested Capital",
      },
    ],
    [
      {
        readOnly: true,
        value: "ROIC",
      },
    ],
  ];
  const [data, setData] = useState(initialData);

  return (
    <Datasheet
      className={styles.datasheet}
      data={data}
      valueRenderer={(cell) => cell.value}
      onCellsChanged={(changes) => {
        const newData = [...data];

        changes.forEach(({ row, col, value }) => {
          newData[row][col] = { ...newData[row][col], value };
        });

        setData(newData);
      }}
      onContextMenu={(e, cell) => {
        if (cell.readOnly) {
          e.preventDefault();
        }
      }}
    />
  );
};

export default DCFSheet;
