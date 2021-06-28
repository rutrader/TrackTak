import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  useTheme,
  ListItemIcon,
} from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";

const SpreadsheetTable = () => {
  const theme = useTheme();

  const createData = (name, lastModifiedTime) => ({
    name,
    lastModifiedTime,
  });

  const rows = [
    createData("Apple", "28/06/21 22:30"),
    createData("Facebook", "26/06/21 15:22"),
    createData("BP", "26/06/21 15:10"),
    createData("AMD", "25/06/21 18:00"),
  ];

  const handleRowClick = () => {
    console.log("Clicked row!");
  };

  const cellHeaderStyle = {
    fontSize: theme.typography.table.header,
    fontWeight: "bold",
  };

  return (
    <TableContainer
      sx={{
        marginTop: "20px",
      }}
    >
      <Table aria-label="spreadsheet table">
        <TableHead>
          <TableRow>
            <TableCell style={cellHeaderStyle}>Name</TableCell>
            <TableCell style={cellHeaderStyle} align="right">
              Last Modified
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.name} hover onClick={handleRowClick}>
              <TableCell component="th" scope="row">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>
                    <GridOnIcon />
                  </ListItemIcon>
                  {row.name}
                </Box>
              </TableCell>
              <TableCell align="right">{row.lastModifiedTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpreadsheetTable;
