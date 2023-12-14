import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details, { loader as itemDetailLoader } from "./pages/Details";
import Favorites from "./pages/Favorites";
import ContextProvider from "./store/Context";
import Recommendations from "./pages/Recommendations";
import LoggedOut from "./pages/LoggedOut";

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/signin", element: <SignIn /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/details/:id/:returnTo", element: <Details />, loader: itemDetailLoader },
            { path: "/favorites", element: <Favorites /> },
            { path: "/recommendations", element: <Recommendations /> },
            { path: "/loggedOut/:reason", element: <LoggedOut /> }
        ],
    }
];

const App = () => {

    return (
        <ContextProvider>
            <RouterProvider router={createBrowserRouter(routes)} />
        </ContextProvider>
    );
};

export default App;