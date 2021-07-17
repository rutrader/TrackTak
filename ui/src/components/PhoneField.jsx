import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Box } from "@material-ui/core";
import "react-phone-input-2/lib/material.css";

const PhoneField = ({
  value,
  defaultCountry = "us",
  onChange,
  includePrefix = true,
  size,
}) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const handleChange = (number) => {
    if (includePrefix) {
      onChange(`+${number}`);
      return;
    }
    onChange(number);
  };

  const handleFocus = () => {
    setIsFocussed(true);
  };

  const handleBlur = () => {
    setIsFocussed(false);
  };

  return (
    <Box sx={{
      ".react-tel-input .form-control": {
        width: '100%',
      },
      ".special-label": {
        color: "rgba(0, 0, 0, 0.54)",
      },
      ".specialLabelFocus": {
        color: theme => theme.palette.primary.main,
      },

      "div.specialLabelFocus > div": {
        color: theme => theme.palette.primary.main,
      },

      ".react-tel-input .form-control:focus": {
        borderColor: theme => theme.palette.primary.main,
        boxShadow: theme => `0 0 0 1px ${theme.palette.primary.main}`,
      },

      ".react-tel-input .selected-flag:focus .arrow": {
        borderTop: theme => `5px solid ${theme.palette.primary.main}`,
      },

      ".react-tel-input .form-control:focus + div:before": {
        color: theme => theme.palette.primary.main,
      },

      ".small": {
        height: "40px",
      },
    }}>
      <PhoneInput
        country={defaultCountry}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        specialLabel="Phone *"
        inputProps={{
          name: "phone",
          required: true,
        }}
        inputClass={size === "small" ? "small" : undefined}
        containerClass={isFocussed ? "specialLabelFocus" : undefined}
      />
    </Box>
  );
};

export default PhoneField;
