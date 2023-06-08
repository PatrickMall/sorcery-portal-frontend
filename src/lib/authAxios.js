import axios from "axios";

const authAxios = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        Authorization: `${localStorage.getItem("token")}`,
        
    }
})

export default authAxios