import theme from "./theme";
import React from "react";
import { ThemeProvider } from "@material-ui/core";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
