import styles from "./css/Home.module.css";

const HomePage = () => {
    const submitHandler = event => {
        event.preventDefault();
        const searchTerm = event.target.searchTerm.value;

        console.log(searchTerm);
    }

    return (
        <>
            <section>
                <form onSubmit={submitHandler} className={`mx-auto w-75 row ${styles.form}`}>
                    <div className="col-8">
                        <input type="text" className="form-control" id="searchTerm" name="searchTerm" placeholder="What are you looking for?" required />
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary px-5 py-2">Search</button>
                    </div>
                </form>
            </section>


            <section>
                <h1 className="text-center text-decoration-underline">Top favorites this week</h1>

                <ul className="w-75 mx-auto my-5 text-center list-unstyled">
                   <li className="border rounded mx-auto py-1 w-75">Favorite #1 <a className="d-inline-block ms-5 border border-2 rounded bg-light p-1 text-decoration-none text-dark" href="/details?itemId=1">Details</a></li> 
                </ul>
            </section>
        </>
    );
}

export default HomePage;