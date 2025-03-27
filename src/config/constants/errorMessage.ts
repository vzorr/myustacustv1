import * as yup from 'yup';

export const logInSchema = yup.object().shape({
    emailOrPhone: yup.string().trim()
        .required('This field is required')
        .test('email-or-phone', 'Enter a valid email or phone number', function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10,15}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    password: yup.string().trim().required('password field is required')
        .min(6, 'Too short')
        .max(20, 'Too long'),
});
export const SigUpSchema = yup.object().shape({
    emailOrPhone: yup.string().trim()
        .required('This field is required')
        .test('email-or-phone', 'Enter a valid email or phone number', function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10,15}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
});
export const ChangePasswordSchema = yup.object().shape({
    password: yup.string().trim().required('password field is required')
        .min(6, 'Too short')
        .max(20, 'Too long'),
    // password: yup.string().trim().required('password field is required')
    //     .matches(/^.{8,}$/, 'Password must be at least 8 characters long')
    //     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    //     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    //     .matches(/\d/, 'Password must contain at least one number'),
    confirmPassword: yup.string().trim().required('confirmPassword field is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
});


