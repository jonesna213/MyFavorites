import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details, { loader as itemDetailLoader } from "./pages/Details";
import { useState } from "react";
import Favorites from "./pages/Favorites";
import { Context } from "./store/Context";

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/signin", element: <SignIn /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/details/:id", element: <Details />, loader: itemDetailLoader },
            { path: "/favorites", element: <Favorites /> }
        ],
    }
];

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [totalItems, setTotalItems] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const contextValue = {
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        totalItems,
        setTotalItems,
        user,
        setUser,
        token,
        setToken
    };

    return (
        <Context.Provider value={contextValue}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </Context.Provider>
    );
};

export default App;