import styles from "../pages/css/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="text-center">
                <h4>My Favorites</h4>
                <p>A place to save your favorite media, and get recommendations!</p>
            </div>
            <hr />
            <div className="text-center">
                <p>Developed by: Navy Jones</p>
            </div>
        </footer>
    );
}

export default Footer;