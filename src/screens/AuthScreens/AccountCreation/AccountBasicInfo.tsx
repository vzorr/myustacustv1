import React, { useState } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AccountBasicInfoUi from './AccountBasicInfoUi'
import { Formik } from 'formik'
import { accountCreationSchema } from '../../../config/constants/errorMessage'
import { useDispatch } from 'react-redux'
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer'

const AccountBasicInfo: React.FC<UserNavigationRootProps<"AccountBasicInfo">> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const onSubmit = async (values: any) => {
        // console.log("value", values)
        dispatch(setAccountCreation(values))
        props.navigation.navigate('LocationsAndPreferences');
        return
    }
    return (
        <Formik
            initialValues={{
                fName: "",
                lName: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                profileImg: {
                    path: ""
                },
                location: [],
                category: [],
                notificationViaEmail: false,
                notificationViaSMS: false,
                notificationViaApp: false,
                termsAndConditions: false,
                notificationPreferences: []
            }}
            onSubmit={async (values: any, { resetForm }) => {
                setIsLoading(true)
                let res = await onSubmit(values)
                setIsLoading(false)

            }}
            validationSchema={accountCreationSchema}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <AccountBasicInfoUi
                    navigation={props.navigation}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                />
            )}
        </Formik>
    )
}

export default AccountBasicInfo
