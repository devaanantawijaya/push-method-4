import { useEffect } from "react";
import useAllUsers from "./hooks/useUsers";

const App = () => {
  const { users, getAllUsers } = useAllUsers();

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="px-10">
      <div className="font-bold text-2xl py-5 text-center">- List User -</div>
      <div className="flex gap-x-5">
        {/* Input Search */}
        <input
          type="text"
          placeholder="Search by name..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        {/* Select Gender */}
        <select
          // value={gender}
          // onChange={(e) => setGender(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Button Reset */}
        <button className="w-full bg-gray-800 font-semibold text-white rounded mb-2">
          Reset Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Registrasi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="text-center border">
                <td className="px-4 py-2 border">{item.login.username}</td>
                <td className="px-4 py-2 border">{`${item.name.title}. ${item.name.first} ${item.name.last}`}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">{item.gender}</td>
                <td className="px-4 py-2 border">
                  {item?.registered?.date?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
