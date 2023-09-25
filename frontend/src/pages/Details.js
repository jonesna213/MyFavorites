import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router";

const Details = () => {
    const { item } = useLoaderData();

    return (
        <>
            <Suspense fallback={<p className="text-center">Loading...</p>}>
                <Await resolve={item}>
                    {(loadedItem => (
                        <>
                            <h1>{loadedItem.title}</h1>
                        </>
                    ))}
                </Await>
            </Suspense>
        </>
    );
}

export default Details;

const loadItem = async id => {
    try {
        const result = await fetch(`https://www.googleapis.com/books/v1/volumes/mvmGPgAACAAJ`);

        const resData = await result.json();


        if (result.ok) {
            return resData;
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