const ForexUpdate = require("../models/ForexUpdate");
const { getIO } = require("../socket/socket");

function startForexStream() {

  const pairs = [
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "USD/CHF"
  ];

  setInterval(async () => {

    try {

      const pair = pairs[Math.floor(Math.random() * pairs.length)];

      const bid = (1 + Math.random()).toFixed(5);
      const ask = (parseFloat(bid) + 0.0003).toFixed(5);

      const update = new ForexUpdate({
        pair,
        bid,
        ask
      });

      await update.save();

      const io = getIO();
      io.emit("forexUpdate", update);

      console.log("Forex Update:", pair, bid, ask);

    } catch (error) {
      console.error("Forex Stream Error:", error);
    }

  }, 5000);

}

module.exports = startForexStream;