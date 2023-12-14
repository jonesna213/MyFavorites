import { useContext, useState } from "react";
import { Context } from "../store/Context";
import { useNavigate } from "react-router";

const SignIn = () => {
    const [loggingInMessage, setLoggingInMessage] = useState(false);
    const [error, setError] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState(false);
    const navigate = useNavigate();
    const ctx = useContext(Context);

    /**
     * For logging the user in. Takes the inputs and calls the backend api.
     * 
     * @param {*} event 
     * @returns technically nothing but, sets the required states or reroutes the page.
     */
    const submitHandler = async event => {
        event.preventDefault();
        setLoggingInMessage(true);
        setUnexpectedError(false);
        setError(false);
        const password = event.target.password.value;
        const email = event.target.email.value;

        try {
            const result = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const resData = await result.json();

            if (result.ok) {
                setLoggingInMessage(false);

                const user = resData.user;
                user.token = resData.token;
                
                ctx.setUser(user);
                navigate("/");
            } else {
                setLoggingInMessage(false);
                setError(true);
            }

        } catch (err) {
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