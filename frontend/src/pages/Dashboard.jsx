import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ForexTable from "../components/ForexTable";
import ChatBox from "../components/ChatBox";

function Dashboard() {
  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-6 grid grid-cols-2 gap-6">

          <ForexTable />
          <ChatBox />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;