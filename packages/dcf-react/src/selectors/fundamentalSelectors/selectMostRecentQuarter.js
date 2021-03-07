import selectHighlights from "./selectHighlights";

const selectMostRecentQuarter = (state) =>
  selectHighlights(state)?.mostRecentQuarter;

export default selectMostRecentQuarter;
