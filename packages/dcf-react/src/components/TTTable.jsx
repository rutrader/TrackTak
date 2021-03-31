import React, { useCallback } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useBlockLayout, useTable } from "react-table";
import { FixedSizeList } from "react-window";

const RenderTableRow = ({ prepareRow, row, index, ...props }) => {
  prepareRow(row);
  return (
    <TableRow {...row.getRowProps(props)} className={`table_row_${index}`}>
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
  fixedSizeListProps,
  sx,
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
    useVirtualization ? useBlockLayout : undefined,
  );

  const renderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      return (
        <RenderTableRow
          index={index}
          style={style}
          row={row}
          prepareRow={prepareRow}
        />
      );
    },
    [prepareRow, rows],
  );

  return (
    <Box
      sx={{
        overflow: "auto",
        "& td:first-of-type": {
          whiteSpace: "nowrap",
        },
        "& .indented-cell": {
          paddingLeft: (theme) => theme.spacing(2),
        },
        "& .bold-cell": {
          fontWeight: "bold",
        },
        "& tbody tr:nth-of-type(odd)": {
          backgroundColor: (theme) => theme.palette.grey["100"],
        },
        ...sx,
      }}
    >
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
              {...fixedSizeListProps}
            >
              {renderRow}
            </FixedSizeList>
          ) : (
            rows.map((row, i) => (
              <RenderTableRow
                key={i}
                index={i}
                row={row}
                prepareRow={prepareRow}
              />
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TTTable;
