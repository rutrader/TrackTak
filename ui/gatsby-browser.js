import reportWebVitals from "./reportWebVitals";

export const onClientEntry = () => {
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

export { wrapPageElement, wrapRootElement } from "./sharedGatsby";

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  if (prevRouterProps?.location.pathname !== routerProps.location.pathname) {
    return true;
  }
  return false;
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location && location.state) {
    location.state.referrer = prevLocation ? prevLocation.pathname : null
  }
}