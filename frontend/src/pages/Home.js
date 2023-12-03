import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";
import noImage from "../assets/Image_not_available.png";

const HomePage = ({ searchTerm, updateSearchTerm, searchResults, updateSearchResults, totalItems, updateTotalItems }) => {
    const [error, setError] = useState();
    const [searching, setSearching] = useState();
    let startIndex = 0;

    /**
     * Runs when the search button is clicked. Takes input then searches api with the passed in search term.
     * 
     * @param {*} event 
     * @returns technically nothing but, sets the required states
     */
    const searchHandler = async event => {
        if (event) {
            event.preventDefault();
        }
        setSearching(true);
        setError(false);

        const search = searchTerm.trim().replace(" ", "%20");

        const searchType = "intitle"; //get from dropdown thing
        const maxResults = 20;

        try {
            const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchType}:${search}&startIndex=${startIndex}&maxResults=${maxResults}`);

            const resData = await result.json();

            console.log(resData);

            if (result.ok) {
                updateTotalItems(resData.totalItems);
                updateSearchResults(resData.items.map(i => {

                    let imageLink;
                    if (!i.volumeInfo.imageLinks || !i.volumeInfo.imageLinks.thumbnail) {
                        imageLink = noImage;
                    } else {
                        imageLink = i.volumeInfo.imageLinks.thumbnail
                    }

                    return {
                        id: i.id,
                        kind: "book",
                        selfLink: i.selfLink,
                        authors: [...i.volumeInfo.authors || []],
                        imageLink,
                        identifiers: i.volumeInfo.industryIdentifiers || [],
                        publishedDate: i.volumeInfo.publishedDate,
                        title: i.volumeInfo.title
                    };
                }));

                console.log(searchResults);

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

    const addFavoriteHandler = () => {

    }

    return (
        <>
            <section>
                <form onSubmit={searchHandler} className={`mx-auto w-75 row ${styles.form}`}>
                    {error && <p className="text-center text-danger mb-5">An error has occurred. Please try again later, we are sorry for the inconvenience.</p>}

                    <div className="col-8">
                        <input type="text" className="form-control" id="searchTerm" name="searchTerm" placeholder="What are you looking for?" value={searchTerm} onChange={e => updateSearchTerm(e.target.value)} />
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary px-5 py-2">Search</button>
                    </div>

                    {searching && <p className="text-center text-secondary mt-5">Searching...</p>}
                </form>
            </section>

            {searchResults.length > 0 ? (
                <section>
                    <p>Total items found: {totalItems}</p>
                    <ul>
                        {searchResults.map(b => (
                            <Link to={`/details/id=${b.id}`} className="text-decoration-none" key={b.id} id={b.id}>
                                <li className="card w-100 my-3">
                                    <div className="row">
                                        <div className="col-4">
                                            <img className="img-fluid rounded-start" src={b.imageLink} alt={`Thumbnail for ${b.title}`} />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{b.title}</h5>
                                                {b.authors.length > 1 && (
                                                    <p className="card-text">Authors: {b.authors.join(", ")} <small className="ms-3 text-body-secondary">Published: {b.publishedDate}</small></p>
                                                )}
                                                {b.authors.length === 1 && (
                                                    <p className="card-text">Author: {b.authors} <small className="ms-3 text-body-secondary">Published: {b.publishedDate}</small></p>
                                                )}
                                                <p className="card-text"><small className="text-body-secondary">{b.identifiers.map(i => {
                                                    return <>
                                                        {i.type.replace("_", "")}: {i.identifier}
                                                        <br />
                                                    </>
                                                })}</small></p>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            </Link>
                        ))}
                    </ul>
                </section>
            ) : (
                <section>
                    <h1 className="text-center text-decoration-underline">Top favorites this week</h1>

                    <ul className="w-75 mx-auto my-5 text-center list-unstyled">
                        <li className="border rounded mx-auto py-1 w-75">Favorite #1 <a className="d-inline-block ms-5 border border-2 rounded bg-light p-1 text-decoration-none text-dark" href="/details/id=1">Details</a></li>
                    </ul>
                </section>
            )}
        </>
    );
}

export default HomePage;