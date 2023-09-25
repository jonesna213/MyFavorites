import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";

const HomePage = () => {
    const [error, setError] = useState();
    const [searching, setSearching] = useState();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [totalItems, setTotalItems] = useState();
    let startIndex = 0;

    const submitHandler = async event => {
        event.preventDefault();
        setSearching(true);
        setError(false);

        const searchTerm = search.trim().replace(" ", "%20");

        const searchType = "intitle"; //get from dropdown thing
        const maxResults = 20;


        try {
            const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchType}:${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`);

            const resData = await result.json();

            //console.log(resData);

            if (result.ok) {
                setTotalItems(resData.totalItems);
                setSearchResults(resData.items.map(i => {
                    const isbn10 = i.volumeInfo.industryIdentifiers.find(i => {
                        return i.type === "ISBN_10"
                    });

                    const isbn13 = i.volumeInfo.industryIdentifiers.find(i => {
                        return i.type === "ISBN_13"
                    });

                    return {
                        id: i.id,
                        kind: "book",
                        selfLink: i.selfLink,
                        authors: [...i.volumeInfo.authors],
                        imageLinks: { ...i.volumeInfo.imageLinks },
                        isbn10: isbn10.identifier || "",
                        isbn13: isbn13.identifier || "",
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
                <form onSubmit={submitHandler} className={`mx-auto w-75 row ${styles.form}`}>
                    {error && <p className="text-center text-danger mb-5">An error has occurred. Please try again later, we are sorry for the inconvenience.</p>}

                    <div className="col-8">
                        <input type="text" className="form-control" id="searchTerm" name="searchTerm" placeholder="What are you looking for?" value={search} onChange={e => setSearch(e.target.value)} />
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
                            <Link to={`/details/id=${b.id}`} className="text-decoration-none">
                                <li className="card w-100 my-3" key={b.id}>
                                    <div className="row">
                                        <div className="col-4">
                                            <img className="img-fluid rounded-start" src={b.imageLinks.thumbnail} alt={`Thumbnail for ${b.title}`} />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{b.title}</h5>
                                                {b.authors.length > 1 ? (
                                                    <p className="card-text">Authors: {b.authors.join(", ")} <small className="ms-3 text-body-secondary">Published: {b.publishedDate}</small></p>
                                                ) : (
                                                    <p className="card-text">Author: {b.authors} <small className="ms-3 text-body-secondary">Published: {b.publishedDate}</small></p>
                                                )}
                                                <p className="card-text"><small className="text-body-secondary">ISBN: <br /> {b.isbn10}<br />{b.isbn13}</small></p>
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
                        <li className="border rounded mx-auto py-1 w-75">Favorite #1 <a className="d-inline-block ms-5 border border-2 rounded bg-light p-1 text-decoration-none text-dark" href="/details?itemId=1">Details</a></li>
                    </ul>
                </section>
            )}
        </>
    );
}

export default HomePage;