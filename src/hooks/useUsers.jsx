import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../helper/endpoint";

const useAllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL.API}/?results=10`);
      setUsers(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return { users, getAllUsers };
};

export default useAllUsers;
