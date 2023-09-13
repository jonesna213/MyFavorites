import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";

const signInHandler = async (email, password) => {
    try {
        const result = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (result.ok) {
            const resData = await result.json();
            localStorage.setItem("userId", resData.userId);
            localStorage.setItem("token", resData.token);
            localStorage.setItem("isLoggedIn", true);
            return true;
        }

    } catch (err) {
        return false;
    }
}

const logoutHandler = () => {
    localStorage.clear();
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout  onLogout={logoutHandler} />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/signin", element: <SignIn onSignIn={signInHandler} /> }
        ]
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;