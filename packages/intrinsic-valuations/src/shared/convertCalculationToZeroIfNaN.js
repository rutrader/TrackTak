const convertCalculationToZeroIfNaN = (calculations) => {
  const newCalculations = {
    ...calculations,
  };

  Object.keys(newCalculations).forEach((property) => {
    const value = newCalculations[property];

    if (value === Infinity || value === -Infinity || isNaN(value)) {
      newCalculations[property] = 0;
    }
  });

  return newCalculations;
};

export default convertCalculationToZeroIfNaN;
