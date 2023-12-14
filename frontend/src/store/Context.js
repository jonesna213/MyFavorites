import { createContext, useState } from "react";

export const Context = createContext({
    user: null,
    searchTerm: "",
    searchResults: [],
    totalItems: null,
    recommendations: []
});

const ContextProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [totalItems, setTotalItems] = useState(null);
    const [user, updateUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
    const [recommendations, setRecommendations] = useState([]);

    const setUser = newUser => {
        updateUser(newUser);
        if (newUser === null) {
            localStorage.removeItem("userInfo");
        } else {
            localStorage.setItem("userInfo", JSON.stringify(newUser));
        }
    }

    const favoritesHandler = async (book, type) => {
        let url = "";

        if (type === "remove") {
            url = "http://localhost:8080/favorites/removeFavorite";
        } else if (type === "add") {
            url = "http://localhost:8080/favorites/addFavorite";
        }

        try {
            const result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token
                },
                body: JSON.stringify({
                    book
                })
            });
            const data = await result.json();

            if (result.ok) {
                const updatedUser = { ...user };
                updatedUser.favorites = data.updatedFavorites;
                setUser(updatedUser);
            }
        } catch (err) {
            console.log(err);
            return;
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
        setUser,
        favoritesHandler,
        recommendations,
        setRecommendations,
        searchType,
        setSearchType
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;