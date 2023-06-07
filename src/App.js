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
import Profile from "./routes/profile";
import Dashboard from "./routes/dashboard";
import PageNotFound from "./routes/pagenotfound";
import UpdateAnswer from "./routes/update-answer";
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
  //states
  const [user, setUser] = useState("");
  const [background, setBackground] = useState(backgrounds[Math.floor(Math.random()* 30)]);
  const changeBackground = () => {
    setBackground(backgrounds[Math.floor(Math.random()* 30)])
  }

  /// fetch signed in user data from server
  async function fetchData() {
    const token = localStorage.getItem("token");
    if (token) {
      let userId;
      try {
        userId = jwt_decode(token);
      } catch (error) {
        setUser("");
        return;
      }
      try {
        const response = await authAxios.get(`${apiRoute}current_user`)
        setUser(response.data)
      } catch (error) {
        setUser("")
      }
    } else {
      setUser("")
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  if (!user) {
    return (
      <> 
        <div className={`App ${background} h-screen`}>
          <NavBar user={user} />
          <div className="m-16">
          <Routes>
            <Route path={"/"} element={<Login />} />
              <Route path={"/signup"} element={<SignUp />} />
              <Route path={"/profile"} element={<Login />} />
              <Route path={"/questionnaire"} element={<Login />} />
              <Route path={"/profile"} element={<Login />} />
            <Route path={"*"} element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      
      </>
    );
  } else {
    return (
    <>
      <div className={`App ${background} h-screen overflow-hidden`}>
        <NavBar user={user} />
        <div className="m-16">
          <Routes>
            <Route path={"/questionnaire"} element={<Questionnaire changeBackground={changeBackground} /> } />
            <Route path={"/profile"} element={<Profile user={user} />} />
            <Route path={"/"} element={<Dashboard user={user} />} />
              <Route path={"*"} element={<PageNotFound />} />
              <Route path={"/update-answer"} element={<UpdateAnswer />} />
          </Routes>
          </div>
        </div>
      </>)
  }
}

export default App