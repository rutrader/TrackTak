import { Box } from "@material-ui/core";
import React from "react";

const Section = ({ sx, ...props }) => <Box sx={{ mt: 4, ...sx }} {...props} />;

export default Section;
