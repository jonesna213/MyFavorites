import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";
import noImage from "../assets/Image_not_available.png";
import { Context } from "../store/Context";

const HomePage = () => {
    const [error, setError] = useState();
    const [searching, setSearching] = useState();
    let startIndex = 0;

    const ctx = useContext(Context);

    /**
     * Runs when the search button is clicked. Takes input then searches api with the passed in search term.
     * 
     * @param {*} event 
     * @returns technically nothing but, sets the required states
     */
    const searchHandler = async event => {
        event.preventDefault();
        setSearching(true);
        setError(false);

        const search = ctx.searchTerm.trim().replace(" ", "%20");

        const searchType = "intitle"; //get from dropdown thing
        const maxResults = 20;

        try {
            const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchType}:${search}&startIndex=${startIndex}&maxResults=${maxResults}`);

            const resData = await result.json();

            if (result.ok) {
                ctx.setTotalItems(resData.totalItems);
                ctx.setSearchResults(resData.items.map(i => {

                    let imageLink;

                    if (!i.volumeInfo.imageLinks || !i.volumeInfo.imageLinks.thumbnail) {
                        imageLink = null;
                    } else {
                        imageLink = i.volumeInfo.imageLinks.thumbnail
                    }

                    return {
                        bookId: i.id,
                        authors: i.volumeInfo.authors || [],
                        imageLink,
                        identifiers: i.volumeInfo.industryIdentifiers || [],
                        publishedDate: i.volumeInfo.publishedDate,
                        title: i.volumeInfo.title
                    };
                }));

                setSearching(false);
                return;
            } else {
                setSearching(false);
                setError(true);
                return;
            }

        } catch (err) {
            console.log(err);
            setSearching(false);
            setError(true);
            return;
        }
    }

    return (
        <>
            <section>
                <form onSubmit={searchHandler} className={`mx-auto w-75 row ${styles.form}`}>
                    {error && <p className="text-center text-danger mb-5">An error has occurred. Please try again later, we are sorry for the inconvenience.</p>}

                    <div className="col-8">
                        <input type="text" className="form-control" id="searchTerm" name="searchTerm" placeholder="What are you looking for?" value={ctx.searchTerm} onChange={e => ctx.setSearchTerm(e.target.value)} />
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary px-5 py-2">Search</button>
                    </div>

                    {searching && <p className="text-center text-secondary mt-5">Searching...</p>}
                </form>
            </section>

            {ctx.searchResults.length > 0 && (
                <section>
                    <p>Total items found: {ctx.totalItems}</p>
                    <ul>
                        {ctx.searchResults.map(b => (
                            <li className="card w-100 my-3" key={b.bookId} id={b.bookId}>
                                <div className="row">
                                    <div className="col-3">
                                        <img className="img-fluid rounded-start" src={b.imageLink || noImage} alt={`Thumbnail for ${b.title}`} />
                                    </div>
                                    <div className="col-6">
                                        <Link to={`/details/${b.bookId}/home`} className="text-decoration-none text-black">
                                            <div className="card-body">
                                                <h5 className="card-title">{b.title}</h5>
                                                {b.authors.length > 1 && (
                                                    <p className="card-text">Authors: {b.authors.join(", ")} <small className="ms-3 text-body-secondary">Published: {b.publishedDate}</small></p>
                                                )}
                                                {b.authors.length === 1 && (
                                                    <p className="card-text">Author: {b.authors} <small className="ms-3 text-body-secondary">Published: {b.publishedDate}</small></p>
                                                )}
                                                <p className="card-text"><small className="text-body-secondary">{b.identifiers.map((i, index) => (
                                                    <span key={index}>
                                                        {i.type.replace("_", "")}: {i.identifier}
                                                        <br />
                                                    </span>
                                                ))}</small></p>
                                            </div>
                                        </Link>
                                    </div>
                                    {ctx.user && (
                                        <div className="col-3 d-flex align-items-center justify-content-center">
                                            {ctx.user.favorites.map(i => i.bookId).includes(b.bookId) ? (
                                                <button className="btn btn-danger" onClick={() => ctx.favoritesHandler(b, "remove")}>Remove from Favorites</button>
                                            ) : (
                                                <button className="btn btn-success" onClick={() => ctx.favoritesHandler(b, "add")}>Add to Favorites</button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
}

export default HomePage;