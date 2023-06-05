import logo from "../static/images/sorcery-logo-new-white.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
const NavBar = () => {
    return (
        <div className="flex justify-between items-center bg-black">
            <Link to={"/"}>
                <img src={logo} className="w-20 m-8" />
            </Link>
            <Link to={"/"}>
                <h1 className="forum text-5xl">Sorcery Portal</h1>
            </Link>
            <Link to={"/profile"}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#f4f4f4" }} className="mx-8 fa-2x" />
            </Link>
        </div>
    )
}
export default NavBar