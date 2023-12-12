import { useContext, useState } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import noImage from "../assets/Image_not_available.png";

const genres = ["Mystery", "Science Fiction"];

const Recommendations = () => {
    const ctx = useContext(Context);
    const [recommendations, setRecommendations] = useState([]);
    const [checkedGenres, setCheckedGenres] = useState([]);
    const [checkedFavorites, setCheckedFavorites] = useState([]);

    const similarChangeHandler = (book, checked) => {
        let updatedCheckedFavorites = checkedFavorites;

        if (checked) {
            updatedCheckedFavorites.push(book);
        } else {
            updatedCheckedFavorites = updatedCheckedFavorites.filter(f => f.bookId !== book.bookId);
        }

        setCheckedFavorites(updatedCheckedFavorites);
    }

    const genreChangeHandler = (genre, checked) => {
        let updatedCheckedGenres = checkedGenres;

        if (checked) {
            updatedCheckedGenres.push(genre);
        } else {
            updatedCheckedGenres = updatedCheckedGenres.filter(g => g !== genre);
        }

        setCheckedGenres(updatedCheckedGenres);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const result = await fetch("http://localhost:8080/recommendations/getRecommendations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + ctx.user.token
                },
                body: JSON.stringify({
                    criteria: {
                        similarities: checkedFavorites,
                        genres: checkedGenres
                    }
                })
            });

            const data = await result.json();

            if (result.ok) {
                setRecommendations(data);
            }

            return;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    return (
        <div className="row my-5 mx-3">
            <section className="col-4">
                <h4 className="text-decoration-underline">Criteria</h4>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-4">
                            <p className="text-decoration-underline">Similar to:</p>
                            {ctx.user.favorites.map(f => (
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="similarCheckbox1" onChange={e => similarChangeHandler(f, e.target.checked)} />
                                    <label className="form-check-label" htmlFor="similarCheckbox1">{f.title}</label>
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                            <p className="text-decoration-underline">Genre:</p>
                            {genres.map(g => (
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id={`${g}Checkbox`} onChange={e => genreChangeHandler(g, e.target.checked)} />
                                    <label className="form-check-label" htmlFor={`${g}Checkbox`}>{g}</label>
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="btn btn-primary mt-4">Get Recommendations</button>
                    </form>
                </div>
            </section>
            <section className="col">
                <h4 className="text-decoration-underline">Recommendations</h4>
                {recommendations.length > 0 ? (
                    <ul>
                        {recommendations.map(b => (
                            <li className="card w-100 my-3" key={b.bookId} id={b.bookId}>
                                <div className="row">
                                    <div className="col-3">
                                        <img className="img-fluid rounded-start" src={b.imageLink || noImage} alt={`Thumbnail for ${b.title}`} />
                                    </div>
                                    <div className="col-6">
                                        <Link to={`/details/${b.bookId}/recommendations`} className="text-decoration-none text-black">
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
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4">Select criteria and press the button to get some recommendations</p>
                )}
            </section>
        </div>
    );
}

export default Recommendations;