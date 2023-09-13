import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = props => {
    return (
        <>
            <Header onLogout={props.onLogout} />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default RootLayout;