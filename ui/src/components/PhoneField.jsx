import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "./PhoneField.css";

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
    <>
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
    </>
  );
};

export default PhoneField;
