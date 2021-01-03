import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useBlockLayout, useTable } from "react-table";
import { FixedSizeList } from "react-window";

const RenderTableRow = ({ prepareRow, row, ...props }) => {
  prepareRow(row);
  return (
    <TableRow {...row.getRowProps(props)}>
      {row.cells.map((cell) => {
        return (
          <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
        );
      })}
    </TableRow>
  );
};

const TTTable = ({
  columns,
  data,
  tableOptions,
  tableHeadProps,
  useVirtualization,
  virtualizationProps,
  ...props
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = useTable(
    {
      columns,
      data,
      ...tableOptions,
    },
    useVirtualization ? useBlockLayout : undefined
  );

  const renderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];

      return <RenderTableRow style={style} row={row} prepareRow={prepareRow} />;
    },
    [prepareRow, rows]
  );

  return (
    <div style={{ overflow: "auto" }}>
      <Table {...getTableProps()} {...props}>
        <TableHead {...tableHeadProps}>
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {useVirtualization ? (
            <FixedSizeList
              itemCount={rows.length}
              width={totalColumnsWidth}
              {...virtualizationProps}
            >
              {renderRow}
            </FixedSizeList>
          ) : (
            rows.map((row) => (
              <RenderTableRow row={row} prepareRow={prepareRow} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TTTable;
