import { combineReducers, compose, applyMiddleware } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { wrapStore } from "redux-in-worker";
import dcfInitialState from "../shared/dcfInitialState";

const createStore = (preloadedState, reducers, middlewares = []) => {
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

      innerStore.dispatch = compose(applyMiddleware(...middlewares))(
        innerStore.dispatch,
      );

      return innerStore;
    };
  };

  let worker;
  let devTool = (x) => x;

  if (typeof window !== "undefined") {
    worker = new Worker("../workers/dcfStore.worker.js", {
      type: "module",
    });
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      devTool = window.__REDUX_DEVTOOLS_EXTENSION__();
    }
  } else {
    worker = {
      postMessage: () => {},
      onerror: () => {},
      onmessageerror: () => {},
    };
  }

  const outerStore = wrapStore(
    worker,
    {
      dcf: dcfInitialState,
    },
    compose(enhancer, applyMiddleware(...middlewares), devTool),
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
