import { useState } from "react";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";

const SignUp = () => {
    const [creatingAccountMessage, setCreatingAccountMessage] = useState(false);
    const [error, setError] = useState(false);
    const [accountExists, setAccountExists] = useState(false);
    const navigate = useNavigate();

    const { 
        value: name,
        isValid: nameIsValid, 
        hasError: nameHasError, 
        valueChangeHandler: nameChangeHandler, 
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput 
    } = useInput(value => value.trim() !== "");

    const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes("@"));

    const { 
        value: password,
        isValid: passwordIsValid, 
        hasError: passwordHasError, 
        valueChangeHandler: passwordChangeHandler, 
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput 
    } = useInput(value => value.trim().length >= 5);

    const { 
        value: confirmPassword,
        isValid: confirmPasswordIsValid, 
        hasError: confirmPasswordHasError, 
        valueChangeHandler: confirmPasswordChangeHandler, 
        inputBlurHandler: confirmPasswordBlurHandler,
        reset: resetConfirmPasswordInput 
    } = useInput(value => value.trim() === password.trim());

    let formIsValid = false;

    if (nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
    }

    const submitHandler = async event => {
        event.preventDefault();
        setCreatingAccountMessage(true);
        setError(false);
        setAccountExists(false);

        if (!formIsValid) {
            return;
        }

        try {
            const result = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    confirmPassword
                })
            });
    
            if (result.ok) {
                navigate("/signin");
            } else {
                setAccountExists(true);
                setCreatingAccountMessage(false);
                return;
            }

            setCreatingAccountMessage(false);
        
            resetNameInput();
            resetEmailInput();
            resetPasswordInput();
            resetConfirmPasswordInput();
    
        } catch (err) {
            setError(true);
            setCreatingAccountMessage(false);
            return;
        }
    }   

    return (
        <div className="container">
            <h1 className="mt-5 fw-bold text-center">Sign Up</h1>

            {creatingAccountMessage && <p className="text-secondary mt-5 text-center fw-bold">Creating your account...</p>} 
            {accountExists && <p className="text-danger mt-5 text-center fw-bold">An account with this email already exists.</p>}
            {error && <p className="text-danger mt-5 text-center fw-bold">An error occurred while creating your account. Please try again later. Sorry for the inconvenience.</p>}

            <form onSubmit={submitHandler} className="mx-auto border rounded py-4 px-5 my-5 shadow w-75">
                <div className="my-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input type="text" className="form-control bg-light" id="name" name="name" placeholder="Enter your name" onChange={nameChangeHandler} onBlur={nameBlurHandler} value={name} required />
                    {nameHasError && <p className='text-danger'>Please enter your name.</p>}
                </div>
                <div className="my-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" className="form-control bg-light" id="email" name="email" placeholder="Enter your email" onChange={emailChangeHandler} onBlur={emailBlurHandler} value={email} required />
                    {emailHasError && <p className='text-danger'>Please enter a valid email.</p>}
                </div>

                <div className="my-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control bg-light" id="password" name="password" placeholder="Enter your password" onChange={passwordChangeHandler} onBlur={passwordBlurHandler} value={password} required />
                    {passwordHasError && <p className='text-danger'>Please enter a valid password. (at least 5 characters)</p>}
                </div>
                <div className="my-3">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control bg-light" id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" onChange={confirmPasswordChangeHandler} onBlur={confirmPasswordBlurHandler} value={confirmPassword} required />
                    {confirmPasswordHasError && <p className='text-danger'>Your passwords much match.</p>}
                </div>
                <button type="submit" className="btn btn-primary px-5 py-2 my-3">Create Account</button>
            </form>
        </div>
    );
}

export default SignUp;