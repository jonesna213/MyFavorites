import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";

const PagesNavigation = props => {
    return (
        <>
            {props.isLoggedIn ? (
                <>
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links} end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Favorites</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/recommendation" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Get a Recommendation</NavLink>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links} end>Home</NavLink>
                    </li>
                </>
            )}

        </>
    );
}

export default PagesNavigation;