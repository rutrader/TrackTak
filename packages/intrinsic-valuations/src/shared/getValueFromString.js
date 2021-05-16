const getValueFromString = (value) => {
  const newValue = value ? parseFloat(value) : 0;

  if (isNaN(newValue)) {
    return value;
  }

  return newValue;
};

export default getValueFromString;
