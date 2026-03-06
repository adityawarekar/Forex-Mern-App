const axios = require("axios");
const ForexUpdate = require("../models/ForexUpdate");
const { getIO } = require("../socket/socket");

function startForexStream() {

  const pairs = [
    { base: "EUR", quote: "USD" },
    { base: "GBP", quote: "USD" },
    { base: "USD", quote: "JPY" },
    { base: "USD", quote: "CHF" }
  ];

  setInterval(async () => {

    try {

      for (const pair of pairs) {

        const url = `https://open.er-api.com/v6/latest/${pair.base}`;

        const response = await axios.get(url);

        const rate = response.data.rates[pair.quote];

        const bid = Number(rate.toFixed(5));
        const ask = Number((rate + 0.0003).toFixed(5));

        const update = new ForexUpdate({
          pair: `${pair.base}/${pair.quote}`,
          bid,
          ask
        });

        await update.save();

        const io = getIO();
        io.emit("forexUpdate", update);

        console.log(`Forex Update: ${pair.base}/${pair.quote}`, bid, ask);

      }

    } catch (error) {

      console.error("Forex API Error:", error.message);

    }

  }, 10000);

}

module.exports = startForexStream;