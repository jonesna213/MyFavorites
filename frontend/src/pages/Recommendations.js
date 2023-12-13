import { useContext, useState } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import noImage from "../assets/Image_not_available.png";
import Loading from "../components/Loading";

const genres = ["Fiction", "Mystery/Thriller", "Science Fiction", "Fantasy", "Romance", "Historical Fiction", "Non-fiction", "Biography/Autobiography", "Self-help", "Horror", "Adventure", "Poetry", "Comedy/Humor", "Drama", "Young Adult (YA)", "Children's", "Crime/Noir", "Business/Finance", "Science/Nature", "Travel"];

const Recommendations = () => {
    const ctx = useContext(Context);
    const [checkedGenres, setCheckedGenres] = useState([]);
    const [checkedFavorites, setCheckedFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

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
                ctx.setRecommendations(data);
            }
            
            setLoading(false);
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
                                <div className="form-check" key={f.bookId}>
                                    <input type="checkbox" className="form-check-input" id={`${f.bookId}Checkbox`} onChange={e => similarChangeHandler(f, e.target.checked)} />
                                    <label className="form-check-label" htmlFor={`${f.bookId}Checkbox`}>{f.title}</label>
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                            <p className="text-decoration-underline">Genre:</p>
                            <div className="row">
                                <div className="col-6">
                                    {genres.slice(0, Math.ceil(genres.length / 2)).map(g => (
                                        <div className="form-check" key={g}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`${g}Checkbox`}
                                                onChange={e => genreChangeHandler(g, e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor={`${g}Checkbox`}>{g}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-6">
                                    {genres.slice(Math.ceil(genres.length / 2)).map(g => (
                                        <div className="form-check" key={g}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`${g}Checkbox`}
                                                onChange={e => genreChangeHandler(g, e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor={`${g}Checkbox`}>{g}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary mt-4">Get Recommendations</button>
                    </form>
                </div>
            </section>
            <section className="col d-flex flex-column align-items-center">
                <h4 className="text-decoration-underline text-center">Recommendations</h4>
                {ctx.recommendations.length > 0 && (
                    <ul>
                        {ctx.recommendations.map(b => (
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
                                                <p className="card-text"><small className="text-body-secondary">{b.identifiers.map((i, index) => (
                                                    <span key={index}>
                                                        {i.type.replace("_", "")}: {i.identifier}
                                                        <br />
                                                    </span>
                                                ))}</small></p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {loading && (
                    <Loading />
                )}
                {!loading && ctx.recommendations.length <= 0 && (
                    <p className="mt-4">Select criteria and press the button to get some recommendations</p>
                )}
            </section>
        </div>
    );
}

export default Recommendations;