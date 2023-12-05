import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details, { loader as itemDetailLoader } from "./pages/Details";
import { createContext, useContext, useState } from "react";
import Favorites from "./pages/Favorites";

const SearchContext = createContext();

// HomePage component with access to context
const HomePageWithContext = () => {
    const { searchTerm, updateSearchTerm, searchResults, updateSearchResults, totalItems, updateTotalItems, favorites, updateFavorites } = useContext(SearchContext);

    return <HomePage
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        searchResults={searchResults}
        updateSearchResults={updateSearchResults}
        totalItems={totalItems}
        updateTotalItems={updateTotalItems}
        favorites={favorites}
        updateFavorites={updateFavorites} />;
};

const routes = [
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePageWithContext /> },
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
    const [totalItems, setTotalItems] = useState();
    const [favorites, setFavorites] = useState([]);

    const updateSearchTerm = newSearchTerm => {
        setSearchTerm(newSearchTerm);
    };

    const updateSearchResults = newSearchResults => {
        setSearchResults(newSearchResults);
    };

    const updateTotalItems = newAmountOfItems => {
        setTotalItems(newAmountOfItems);
    }

    const updateFavorites = newFavorites => {
        setFavorites(newFavorites);
        console.log("From app", favorites);
    }

    const contextValue = {
        searchTerm,
        updateSearchTerm,
        searchResults,
        updateSearchResults,
        totalItems,
        updateTotalItems,
        favorites,
        updateFavorites
    };

    return (
        <SearchContext.Provider value={contextValue}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </SearchContext.Provider>
    );
};

export default App;