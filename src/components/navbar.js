import { Sling as Hamburger } from 'hamburger-react'
import logo from "../static/images/sorcery-logo-new-white.png"
import { Link } from "react-router-dom"
import { useState } from 'react'
import NavItem from './common/nav-item'
const NavBar = ({ user, background }) => {

    const [isOpen, setOpen] = useState(false)
    
    const toggleMenu = () => {
        setOpen(!isOpen)
    }
    console.log(isOpen)

    return (
        <div >
            <div className={isOpen ? `${background} h-screen` : `${""}`}>
            <div className="flex justify-between items-center bg-black">
            <Link to={"/"}>
                <img src={logo} className="w-20 m-8" />
            </Link>
            <Link to={"/"}>
                <h1 className="forum text-5xl">Sorcery Portal</h1>
            </Link>
                <div className='m-8'>
                    <Hamburger color='#f4f4f4' easing="ease-in" size={50} rounded toggled={isOpen} toggle={setOpen} />
                </div>
                </div>

            {isOpen && (
                <div>
                    {user && (
                        <div>
                            <Link to={"/dashboard"}>
                                <h3 className='forum'>Dashboard</h3>
                            </Link>
                        </div>
                    )}
                    {!user && (
                        <div className='flex justify-center items-center'>
                            <div className='bg-black-transparent border border-white p-16 rounded-lg w-4/12 m-32'>
                                <div className='my-8' onClick={() => {toggleMenu()}}>
                                    <NavItem url={"/"} label={"login"} />
                                </div>
                                <div className='my-8' onClick={() => {toggleMenu()}}>    
                                    <NavItem url={"/signup"} label={"signup"} toggle={setOpen} />
                                </div>    
                            </div>
                        </div>
                    )}

                
                </div>
         )}   
            </div>
            </div>
    )
}
export default NavBar