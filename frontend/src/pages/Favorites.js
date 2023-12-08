import { useContext } from "react";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";
import noImage from "../assets/Image_not_available.png";

const Favorites = () => {
    const ctx = useContext(Context);

    return (
        <section>
            {ctx.user.favorites.length > 0 ? (
                <>
                    <h1 className="text-center my-3">Your Favorites</h1>
                    <ul className="my-5">
                        {ctx.user.favorites.map(b => (
                            <li className="card w-75 mx-auto my-3" key={b.bookId}>
                                <div className="row">
                                    <div className="col-3">
                                        <img className="img-fluid rounded-start" src={b.imageLink || noImage} alt={`Thumbnail for ${b.title}`} />
                                    </div>
                                    <div className="col-6">
                                        <Link to={`/details/${b.bookId}/favorites`} className="text-decoration-none text-black" id={b.bookId}>
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
                                    <div className="col-3 d-flex align-items-center justify-content-center">
                                        <button className="btn btn-danger" onClick={() => ctx.favoritesHandler(b, "remove")}>Remove from Favorites</button>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="text-danger my-3 text-center fs-5">You have nothing in your favorites list yet. <br /> Go favorite some stuff!</p>
            )}

        </section>
    );
}

export default Favorites;