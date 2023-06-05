import { Route, Routes } from "react-router-dom"
import SignUp from "./routes/sign-up"
import './style/App.css'
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import authAxios from "./lib/authAxios";
import apiRoute from "./lib/apiRoute";
import Questionnaire from "./routes/questionnaire";
import NavBar from "./components/navbar";
import Login from "./routes/login";

function App() {
  const backgrounds = [
    "bg-[url('./static/images/sorcery-stills/background1.png')]",
    "bg-[url('./static/images/sorcery-stills/background2.png')]",
    "bg-[url('./static/images/sorcery-stills/background3.png')]",
    "bg-[url('./static/images/sorcery-stills/background4.png')]",
    "bg-[url('./static/images/sorcery-stills/background5.png')]",
    "bg-[url('./static/images/sorcery-stills/background6.png')]",
    "bg-[url('./static/images/sorcery-stills/background7.png')]",
    "bg-[url('./static/images/sorcery-stills/background8.png')]",
    "bg-[url('./static/images/sorcery-stills/background9.png')]",
    "bg-[url('./static/images/sorcery-stills/background10.png')]",
    "bg-[url('./static/images/sorcery-stills/background11.png')]",
    "bg-[url('./static/images/sorcery-stills/background12.png')]",
    "bg-[url('./static/images/sorcery-stills/background13.png')]",
    "bg-[url('./static/images/sorcery-stills/background14.png')]",
    "bg-[url('./static/images/sorcery-stills/background15.png')]",
    "bg-[url('./static/images/sorcery-stills/background16.png')]",
    "bg-[url('./static/images/sorcery-stills/background17.png')]",
    "bg-[url('./static/images/sorcery-stills/background18.png')]",
    "bg-[url('./static/images/sorcery-stills/background19.png')]",
    "bg-[url('./static/images/sorcery-stills/background20.png')]",
    "bg-[url('./static/images/sorcery-stills/background21.png')]",
    "bg-[url('./static/images/sorcery-stills/background22.png')]",
    "bg-[url('./static/images/sorcery-stills/background23.png')]",
    "bg-[url('./static/images/sorcery-stills/background24.png')]",
    "bg-[url('./static/images/sorcery-stills/background25.png')]",
    "bg-[url('./static/images/sorcery-stills/background26.png')]",
    "bg-[url('./static/images/sorcery-stills/background27.png')]",
    "bg-[url('./static/images/sorcery-stills/background28.png')]",
    "bg-[url('./static/images/sorcery-stills/background29.png')]",
    "bg-[url('./static/images/sorcery-stills/background30.png')]",
  ]
  
  const [user, setUser] = useState("");
  const [background, setBackground] = useState(backgrounds[Math.floor(Math.random()* backgrounds.length -1)]);
  console.log(background)

  async function fetchData() {
    console.log(localStorage)
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      let userId;
      try {
        userId = jwt_decode(token);
        console.log(userId)
      } catch (error) {
        console.log("Invalid token:", error);
        setUser("");
        return;
      }
      try {
        const response = await authAxios.get(`${apiRoute}current_user`);
        setUser(response.data.id);
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
    <>
       <NavBar />
      <div className={`App ${background} p-12 h-screen overflow-hidden`}>
     
        <Routes>
          <Route path={"/questionaire"} element={<Questionnaire />} />
      
      
          
        </Routes>
        <Questionnaire />
        {/* <SignUp />
        <Login /> */}
      </div>
      
    </>
  );
}

export default App