import { Sling as Hamburger } from 'hamburger-react'
import logo from "../static/images/sorcery-logo-new-white.png"
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
            <Link to={""}>
                <div className='m-8'>
                    <Hamburger color='#f4f4f4' easing="ease-in" size={50} rounded/>
                </div>
            </Link>
        </div>
    )
}
export default NavBar