import { Link } from "react-router-dom"

const NavItem = ({ url, label }) => {
    return (
        <div className="p-4">
            <Link to={url}>
                <h3 className="forum text-5xl text-center">{label}</h3>
            </Link>
        </div>
    )
}

export default NavItem