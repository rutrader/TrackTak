import { combineReducers, compose } from "redux";
import { fundamentalsReducer } from "./reducers/fundamentalsReducer";
import { wrapStore } from "redux-in-worker";

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
          ...initialState,
          ...preloadedState,
        },
        enhancer,
      );

      return innerStore;
    };
  };

  const outerStore = wrapStore(
    new Worker("../workers/dcfStore.worker", {
      type: "module",
    }),
    undefined,
    compose(
      enhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (x) => x,
    ),
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
