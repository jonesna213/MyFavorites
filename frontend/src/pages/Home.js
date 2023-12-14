import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";
import noImage from "../assets/Image_not_available.png";
import { Context } from "../store/Context";

const HomePage = () => {
    const [error, setError] = useState();
    const [searching, setSearching] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const maxResults = 15;

    const ctx = useContext(Context);

    /**
     * Runs when the search button is clicked. Takes input then searches api with the passed in search term.
     * 
     * @param {*} event default event object from form
     * @returns technically nothing but, sets the required states
     */
    const searchHandler = async event => {
        event.preventDefault();

        callGoogleApi();
    }

    const handlePagination = async direction => {
        if (direction === "Back") {
            ctx.setSearchResults([]);
            setStartIndex(startIndex - maxResults);

            await callGoogleApi();

            setCurrentPage(currentPage - 1);
        } else if (direction === "Next") {
            ctx.setSearchResults([]);
            setStartIndex(startIndex + maxResults);

            await callGoogleApi();

            setCurrentPage(currentPage + 1);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const callGoogleApi = async () => {
        setSearching(true);
        setError(false);

        try {
            const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${ctx.searchType}:${ctx.searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`);

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
            } else {
                setSearching(false);
                setError(true);
            }
        } catch (err) {
            console.log(err);
            setSearching(false);
            setError(true);
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
                    <div className="col">
                        <select className="form-select" onChange={e => ctx.setSearchType(e.target.value)}>
                            <option selected value="intitle">Title</option>
                            <option value="inauthor">Author</option>
                            <option value="inpublisher">Publisher</option>
                            <option value="subject">Subject</option>
                            <option value="isbn">ISBN</option>
                        </select>
                    </div>
                    <div className="col">
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
                    <div className="d-flex align-items-center justify-content-center my-3">
                        {currentPage > 1 && (
                            <button className="btn btn-secondary" onClick={() => handlePagination("Back")}>Back</button>
                        )}
                        <p className="my-1 mx-3">{currentPage}-{Math.ceil(ctx.totalItems / maxResults)}</p>
                        <button className="btn btn-secondary" onClick={() => handlePagination("Next")}>Next</button>
                    </div>
                </section>
            )}
        </>
    );
}

export default HomePage;