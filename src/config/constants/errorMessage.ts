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

export const accountCreationSchema = yup.object().shape({
    fName: yup.string().trim()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),

    lName: yup.string().trim()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),

    phoneNumber: yup.string().trim()
        .required('Phone number is required')
        .matches(/^\+?[0-9]{10,15}$/, 'Phone number is not valid'),

    password: yup.string().trim().required('password field is required')
        .matches(/^.{8,}$/, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number'),
    confirmPassword: yup.string().trim()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    profileImg: yup.object()
        .shape({
            path: yup.string().required()
                .required('Profile image is required'),
        })
});

export const jobPostValidationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required').min(20, 'minmum 20 characters Description'),
    // paymentMethod: yup.string().required('Payment method is required'),
    // category: yup.string().required('Category is required'),
    areaSize: yup.number()
        .typeError('Area size must be a number')
        .min(1, 'Area size must be greater than 0')
        .required('Area size is required'),
    // areaType: yup.string().required('Area type is required'),
    startDate: yup.date()
        .required('Start date is required')
        .typeError('Invalid date format'),
    endDate: yup.date()
        .required('End date is required')
        .typeError('Invalid date format')
        .min(yup.ref('startDate'), 'End date must be after start date'),
    materials: yup.string().required('Materials information is required'),
    locationDescp: yup.string().required('location Descrption is required'),
    // budget: yup.number()
    //   .typeError('Budget must be a number')
    //   .min(1, 'Budget must be greater than 0')
    //   .required('Budget is required'),
    images: yup.array()
        .of(yup.mixed())
        .min(1, 'At least one image is required')
});


