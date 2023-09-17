import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

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
            { path: "/signin", element: <SignIn /> },
            { path: "/signup", element: <SignUp /> }
        ]
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;