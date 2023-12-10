import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";
import { useContext } from "react";
import { Context } from "../store/Context";

const PagesNavigation = () => {
    const ctx = useContext(Context);

    return (
        <>
            {ctx.user ? (
                <>
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links} end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Favorites</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/recommendations" className={({ isActive }) => isActive ? styles.links + " " + styles.active : styles.links}>Get Recommendations</NavLink>
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