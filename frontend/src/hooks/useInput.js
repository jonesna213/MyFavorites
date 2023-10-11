import { useState } from "react";

/**
 * This hook takes the value you want validated and creates states and handlers for the input
 * 
 * @param {*} validateValue 
 * @returns an object of values and handlers
 */
const useInput = (validateValue) => {
    const [value, setValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        setValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setValue("");
        setIsTouched(false);
    }

    return {
        value: value,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler,
        reset: reset
    };
}

export default useInput;