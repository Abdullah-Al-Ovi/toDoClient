import { NavLink } from "react-router-dom";
import useIsAuthenticated from "../Hooks/useIsAuthenticated";
import userImage from "../assets/images/userImage.jpg"
import { useContext } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";


const Navbar = () => {
    const { userEmail } = useIsAuthenticated()
    const {currentUser} = useContext(authContext)
    const routes = <>
        <li ><NavLink to="/">Home</NavLink></li>
        <li ><NavLink to="/login">Login</NavLink></li>
        <li ><NavLink to="/manageTask">Manage Task</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {routes}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">SCC
                    Technovision</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {routes}
                </ul>
            </div>
            <div className="navbar-end ">
            {
                currentUser?.id && <img className="border-2 w-[50px] h-[50px] rounded-full" src={currentUser?.id && userImage} alt="" />
            }
            </div>
        </div>
    );
};

export default Navbar;