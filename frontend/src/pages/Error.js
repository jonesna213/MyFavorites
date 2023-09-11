import Footer from "../components/Footer";
import Header from "../components/Header";

const ErrorPage = () => {
    return (
        <>
            <Header />
            <main className="text-center text-danger my-5">
                <h1>An error occurred!</h1>
                <p>Could not find this page!</p>
            </main>
            <Footer />
        </>
    );
} 
export default ErrorPage;