const getCaretPositionIndex = (text, format) => {
  return format === "percent" && text.length > 0 && text.includes("%")
    ? text.length - 1
    : text.length;
};

export default getCaretPositionIndex;
