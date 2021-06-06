import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { sentenceCase } from "sentence-case";
import { TableMillionFormatter } from "../components/TableFormatters";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import mapFromStatementsToDateObject from "../shared/mapFromStatementsToDateObject";
import React, { useMemo } from "react";

const useGetFinancialStatementRowData = (
  statement,
  yearlyStatements,
  useTTM,
  param,
) => {
  const isInUS = useSelector(selectIsInUS);

  const data = useMemo(() => {
    return param
      .map(
        ({
          valueKey,
          dataField = sentenceCase(valueKey),
          ValueFormatter = TableMillionFormatter,
          className,
        }) => {
          // If empty then render nothing to create an empty row of spaces
          const NewValueFormatter =
            valueKey.length === 0 ? () => null : ValueFormatter;

          const hasAnyValue =
            Object.values(yearlyStatements).some(
              (statement) => statement[valueKey] !== 0,
            ) || statement[valueKey] !== 0;

          if (!hasAnyValue) {
            return null;
          }

          const cell = {
            dataField: <Box className={className}>{dataField}</Box>,
            ...mapFromStatementsToDateObject(
              yearlyStatements,
              valueKey,
              NewValueFormatter,
            ),
          };

          if (isInUS) {
            if (useTTM) {
              cell.ttm = <NewValueFormatter value={statement[valueKey]} />;
            } else {
              cell.latest = <NewValueFormatter value={statement[valueKey]} />;
            }
          }

          return cell;
        },
      )
      .filter((x) => x !== null);
  }, [isInUS, param, statement, useTTM, yearlyStatements]);

  return data;
};

export default useGetFinancialStatementRowData;
