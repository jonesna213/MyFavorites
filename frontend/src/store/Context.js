import { createContext, useState } from "react";

export const Context = createContext({
    user: null,
    token: null,
    searchTerm: "",
    searchResults: [],
    totalItems: null
});

const ContextProvider = ({children}) => {
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
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;