const replaceAll = (s, match, value) =>
  s.replace(new RegExp(match, "g"), value);

export default replaceAll;
