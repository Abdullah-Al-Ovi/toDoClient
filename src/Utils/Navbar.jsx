import { NavLink, useNavigate } from "react-router-dom";
import useIsAuthenticated from "../Hooks/useIsAuthenticated";
import userImage from "../assets/images/userImage.jpg"
import { useContext, useState } from "react";
import { authContext } from "../Components/AuthProvider/AuthProvider";



const Navbar = () => {
    const { userEmail } = useIsAuthenticated()
    const {currentUser,setCurrentUser} = useContext(authContext)
    const navigate =  useNavigate()
    const routes = <>
        <li ><NavLink to="/">Home</NavLink></li>
        <li ><NavLink to="/login">Login</NavLink></li>
        <li ><NavLink to="/manageTask">Manage Task</NavLink></li>
    </>

    const handleSignOut=()=>{
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userId")
        navigate("/")
        setCurrentUser("")

    }
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
                // userEmail && <img className="border-2 w-[50px] h-[50px] rounded-full" src={userEmail && userImage} alt="" />
                currentUser && <div className="dropdown  dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User Profile" src={currentUser && userImage} />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-600 rounded-lg w-32">
                    <button onClick={handleSignOut}>
                        <li><a className="text-white">Logout</a></li>
                    </button>
                </ul>
            </div>
            }
            </div>
        </div>
    );
};

export default Navbar;