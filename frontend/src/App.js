import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

//For handling sign in requests
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

        const resData = await result.json();

        if (result.ok) {
            localStorage.setItem("userId", resData.userId);
            localStorage.setItem("token", resData.token);
            localStorage.setItem("isLoggedIn", true);
            return true;
        } else {
            return resData.message;
        }

    } catch (err) {
        return false;
    }
}

//for handling signup requests
const signUpHandler = async (name, email, password, confirmPassword) => {
    try {
        const result = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword
            })
        });

        const resData = await result.json();

        if (result.ok) {
            return true;
        } else {
            return resData.message;
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
        element: <RootLayout onLogout={logoutHandler} />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/signin", element: <SignIn onSignIn={signInHandler} /> },
            { path: "/signup", element: <SignUp onSignUp={signUpHandler} /> }
        ]
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;