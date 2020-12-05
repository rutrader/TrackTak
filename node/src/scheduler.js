const cron = require("cron");
const { EventEmitter } = require("events");

const cronEmitter = new EventEmitter();
const events = {
  getListOfExchangesJob: "getListOfExchangesJob",
  getExchangeRatesLastCloseJob: "getExchangeRatesLastCloseJob",
};

// Every 24 hours
const getListOfExchangesJob = cron.job({
  cronTime: "* * 0 * * *",
  onTick: function () {
    cronEmitter.emit(events.getListOfExchangesJob);
  },
});

// EOD updates there's at 17:00, so we update just after
const getExchangeRatesLastCloseJob = cron.job({
  cronTime: "* 5 17 * * *",
  onTick: function () {
    cronEmitter.emit(events.getExchangeRatesLastCloseJob);
  },
  // CET Time
  utcOffset: 1,
});

module.exports = {
  getListOfExchangesJob,
  getExchangeRatesLastCloseJob,
  cronEmitter,
  events,
};
