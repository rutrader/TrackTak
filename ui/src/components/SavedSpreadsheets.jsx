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
  Typography,
} from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTheme } from "@material-ui/styles";
import ConfirmationDialog from "./ConfirmationDialog";
import { useAuth } from "../hooks/useAuth";
import { deleteSpreadsheet, getSpreadsheets } from "../api/api";
import { isEmpty } from "lodash-es";
import { navigate } from "gatsby";
import RoundButton from "./RoundButton";

const SavedSpreadsheets = ({ onNewValuationClick }) => {
  const theme = useTheme();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { getAccessToken, userData } = useAuth();
  const [valuations, setValuations] = useState([]);
  const [selectedValuation, setSelectedValuation] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const response = await getSpreadsheets(token?.jwtToken);
      setValuations(response.data.valuations);
    }
    fetchData();
  }, [getAccessToken]);

  const handleRowClick = (valuation) => {
    navigate(`/${userData.sub}/my-spreadsheets/${valuation._id}`);
  };

  const handleDelete = (valuation) => {
    setSelectedValuation(valuation);
    setShowConfirmationDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedValuation) {
      const token = await getAccessToken();
      const response = await deleteSpreadsheet(
        selectedValuation._id,
        token?.jwtToken,
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
      {isEmpty(valuations) && (
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2),
          }}
          textAlign={"center"}
        >
          <Typography gutterBottom variant="h6">
            Create your first valuation!
          </Typography>
          <RoundButton
            variant="contained"
            color="primary"
            onClick={onNewValuationClick}
            type="button"
            sx={{
              textTransform: "none",
            }}
          >
            New Valuation
          </RoundButton>
        </Box>
      )}
      {!isEmpty(valuations) && (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(valuation);
                      }}
                      type="button"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default SavedSpreadsheets;
