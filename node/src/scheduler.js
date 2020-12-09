const cron = require("cron");
const { EventEmitter } = require("events");

const cronEmitter = new EventEmitter();
const events = {
  getGovernmentBondLastClose: "getGovernmentBondLastClose",
};

// Every 24 hours
// TODO: Implement
const getGovernmentBondLastClose = cron.job({
  cronTime: "* * 0 * * *",
  onTick: function () {
    cronEmitter.emit(events.getGovernmentBondLastClose);
  },
});

module.exports = {
  getGovernmentBondLastClose,
  cronEmitter,
  events,
};
