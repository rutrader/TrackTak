import dateSortComparer from "./dateSortComparer";

const getSortedStatements = (statement) =>
  Object.values(statement).sort(dateSortComparer);

export default getSortedStatements;
