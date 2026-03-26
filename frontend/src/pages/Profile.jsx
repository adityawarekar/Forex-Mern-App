import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setName(res.data.name);

    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
      setEditing(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Profile 👤</h1>

        <div className="bg-gray-900 p-6 rounded-lg space-y-4">

          {!user ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <p className="text-gray-400">Name:</p>

                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black border border-gray-700 p-2 mt-1"
                  />
                ) : (
                  <p className="text-white">{user.name}</p>
                )}
              </div>

              <div>
                <p className="text-gray-400">Email:</p>
                <p className="text-white">{user.email}</p>
              </div>

              {editing ? (
                <button
                  onClick={updateProfile}
                  className="bg-green-500 px-4 py-2 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-white text-black px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;