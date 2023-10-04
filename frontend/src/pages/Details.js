import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Details = () => {
    const { item } = useLoaderData();
    console.log(item);
    return (
        <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Await resolve={item}>
                {item.errorMessage ? (
                    <h4 className="text-center text-danger py-5">{item.message}</h4>
                ) : (
                    <>
                        <Link to="/" className="btn btn-secondary px-4 my-3">Back</Link>
                        <div className="row my-3">
                            <div className="col">
                                <h2 className="mb-3">{item.title}</h2>
                                <img className="img-fluid" src={item.imageLinks.small || item.imageLinks.thumbnail} alt={`Cover for ${item.title}`} />
                            </div>
                            <div className="col my-5">
                                <div className="my-5">
                                    <p className="fw-bolder">{item.authors.length > 1 ? item.authors.join(", ") : item.authors}</p>
                                    <p>{item.publishedDate}, {item.publisher}</p>
                                    <p>{item.pageCount} pages</p>
                                    {item.isbn10 !== "" && (
                                        <p className="small mb-0">ISBN-10 - {item.isbn10}</p>
                                    )}
                                    <p className="small mt-0">ISBN-13 - {item.isbn13}</p>
                                    <a className="btn btn-primary" href={item.googleLink} target="_blank" rel="noreferrer">Buy on Google Play</a>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <h4>Description:</h4>
                                {parse(item.description)}
                            </div>
                        </div>
                    </>
                )}

            </Await>
        </Suspense>
    );
}

export default Details;

const loadItem = async id => {
    const searchId = id.split("=")[1];

    try {
        const result = await fetch(`https://www.googleapis.com/books/v1/volumes/${searchId}`);

        const resData = await result.json();

        console.log(resData);

        if (result.ok) {
            const isbn10 = resData.volumeInfo.industryIdentifiers.find(i => {
                return i.type === "ISBN_10"
            });

            const isbn13 = resData.volumeInfo.industryIdentifiers.find(i => {
                return i.type === "ISBN_13"
            });

            const item = {
                id: resData.id,
                kind: "book",
                authors: [...resData.volumeInfo.authors],
                pageCount: resData.volumeInfo.pageCount,
                imageLinks: { ...resData.volumeInfo.imageLinks },
                isbn10: isbn10.identifier || "",
                isbn13: isbn13.identifier || "",
                publishedDate: resData.volumeInfo.publishedDate,
                publisher: resData.volumeInfo.publisher,
                description: resData.volumeInfo.description,
                title: resData.volumeInfo.title,
                googleLink: resData.volumeInfo.infoLink
            };

            return item;
        } else {
            return { errorMessage: "Could not fetch details for selected item." };
        }

    } catch (err) {
        console.log(err);
        return { errorMessage: "An error occurred, please try again later." };
    }
}

export const loader = async ({ req, params }) => {
    const id = params.id;


    return defer({
        item: await loadItem(id)
    });
}