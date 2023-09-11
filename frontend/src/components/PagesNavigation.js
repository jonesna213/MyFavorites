import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";

const PagesNavigation = () => {
    return (
        <>
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
        </>
    );
}

export default PagesNavigation;