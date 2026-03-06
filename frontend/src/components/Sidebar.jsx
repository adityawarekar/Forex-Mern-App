function Sidebar() {
  return (
    <div className="w-64 h-full border-r border-gray-800 bg-black p-4">

      <h2 className="text-gray-400 text-sm mb-4">
        CHANNELS
      </h2>

      <div className="space-y-2">

        <div className="bg-white text-black px-3 py-2 rounded cursor-pointer">
          EUR/USD Traders
        </div>

        <div className="hover:bg-gray-900 px-3 py-2 rounded cursor-pointer">
          GBP/USD
        </div>

        <div className="hover:bg-gray-900 px-3 py-2 rounded cursor-pointer">
          USD/JPY
        </div>

        <div className="hover:bg-gray-900 px-3 py-2 rounded cursor-pointer">
          USD/CHF
        </div>

      </div>

    </div>
  );
}

export default Sidebar;