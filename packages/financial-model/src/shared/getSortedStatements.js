const dateSortComparer = (a, b) => new Date(b.date) - new Date(a.date)

const getSortedStatements = statement =>
  Object.values(statement).sort(dateSortComparer)

export default getSortedStatements
