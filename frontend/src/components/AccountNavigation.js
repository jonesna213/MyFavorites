import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";

const AccountNavigation = props => {
    //Handles logging a user out
    const logoutHandler = () => {
        localStorage.clear();
    }

    return (
        <>
            {props.isLoggedIn ? (
                <>
                    <li className="nav-item">
                        <a href="/" onClick={logoutHandler} className={styles.links}>Logout</a>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <NavLink to="/signin" className={styles.links}>Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/signup" className={styles.links}>Create Account</NavLink>
                    </li>
                </>
            )}
        </>
    );
}

export default AccountNavigation;