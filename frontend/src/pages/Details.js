import { useParams } from "react-router";

const Details = () => {
    const params = useParams();

    return <h1>Book id: {params.id}</h1>
}

export default Details;