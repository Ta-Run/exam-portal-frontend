import { useState } from "react";

// export function useHandleBlur() {

//     const [error, setError] = useState("");

//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         if (name === "contactNo" && value.length !== 10) {
//             setError("Contact number must be exactly 10 digits.");
//         } else {
//             setError("");
//         }
//     }

//     return {
//         error, handleBlur
//     }
// }

// export function useHandleInput() {

//     const [error, setError] = useState("");

//     const handleInput = (e) => {
//         const { value } = e.target;
//         if (value.length > 10) {
//             e.target.value = value.slice(0, 10);
//         }
//         if (value.length === 10) {
//             setError("");
//         }
//     }

//     return {
//         error, handleInput,
//     };
// }

export function useFormValidation() {
    const [error, setError] = useState("");

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if ((name === "contactNo" || name === "mobileNo" || name === "ContactNumber") && value.length !== 10) {
            setError("Contact number must be exactly 10 digits.");
        } else {
            setError("");
        }
    }

    const handleInput = (e) => {
        const { maxLength, value } = e.target;
        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength);
        }
        if (value.length === 10) {
            setError("");
        }
    }

    return {
        error,
        setError,
        handleBlur,
        handleInput
    };
}
