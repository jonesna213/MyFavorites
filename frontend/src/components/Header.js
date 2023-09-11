import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.jpg";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    useEffect(() => {
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
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/signin" className={styles.links}>Sign In</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/createAccount" className={styles.links}>Create Account</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <span className="ms-3 fs-5 fw-bold text-decoration-underline">Pages</span>
                                    <li className="nav-item">
                                        <NavLink to="/" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links} end>Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/projects" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Projects</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/about" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>About</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/contact" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Contact</NavLink>
                                    </li>

                                    <span className="ms-3 fs-5 fw-bold mt-3 text-decoration-underline">Account</span>
                                    <li className="nav-item">
                                        <NavLink to="/signin" className={styles.links}>Sign In</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/createAccount" className={styles.links}>Create Account</NavLink>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
            {windowWidth > 767 && (
                <nav className="navbar">
                    <div className="container">
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links} end>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/projects" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Projects</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;