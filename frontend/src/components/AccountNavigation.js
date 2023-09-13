import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";

const AccountNavigation = props => {
    return (
        <>
            {props.isLoggedIn ? (
                <>
                    <li className="nav-item">
                        <a href="/" onClick={props.onLogout} className={styles.links}>Logout</a>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <NavLink to="/signin" className={styles.links}>Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/createAccount" className={styles.links}>Create Account</NavLink>
                    </li>
                </>
            )}
        </>
    );
}

export default AccountNavigation;