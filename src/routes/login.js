import { useState } from "react";
import apiRoute from "../lib/apiRoute";
import authAxios from "../lib/authAxios";
import axios from "axios";
import FormInput from "../components/common/form-input";
import { Link } from "react-router-dom";

const Login = () => {

  let user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const submit = async () => {
          user = {
          email: email,
          password: password,
          }
    try {
      const response = await axios.post(`${apiRoute}login`, { user: user });
      const tokenResponse = response.headers.get("Authorization")
      localStorage.setItem("token", tokenResponse);
      window.location.href = "/";
      } catch (error) {
        setError("");
      }
      };

  return (
      <div className="flex justify-center items-center">
        <div className="bg-black-transparent border border-white p-16 rounded-lg w-4/12">
        <div className="flex flex-col items-center justify-around"> 
        <h2 className="forum text-5xl mb-8">Login</h2>
        <form onSubmit={(e) => {
                e.preventDefault()
                submit()
            }}>
            <FormInput label= {"email"} type={"email"} value={email} onChange={setEmail} />
            <FormInput label={"password"} type={"password"} value={password} onChange={setPassword} />
                <button className="button my-8" type="submit">Login</button>
                <p className="forum">New to Sorcery Portal?<Link to={"/signup"}><span className="text-3xl ml-4">Sign up here</span></Link></p>
          </form>
          </div>   
      </div>
      </div>
    )
}
export default Login
