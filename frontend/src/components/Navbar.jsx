function Navbar() {
  return (
    <div className="w-full border-b border-gray-800 bg-black px-6 py-4 flex items-center justify-between">

      {/* Logo / Title */}
      <h1 className="text-xl font-bold tracking-wide">
        FOREX WORKSPACE
      </h1>

      {/* Navigation */}
      <div className="flex gap-6 text-gray-400 text-sm">
        <p className="hover:text-white cursor-pointer">Dashboard</p>
        <p className="hover:text-white cursor-pointer">Channels</p>
        <p className="hover:text-white cursor-pointer">Profile</p>
      </div>

    </div>
  );
}

export default Navbar;