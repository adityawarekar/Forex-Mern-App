import { useEffect, useState } from "react";
import socket from "../socket/socket";

function ForexTable() {

  const [prices, setPrices] = useState([]);

  useEffect(() => {

    socket.on("forexUpdate", (data) => {

      setPrices(prev => {

        const updated = [...prev];
        const index = updated.findIndex(p => p.pair === data.pair);

        if (index !== -1) {
          updated[index] = data;
        } else {
          updated.push(data);
        }

        return updated;
      });

    });

  }, []);

  return (
    <div className="bg-gray-950 p-6 rounded-lg w-full">

      <h2 className="text-lg font-semibold mb-4">
        Live Forex Prices
      </h2>

      <table className="w-full text-left">

        <thead className="border-b border-gray-800 text-gray-400 text-sm">
          <tr>
            <th className="py-2">Pair</th>
            <th>Bid</th>
            <th>Ask</th>
          </tr>
        </thead>

        <tbody>
          {prices.map((item) => (
            <tr key={item.pair} className="border-b border-gray-900">
              <td className="py-3">{item.pair}</td>
              <td>{item.bid}</td>
              <td>{item.ask}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ForexTable;