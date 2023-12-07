import { NavLink } from "react-router-dom";
import styles from "../pages/css/Header.module.css";
import { useContext } from "react";
import { Context } from "../store/Context";

const AccountNavigation = () => {
    const ctx = useContext(Context);

    //Handles logging a user out
    const logoutHandler = () => {
        ctx.updateUser(null);
        ctx.updateToken(null);
    }

    return (
        <>
            {ctx.user ? (
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