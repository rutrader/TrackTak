import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTheme } from "@material-ui/styles";
import ConfirmationDialog from './ConfirmationDialog';

const SavedSpreadsheets = () => {
  const theme = useTheme();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const createData = (id, name, lastModifiedTime) => ({
    id,
    name,
    lastModifiedTime,
  });

  const rows = [
    createData(0, "Apple", "28/06/21 22:30"),
    createData(1, "Facebook", "26/06/21 15:22"),
    createData(2, "BP", "26/06/21 15:10"),
    createData(3, "AMD", "25/06/21 18:00"),
  ];

  const handleRowClick = () => {
    console.log("Clicked row!");
  };

  const handleDelete = () => {
    setShowConfirmationDialog(true);
  }

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  }

  const cellHeaderStyle = {
    fontSize: theme.typography.table.header,
    fontWeight: "bold",
  };

  return (
    <>
    <ConfirmationDialog open={showConfirmationDialog} onClose={handleConfirmationDialogClose}>
      Are you sure you want to delete this valuation?
    </ConfirmationDialog>
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
            <TableCell style={cellHeaderStyle} align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id} hover onClick={handleRowClick}>
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
              <TableCell align="right">
                <IconButton
                  sx={{
                    borderRadius: '2px',
                    color: theme.palette.alert,
                  }}
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default SavedSpreadsheets;
