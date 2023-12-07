import { createContext } from "react";

export const Context = createContext({
    user: null,
    token: null,
    searchTerm: "",
    searchResults: [],
    totalItems: null
});