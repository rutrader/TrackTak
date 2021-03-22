import React from "react";
import { alpha, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: ({ $isSmallInput }) => {
    const styles = {};

    if ($isSmallInput) {
      styles["& .MuiInputBase-root"] = {
        height: "40px",
      };
    }
    return {
      ...styles,
      transition: theme.transitions.create("width"),
      "& input": {
        height: "inherit",
        boxSizing: "border-box",
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    };
  },
  inputBaseRoot: ({ $color }) => {
    const isSecondary = $color === "secondary";

    const styles = {};

    if (isSecondary) {
      styles.color = "#fff";
      styles.backgroundColor = "#9B5FEC";
    }
    const opacity = 0.23;

    return {
      borderRadius: "33px",
      color: "#000",
      height: "62px",
      transition: "all 0.3s ease-out 0s",
      backgroundColor: "#fff",
      "&.Mui-focused fieldset": {
        opacity,
      },
      "&:hover fieldset": {
        opacity,
      },
      ...styles,
    };
  },
}));

const TTRoundInput = ({
  isSmallInput,
  InputProps,
  classes,
  color,
  ...props
}) => {
  const inputClasses = useStyles({
    $isSmallInput: isSmallInput,
    $color: color,
  });

  return (
    <TextField
      classes={{
        root: inputClasses.root,
        ...classes,
      }}
      InputProps={{
        classes: {
          root: inputClasses.inputBaseRoot,
        },
        disableUnderline: true,
        ...InputProps,
      }}
      {...props}
    />
  );
};

export default TTRoundInput;
