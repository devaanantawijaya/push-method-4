import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../helper/endpoint";

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL.API}/?page=${page}&results=10&seed=abc`
      );
      setUsers(res.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { users, getAllUsers, loading };
};

export default useAllUsers;
