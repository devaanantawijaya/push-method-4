import { useEffect, useState } from "react";
import useAllUsers from "./hooks/useUsers";

const App = () => {
  const { users, getAllUsers, loading } = useAllUsers();
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllUsers(page);
  }, [page]);

  // Filter Data berdasarkan Search & Gender
  const filteredUsers = users.filter((item) => {
    const fullName = `${item.name.first} ${item.name.last}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) &&
      (gender === "" || item.gender === gender)
    );
  });

  // Reset Filter
  const resetFilters = () => {
    setSearch("");
    setGender("");
  };

  return (
    <div className="px-10">
      <div className="font-bold text-2xl py-5 text-center">- List User -</div>
      {/* Filter */}
      <div className="flex gap-x-5">
        {/* Input Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        {/* Select Gender */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Button Reset */}
        <button
          onClick={resetFilters}
          className="w-full bg-gray-800 font-semibold text-white rounded mb-2"
        >
          Reset Filter
        </button>
      </div>

      {/* Table */}
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
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <tr key={index} className="text-center border">
                  <td className="px-4 py-2 border">{item.login.username}</td>
                  <td className="px-4 py-2 border">
                    {`${item.name.title}. ${item.name.first} ${item.name.last}`}
                  </td>
                  <td className="px-4 py-2 border">{item.email}</td>
                  <td className="px-4 py-2 border">{item.gender}</td>
                  <td className="px-4 py-2 border">
                    {item?.registered?.date?.slice(0, 10)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 border rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-800 text-white"
          }`}
        >
          Prev
        </button>
        <span className="font-bold text-lg">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border bg-gray-800 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
