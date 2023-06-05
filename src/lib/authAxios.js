import axios from "axios";

const authAxios = axios.create({
    baseURL: "https://sorcery-portal-backend.herokuapp.com",
    headers: {
        Authorization: `${localStorage.getItem("token")}`,
    }
})

export default authAxios