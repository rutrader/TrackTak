import selectHighlights from "./selectHighlights";

const selectMostRecentQuarter = (state) =>
  selectHighlights(state)?.MostRecentQuarter;

export default selectMostRecentQuarter;
