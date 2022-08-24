import React, { createContext, useEffect, useState } from "react";
import { getUsers } from "../api/productApi";

export const userProvider = createContext();
const UsersContext = (props) => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(false);
  const [username, setUserName] = useState("");
  useEffect(() => {
    const userApi = async () => {
      setUsers(await getUsers());
    };
    userApi();
  }, []);
  return (
    <userProvider.Provider
      value={{ users, errors, setErrors, username, setUserName }}
    >
      {props.children}
    </userProvider.Provider>
  );
};

export default UsersContext;
