

import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../pages/Shared/Footer/Footer';
import Navbar from '../../pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation()
    console.log(location)
    const isLoggedIn = location.pathname.includes('login')  || location.pathname.includes('register') || location.pathname.includes('profile')
    
    return (
        <div>
            {isLoggedIn || <Navbar/>}
            <Outlet/>
            {isLoggedIn || <Footer/>}
        </div>
    );
};

export default Main;