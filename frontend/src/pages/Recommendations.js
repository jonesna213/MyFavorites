import { useContext, useState } from "react";
import { Context } from "../store/Context";

const genres = ["Mystery", "Science Fiction"];


const Recommendations = () => {
    const ctx = useContext(Context);
    const [recommendations, setRecommendations] = useState([{ title: "test1" }, { title: "test2" }, { title: "test3" }]);
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

    const handleSubmit = event => {
        event.preventDefault();
        
        if (checkedFavorites.length === 0 && checkedGenres.length === 0) {
            //do random book
        } else { 
            
        }
    }

    return (
        <div className="row my-5 mx-3">
            <section className="col">
                <h4 className="text-decoration-underline">Criteria</h4>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-4">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="randomRadio" name="recommendationType" defaultChecked />
                                <label className="form-check-label" htmlFor="randomRadio">Random</label>
                            </div>
                        </div>
                        <p className="fw-bold">OR</p>
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
                        {recommendations.map(r => (
                            <li className="">{r.title}</li>
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