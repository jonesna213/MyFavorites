import { useState } from "react";

const SignIn = props => {
    const [loggingInMessage, setLoggingInMessage] = useState(false);
    const [error, setError] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState(false);

    const submitHandler = async event => {
        event.preventDefault();
        setLoggingInMessage(true);
        setUnexpectedError(false);
        const password = event.target.password.value;
        const email = event.target.email.value;

        const response = await props.onSignIn(email, password);
        if (response === "Invalid Credentials.") {
            setLoggingInMessage(false);
            setError(true);
        } else if (response) {
            setLoggingInMessage(false);
            window.location.href = "/";         //Maybe replace later. ran into problem with navigation not updating. this solves it though.
        } else {
            setLoggingInMessage(false);
            setUnexpectedError(true);
        }
    }

    return (
        <div className="container">
            <h1 className="mt-5 fw-bold text-center">Sign In</h1>

            {loggingInMessage && <p className="text-secondary mt-5 text-center fw-bold">Signing you in...</p>}
            {error && <p className="text-danger mt-5 text-center fw-bold">Your email or password is incorrect!</p>}
            {unexpectedError && <p className="text-danger mt-5 text-center fw-bold">An unexpected error occurred while logging you in, please try again later. <br /> Sorry for the inconvenience.</p>}

            <form onSubmit={submitHandler} className="mx-auto border rounded py-4 px-5 my-5 shadow w-75">
                <div className="my-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" className="form-control bg-light" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="my-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control bg-light" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary px-5 py-2 my-3">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;