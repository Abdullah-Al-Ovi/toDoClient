import  { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Utils/Navbar';

const Root = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;