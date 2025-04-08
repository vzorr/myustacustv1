import React, { useState } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AccountBasicInfoUi from './AccountBasicInfoUi'
import { Formik } from 'formik'

const AccountBasicInfo: React.FC<UserNavigationRootProps<"AccountBasicInfo">> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = async (value: any) => {
        console.log("value", value)
    }
    return (
        <Formik
            initialValues={{
                emailOrPhone: '',
                password: ''
            }}
            onSubmit={async (values: any, { resetForm }) => {
                setIsLoading(true)
                let res = await onSubmit(values)
                setIsLoading(false)

            }}
        // validationSchema={}

        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <AccountBasicInfoUi
                    navigation={props.navigation}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    values={values}
                    errors={errors}
                    touched={touched}
                />
            )}
        </Formik>
    )
}

export default AccountBasicInfo
