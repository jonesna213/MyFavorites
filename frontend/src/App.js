import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details, { loader as itemDetailLoader } from "./pages/Details";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

// HomePage component with access to context
const HomePageWithContext = () => {
    const { searchTerm, updateSearchTerm, searchResults, updateSearchResults, totalItems, updateTotalItems } = useContext(SearchContext);

    return <HomePage
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
        searchResults={searchResults}
        updateSearchResults={updateSearchResults}
        totalItems={totalItems}
        updateTotalItems={updateTotalItems} />;
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
        ],
    }
];

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [totalItems, setTotalItems] = useState();

    const updateSearchTerm = newSearchTerm => {
        setSearchTerm(newSearchTerm);
    };

    const updateSearchResults = newSearchResults => {
        setSearchResults(newSearchResults);
    };

    const updateTotalItems = newAmountOfItems => {
        setTotalItems(newAmountOfItems);
    }

    const contextValue = {
        searchTerm,
        updateSearchTerm,
        searchResults,
        updateSearchResults,
        totalItems,
        updateTotalItems
    };

    return (
        <SearchContext.Provider value={contextValue}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </SearchContext.Provider>
    );
};

export default App;