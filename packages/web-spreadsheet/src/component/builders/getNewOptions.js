import { merge } from "lodash-es";

export const getNewOptions = (
  options,
  defaultOptions,
  hyperformula,
  data,
  sheet,
) => {
  const newOptions = merge(defaultOptions, options);

  Object.keys(newOptions.variables).forEach((key) => {
    const value = newOptions.variables[key];

    if (hyperformula.isItPossibleToChangeNamedExpression(key, value)) {
      hyperformula.changeNamedExpression(key, value);
    }

    if (hyperformula.isItPossibleToAddNamedExpression(key, value)) {
      hyperformula.addNamedExpression(key, value);
    }
  });

  if (data) {
    sheet.render();
  }

  return newOptions;
};
