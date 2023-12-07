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
    const [user, updateUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);

    const setUser = newUser => {
        updateUser(newUser);
        if (newUser === null) {
            localStorage.removeItem("userInfo");
        } else {
            localStorage.setItem("userInfo", JSON.stringify(newUser));
        }
    }

    const contextValue = {
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        totalItems,
        setTotalItems,
        user,
        setUser
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;