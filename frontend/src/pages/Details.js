import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router";
import parse from "html-react-parser";

const Details = () => {
    const { item } = useLoaderData();
    console.log(item);
    return (
        <>
            <Suspense fallback={<p className="text-center">Loading...</p>}>
                <Await resolve={item}>
                    <div className="row mt-5">
                        <div className="col">
                            <h2 className="mb-3">{item.title}</h2>
                            <img className="img-fluid" src={item.imageLinks.small ? item.imageLinks.small : item.imageLinks.thumbnail} alt={`Cover for ${item.title}`} />
                        </div>
                        <div className="col">
                            <h4>Description:</h4>
                            {parse(item.description)}
                        </div>
                    </div>
                </Await>
            </Suspense>
        </>
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
                title: resData.volumeInfo.title
            };

            return item;
        } else {
            throw json({ message: "Could not fetch details for selected item." }, { status: 500 });
        }

    } catch (err) {
        console.log(err);
        throw json({ message: "An error occurred, please try again later." }, { status: 500 });
    }
}

export const loader = async ({ req, params }) => {
    const id = params.id;


    return defer({
        item: await loadItem(id)
    });
}