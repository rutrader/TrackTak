import { combineReducers, compose, applyMiddleware } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { wrapStore } from "redux-in-worker";
import thunk from "redux-thunk";
import cells from "../discountedCashFlow/cells";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";

const createStore = (preloadedState, reducers) => {
  let innerStore;

  const enhancer = (createStore) => {
    return (originalReducer, initialState, enhancer) => {
      const reducer = (state, action) => {
        const dcfState = originalReducer(undefined, action);
        const newState = {
          ...state,
          dcf: {
            ...state.dcf,
            ...dcfState,
          },
        };

        return combineReducers({
          fundamentals: fundamentalsReducer,
          dcf: (state = {}) => state,
          ...reducers,
        })(newState, action);
      };

      innerStore = createStore(
        reducer,
        {
          ...preloadedState,
          ...initialState,
        },
        enhancer,
      );

      innerStore.dispatch = thunk(innerStore)(innerStore.dispatch);

      return innerStore;
    };
  };

  let worker;
  let devTool;

  if (typeof window !== "undefined") {
    worker = new Worker("../workers/dcfStore.worker.js", {
      type: "module",
    });
    devTool = window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (x) => x;
  } else {
    worker = {
      postmessage: () => {},
      onerror: () => {},
      onmessageerror: () => {},
    };
    devTool = (x) => x;
  }

  const outerStore = wrapStore(
    worker,
    {
      dcf: {
        cells,
        isYoyGrowthToggled: false,
        scope: {
          matureMarketEquityRiskPremium,
        },
      },
    },
    compose(enhancer, applyMiddleware(thunk), devTool),
  );

  const dispatch = (action) => {
    outerStore.dispatch(action);
    innerStore.dispatch(action);

    return action;
  };

  const store = {
    ...outerStore,
    dispatch,
  };

  return store;
};

export default createStore;
