import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";
import logo from "../assets/logo.jpg";
import PagesNavigation from "./PagesNavigation";
import AccountNavigation from "./AccountNavigation";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.isLoggedIn);

    //Toggles the navigation for mobile users
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    //For updating the navigation buttons due to the user being logged in or not. also deals with checking if its a mobile device or not
    useEffect(() => {
        setIsLoggedIn(localStorage.isLoggedIn);
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="Movie Camera with heart" className={`rounded-circle ${styles.pic}`} />
                        <span className="mx-3">My Favorites</span>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleNav}
                        aria-expanded={isNavOpen}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto">
                            {windowWidth > 767 ? (
                                <AccountNavigation isLoggedIn={isLoggedIn} />
                            ) : (
                                <>
                                    <span className="ms-3 fs-5 fw-bold text-decoration-underline">Pages</span>
                                    <PagesNavigation isLoggedIn={isLoggedIn} />

                                    <span className="ms-3 fs-5 fw-bold mt-3 text-decoration-underline">Account</span>
                                    <AccountNavigation isLoggedIn={isLoggedIn} />
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            {windowWidth > 767 && (
                <nav className="navbar">
                    <div className="container">
                        <ul className="nav border-bottom border-3 border-dark pb-2">
                            <PagesNavigation isLoggedIn={isLoggedIn} />
                        </ul>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;