import { createContext, useEffect, useState } from "react";
import api from "../services/ihate-pypdf/api";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const fetchCurrentUser = async () => {
    let token = localStorage.getItem("access_token");
    
    if (token == null) {
      return;
    }
    try {
      let response = await api.get("/accounts/users/current");
      setCurrentUser(response.data)
    } catch (error) {
      setCurrentUser(null)
    }
	};
  const loginUser = async (username, password) => {
    const requestBody = {
      username: username,
      password: password    
    };

    try {
      let response = await api.post("/accounts/authenticate/sign-in", requestBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      localStorage.setItem("access_token", response.data.access_token);
      await fetchCurrentUser();
      return true
    } catch (error) {
      return false
    }
  }
  const createUser = async (email, fname, lname, password) => {
    const requestBody = {
      email: email,
      first_name: fname,
      last_name: lname,
      password: password
    };
    let response = await api.post("/accounts/authenticate/sign-up", requestBody)
    return response;
  }

	useEffect(() => {
		fetchCurrentUser();
	}, []);
	const context = {
		currentUser,
    loginUser,
    createUser
	};

	return <ApplicationContext.Provider value={context}>{children}</ApplicationContext.Provider>;
};
