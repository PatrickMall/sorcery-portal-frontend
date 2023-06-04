import { Route, Routes } from "react-router-dom"
import SignUp from "./components/sign-up"
import './style/App.css'
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import authAxios from "./lib/authAxios";
import apiRoute from "./lib/apiRoute";
import Questionnaire from "./components/questionnaire";

function App() {
  const [user, setUser] = useState("");

  async function fetchData() {
    console.log(localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      let userId;
      try {
        userId = jwt_decode(token).id;
      } catch (error) {
        console.log("Invalid token:", error);
        setUser("");
        return;
      }
      try {
        const response = await authAxios.get(`${apiRoute}current_user`);
        setUser(response.data.user);
        console.log(user);
      } catch (error) {
        console.log("Error fetching user data:", error);
        setUser("");
      }
    } else {
      setUser("");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App bg-black h-screen">
      {/* <SignUp /> */}
      <Questionnaire />
    </div>
  );
}

export default App