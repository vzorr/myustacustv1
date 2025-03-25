import * as yup from 'yup';

export const logInSchema = yup.object().shape({
    email: yup.string().trim()
        .required('email field is required').email("email is not correct"),
    password: yup.string().trim().required('password field is required')
        .min(6, 'Too short')
        .max(20, 'Too long'),
});
export const SigUpSchema = yup.object().shape({
    email: yup.string().trim()
        .required('email field is required').email("email is not correct"),
    // fullName: yup.string().trim()
    //     .required('fullname field is required')
    //     .min(2, 'Too short')
    //     .max(50, 'Too long'),
    // password: yup.string().trim().required('password field is required')
    //     .min(8, 'Too short')
    //     .max(30, 'Too long'),
    // // termsandConditions: yup.boolean().oneOf([true], "accept terms and conditions are required"),
});


