import { Link } from "react-router-dom"
const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-around">
            <div className="bg-black-transparent border border-white p-16 rounded-lg w-4/12 flex flex-col items-center justify-around">
                <h1 className="forum text-5xl mb-8">404</h1>
                <p className="forum text-2xl mb-8 text-center">Sorry the page you have requested is not in our portal</p>
                <Link to="/"><button className="button">Back to Homepage</button></Link>
            </div>
        </div>
    )
}
export default PageNotFound