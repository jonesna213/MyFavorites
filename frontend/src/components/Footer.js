import styles from "../pages/css/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="text-center">
                <h4>My Favorites</h4>
            </div>
            <hr />
            <div className="text-center">
                <p>Developed by: Navy Jones</p>
            </div>
        </footer>
    );
}

export default Footer;