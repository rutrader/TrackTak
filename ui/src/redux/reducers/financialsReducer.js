import { GET_FINANCIALS } from "../actions/financialsAction";

export const financialsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FINANCIALS:
      return {
        ...state,
        ...action.payload.financials,
      };
    default: {
      return state;
    }
  }
};
