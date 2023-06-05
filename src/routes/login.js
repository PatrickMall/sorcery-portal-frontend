import { useState } from "react";
import apiRoute from "../lib/apiRoute";
import authAxios from "../lib/authAxios";
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
          };
      try {
          const response = await authAxios.post(`${apiRoute}login`, { user: user });
          console.log(response)
            const tokenResponse = response.headers.get("Authorization")
          localStorage.setItem("token", tokenResponse);
            console.log(localStorage)
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    return (
        <div className="mx-80 p-8 border border-white flex flex-col items-center justify-center">
            <form onSubmit={(e) => {
                e.preventDefault()
                submit()
            }}>
            <FormInput label= {"email"} type={"email"} value={email} onChange={setEmail} />
            <FormInput label={"password"} type={"password"} value={password} onChange={setPassword} />
                <button className="button my-8" type="submit">Login</button>
                <p className="forum">New to Sorcery Portal?<Link to={"/signup"}><span className="text-xl ml-4">Sign up here</span></Link></p>
                </form>
        </div>
    )
}
export default Login
