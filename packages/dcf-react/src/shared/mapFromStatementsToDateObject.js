import React from "react";

const mapFromStatementsToDateObject = (
  objectToLoop,
  valueKey,
  ValueFormatter,
) => {
  const dateObject = {};

  Object.keys(objectToLoop).forEach((key) => {
    const value = objectToLoop[key];

    dateObject[key] = <ValueFormatter value={value[valueKey]} />;
  });

  return dateObject;
};

export default mapFromStatementsToDateObject;
