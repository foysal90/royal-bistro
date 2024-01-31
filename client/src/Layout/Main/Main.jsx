

import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../pages/Shared/Footer/Footer';
import Navbar from '../../pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation()
    console.log(location)
    const isLoggedIn = location.pathname.includes('login')
    const isRegistered = location.pathname.includes('register');
    return (
        <div>
            {isLoggedIn || isRegistered || <Navbar/>}
            <Outlet/>
            {isLoggedIn || isRegistered || <Footer/>}
        </div>
    );
};

export default Main;