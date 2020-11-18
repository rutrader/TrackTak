import axios from "../../axios/axios";

export const GET_FINANCIALS = "GET_FINANCIALS";

export const financialsAction = (symbol) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/v1/get-financials/${symbol}`);
      dispatch({
        type: GET_FINANCIALS,
        payload: {
          financials: res.data,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
