const addToFavorites = async (id, type) => {
    if (!localStorage.getItem("userId") || !localStorage.getItem("token")) {
        return false;
    }

    try {
        const result = await fetch("http://localhost:8080/favorites/addFavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                id,
                type,
                userId: localStorage.getItem("userId")
            })
        });

        const resData = await result.json();

        if (result.ok) {
            return resData;
        }

        return resData;

    } catch (err) {
        return false;
    }
}

export default addToFavorites;