import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import noImage from "../assets/Image_not_available.png";

const Details = () => {
    const { item } = useLoaderData();
    console.log(item);
    return (
        <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Await resolve={item}>
                {item.errorMessage ? (
                    <h4 className="text-center text-danger py-5">{item.errorMessage}</h4>
                ) : (
                    <>
                        <Link to={`/#${item.id}`} className="btn btn-secondary px-4 my-3">Back</Link>
                        <div className="row my-3">
                            <div className="col">
                                <h2 className="mb-3">{item.title}</h2>
                                <img className="img-fluid" src={item.imageLinks.small.replace("http", "https") || item.imageLinks.thumbnail.replace("http", "https")} alt={`Cover for ${item.title}`} />
                            </div>
                            <div className="col my-5">
                                <div className="my-5">
                                    <p className="fw-bolder">{item.authors.length > 1 ? item.authors.join(", ") : item.authors}</p>
                                    <p>Published: {item.publishedDate}</p>
                                    <p>Publisher: {item.publisher}</p>
                                    <p>{item.pageCount} pages</p>
                                    {item.identifiers.map(i => {
                                        return <p className="small mb-0">
                                            {i.type.replace("_", "")} - {i.identifier}
                                        </p>
                                    })}
                                    <a className="btn btn-primary" href={item.googleLink} target="_blank" rel="noreferrer">Buy on Google Play</a>
                                </div>
                            </div>
                        </div>
                        {item.description && (
                            <div className="row">
                                <div className="col">
                                    <h4>Description:</h4>
                                    {parse(item.description)}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Await>
        </Suspense>
    );
}

export default Details;

/**
 * Takes the id of a item and searches for it in the api
 * 
 * @param {number} id 
 * @returns either and object of the item or a object containing an error message
 */
const loadItem = async id => {
    const searchId = id.split("=")[1];

    try {
        const result = await fetch(`https://www.googleapis.com/books/v1/volumes/${searchId}`);

        const resData = await result.json();

        console.log(resData);

        if (result.ok) {
            const item = {
                id: resData.id,
                kind: "book",
                authors: [...resData.volumeInfo.authors || []],
                pageCount: resData.volumeInfo.pageCount,
                imageLinks: { ...resData.volumeInfo.imageLinks },
                identifiers: resData.volumeInfo.industryIdentifiers || [],
                publishedDate: resData.volumeInfo.publishedDate,
                publisher: resData.volumeInfo.publisher,
                description: resData.volumeInfo.description,
                title: resData.volumeInfo.title,
                googleLink: resData.volumeInfo.infoLink
            };

            if (!item.imageLinks.small && !item.imageLinks.thumbnail) {
                item.imageLinks.small = noImage;
            }

            console.log(item.imageLinks);
            return item;
        } else {
            return { errorMessage: "Could not fetch details for selected item." };
        }

    } catch (err) {
        console.log(err);
        return { errorMessage: "An error occurred, please try again later." };
    }
}

/**
 * Loader for the details page. Gets required params and calls the loadItem function.
 * 
 * @param {*} params 
 * @returns an object containing the item and search term
 */
export const loader = async ({ req, params }) => {
    const id = params.id;

    return defer({
        item: await loadItem(id)
    });
}