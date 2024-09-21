import * as Yup from 'yup';

export const loginFormSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is Required")
});