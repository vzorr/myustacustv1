import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import accountScreensStyles from '../../../styles/accountScreensStyles';
import { SVGIcons } from '../../../config/constants/svg';
import { COLORS, SIZES } from '../../../config/themes/theme';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import CustomSelector from '../../../components/Selector/CustomSelector';
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import CustomDropDown from '../../../components/DropDown/CustomDropDown';
import CustomButton from '../../../components/Buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { client, client1, ClientFormData } from '../../../apiManager/Client';
import VisibleLoader from '../../../components/Loader/VisibleLoader';
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';


const NotificationPreferences: React.FC<UserNavigationRootProps<"NotificationPreferences">> = (props) => {
    const { route, navigation } = props
    const isTermsAndConditionsAccepted = route?.params?.isTermsAndConditionsAccepted
    const [selectedNotiiType, setSelectedNotiType] = useState<string[]>([]);
    const [notificationViaEmail, setNotificationViaEmail] = useState(false);
    const [notificationViaSMS, setNotificationViaSMS] = useState(false);
    const [notificationViaApp, setNotificationViaApp] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const { accountCreation }: any = useSelector((state: any) => state?.accountCreation)
    const { token }: any = useSelector((state: any) => state?.accessToken)
    console.log("tokeeeeee", token)
    const notiiType = [
        { key: '1', value: 'App' },
        { key: '2', value: 'Email' },
        { key: '3', value: 'SMS' },
    ];

    const handleTermAndCondition = () => {
        const updateLocationData = {
            ...accountCreation,
            notificationViaEmail: notificationViaEmail,
            notificationViaSms: notificationViaSMS,
            notificationViaApp: notificationViaApp,
        }
        dispatch(setAccountCreation(updateLocationData))
        navigation.navigate("TermsAndConditions")
    }

    const handleBack = () => {
        navigation.goBack()
    }
    const handleCompleteSetup = async () => {
        setIsLoading(true)
        console.log("handle Completeee")
        if (isTermsAndConditionsAccepted) {
            try {
                let filePath = accountCreation.profileImg;
                const actualPath = filePath.path.replace('file://', '');
                const base64String = await RNFS.readFile(actualPath, 'base64');
                const base64Image = `data:image/jpeg;base64,${base64String}`;

                let payload = {
                    basicInfo: {
                        firstName: accountCreation.fName,
                        lastName: accountCreation.lName,
                        phoneNumber: accountCreation.phoneNumber.replace('+', ''),
                        password: accountCreation.password,
                        profilePicture: base64Image
                    },
                    location: accountCreation.location,
                    customerPreferences: accountCreation.category,
                    notificationViaEmail: accountCreation?.notificationViaEmail,
                    // notificationViaSms: accountCreation?.notificationViaSms,
                    notificationViaApp: accountCreation?.notificationViaApp,
                    termsAndConditions: true
                }
                console.log('Base64 Image:', payload);
                const response = await client(token).post("account/customer-creation", payload);
                setIsLoading(false)
                navigation.navigate("SuccessMessage", { screenType: "NotificationPreferences" })
                console.log('Response:', response.data);
            } catch (error: any) {
                setIsLoading(false)
                console.log('Error:', error.response?.data || error.message);
            }
            return
        }
    }
    const getValue = (value: string) => {
        if (value === "App") {
            setNotificationViaApp(!notificationViaApp)
            return
        } else if (value === "Email") {
            setNotificationViaEmail(!notificationViaEmail)
            return
        } else {
            setNotificationViaSMS(!notificationViaSMS)
        }
    }

    const sendFormData = async () => {

    };

    return (
        <SafeAreaView style={accountScreensStyles.container}>
            <View style={{ gap: 24 }}>
                <AccountHeader
                    title="Notifications"
                    subTitle="Set how you’d like to stay updated and finalize your account setup."
                />
                <View style={{ gap: 8 }}>
                    <CustomDropDown
                        data={notiiType}
                        placeholder="Notification Preferences"
                        selectedItems={selectedNotiiType}
                        onSelectionChange={setSelectedNotiType}
                        boxStyles={accountScreensStyles.dropdownBox}
                        getValue={getValue}
                        isMultiSelect
                        isSearch={false}
                        zIndex={1000}
                    />
                    <CustomSelector
                        onPress={handleTermAndCondition}
                        title="Terms & Conditions"
                        iconName="rightArrow"
                    />
                </View>
            </View>

            <View style={{ gap: 16 }}>
                <View style={accountScreensStyles.leftRightButtonContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <SVGIcons.filledLeftButton />
                    </TouchableOpacity>
                    <CustomButton
                        title='Complete Setup'
                        onPress={handleCompleteSetup}
                        style={{
                            width: SIZES.width * 0.42,
                            backgroundColor: !isTermsAndConditionsAccepted ? COLORS.Gray : COLORS.Yellow,
                            borderWidth: !isTermsAndConditionsAccepted ? 1 : 0,
                            borderColor: !isTermsAndConditionsAccepted ? COLORS.inputBorder : "",
                        }}
                        textStyle={{ color: !isTermsAndConditionsAccepted ? COLORS.Black : "", }}
                    />
                </View>

                <View style={accountScreensStyles.StatusBarContainer}>
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                    <ProgressBar backgroundColor={COLORS.Yellow} />
                </View>
            </View>
            {isLoading &&
                <VisibleLoader />
            }
        </SafeAreaView>
    );
};

export default NotificationPreferences;