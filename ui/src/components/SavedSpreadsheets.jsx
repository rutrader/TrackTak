import React, { useEffect, useState } from "react";
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
import ConfirmationDialog from "./ConfirmationDialog";
import { useAuth } from "../hooks/useAuth";
import { deleteValuation, getValuations } from "../api/api";

const SavedSpreadsheets = () => {
  const theme = useTheme();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { session } = useAuth();
  const [valuations, setValuations] = useState([]);
  const [selectedValuation, setSelectedValuation] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getValuations(session?.getAccessToken()?.jwtToken);
      setValuations(response.data.valuations);
    }
    fetchData();
  }, [session]);

  const handleRowClick = (valuation) => {
    console.log("Clicked row!", valuation);
  };

  const handleDelete = (valuation) => {
    setSelectedValuation(valuation);
    setShowConfirmationDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedValuation) {
      const response = await deleteValuation(
        selectedValuation._id,
        session?.getAccessToken()?.jwtToken,
      );
      if (response.status === 200) {
        const updatedValuations = valuations.filter(
          (valuation) => valuation._id !== selectedValuation._id,
        );
        setValuations(updatedValuations);
      }
    }
  };

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  const cellHeaderStyle = {
    fontSize: theme.typography.table.header,
    fontWeight: "bold",
  };

  return (
    <>
      <ConfirmationDialog
        open={showConfirmationDialog}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleDeleteConfirm}
      >
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
            {valuations?.map((valuation) => (
              <TableRow
                key={valuation._id}
                hover
                onClick={() => handleRowClick(valuation)}
              >
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
                    {valuation.sheetData.name}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {valuation.lastModifiedTime}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    sx={{
                      borderRadius: "2px",
                      color: theme.palette.alert,
                    }}
                    onClick={() => handleDelete(valuation)}
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
