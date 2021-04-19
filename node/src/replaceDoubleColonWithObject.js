const assignNestedObject = (obj, keyPath, value) => {
  const lastKeyIndex = keyPath.length - 1;

  for (var i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];

    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
};

const replaceDoubleColonWithObject = (data) => {
  const newData = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const splits = key.split("::");

    assignNestedObject(newData, splits, value);
  });

  return newData;
};

export default replaceDoubleColonWithObject;
