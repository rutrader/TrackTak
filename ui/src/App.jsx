// import { Switch, Route, useLocation } from "react-router-dom";
// import Home from "./home/Home";
// import { useSelector } from "react-redux";
// import { Box, CircularProgress, useTheme } from "@material-ui/core";
// import LayoutFullScreen from "./layouts/LayoutFullScreen";
// import Layout from "./layouts/Layout";
// import LayoutHome from "./layouts/LayoutHome";
// import SyntheticRating from "./syntheticRating/SyntheticRating";
// import { lazy, Suspense, useLayoutEffect } from "react";
// import Valuations from "./valuation/Valuations";
// import IndustryAverages from "./industryAverages/IndustryAverages";
// import Docs from "./documentation/Docs";
// import selectPageIsLoading from "./selectors/pageSelectors/selectPageIsLoading";
// import ContactUs from "./contactUs/ContactUs";
// import AboutUs from "./aboutUs/AboutUs";

// const DiscountedCashFlow = lazy(() =>
//   import("./discountedCashFlow/DiscountedCashFlow"),
// );
// const Valuation = lazy(() => import("./valuation/Valuation"));

// const Spinner = () => {
//   const isLoading = useSelector(selectPageIsLoading);
//   const theme = useTheme();

//   return isLoading ? (
//     <Box
//       sx={{
//         position: "fixed",
//         backgroundColor: theme.palette.common.white,
//         zIndex: theme.zIndex.modal,
//         left: 0,
//         right: 0,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//         width: "100%",
//         top: 0,
//         opacity: 0.6,
//       }}
//     >
//       <CircularProgress />
//     </Box>
//   ) : null;
// };

// export const layoutFullScreenPaths = [
//   { url: "/discounted-cash-flow/:ticker", component: <DiscountedCashFlow /> },
//   { url: "/synthetic-credit-rating/:ticker", component: <SyntheticRating /> },
//   { url: "/industry-averages/:ticker", component: <IndustryAverages /> },
// ];

// const layoutPaths = [
//   { url: "/stock-valuations/:ticker", component: <Valuation /> },
//   { url: "/stock-valuations", component: <Valuations /> },
//   { url: "/how-to-do-a-dcf", component: <Docs /> },
//   { url: "/contact-us", component: <ContactUs /> },
//   { url: "/about-us", component: <AboutUs /> },
// ];

// export const allLayoutPaths = [...layoutFullScreenPaths, layoutPaths];
// export const allPaths = [{ url: "/", component: <Home /> }, ...allLayoutPaths];

// function App() {
//   const location = useLocation();

//   useLayoutEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <>
//       <Spinner />
//       <Suspense fallback={<Spinner />}>
//         <Switch>
//           <Route path={layoutFullScreenPaths.map((x) => x.url)}>
//             <LayoutFullScreen>
//               <Switch>
//                 {layoutFullScreenPaths.map(({ url, component }) => (
//                   <Route path={url}>{component}</Route>
//                 ))}
//               </Switch>
//             </LayoutFullScreen>
//           </Route>
//           <Route path={layoutPaths.map((x) => x.url)}>
//             <Layout>
//               <Switch>
//                 {layoutPaths.map(({ url, component }) => (
//                   <Route path={url}>{component}</Route>
//                 ))}
//               </Switch>
//             </Layout>
//           </Route>
//           <Route path={[allPaths[0].url]}>
//             <LayoutHome>
//               <Switch>
//                 <Route path={allPaths[0].url}>{allPaths[0].component}</Route>
//               </Switch>
//             </LayoutHome>
//           </Route>
//         </Switch>
//       </Suspense>
//     </>
//   );
// }

// export default App;
