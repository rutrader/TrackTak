import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchTicker from "./SearchTicker";

const SearchTickerDialog = ({
  open,
  onClose,
  onSearchResultClick,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          padding: "25px",
        },
      }}
    >
      <DialogTitle id="form-dialog-title">
        Search for a company to begin.
      </DialogTitle>
      <DialogContent>
        <SearchTicker onSearchResultClick={onSearchResultClick} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchTickerDialog;
