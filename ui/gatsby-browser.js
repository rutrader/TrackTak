const minMax = require("dayjs/plugin/minMax");
const advancedFormat = require("dayjs/plugin/advancedFormat");
const dayjs = require("dayjs");
const reportWebVitals = require("./reportWebVitals");

exports.onClientEntry = () => {
  dayjs.extend(minMax);
  dayjs.extend(advancedFormat);
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};
