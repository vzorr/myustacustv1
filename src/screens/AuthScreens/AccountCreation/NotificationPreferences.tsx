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

const NotificationPreferences: React.FC<UserNavigationRootProps<"NotificationPreferences">> = (props) => {
    const { route, navigation } = props
    const isTermsAndConditionsAccepted = route?.params?.isTermsAndConditionsAccepted
    const [selectedNotiiType, setSelectedNotiType] = useState<string[]>([]);

    const notiiType = [
        { key: '1', value: 'App' },
        { key: '2', value: 'Email' },
        { key: '3', value: 'SMS' },
    ];

    console.log("selectedItems", selectedNotiiType)
    const handleTermAndCondition = () => {
        navigation.navigate("TermsAndConditions")
    }

    const handleBack = () => {
        navigation.goBack()
    }
    const handleCompleteSetup = () => {
        if (isTermsAndConditionsAccepted) {
            navigation.navigate("SuccessMessage", { screenType: "NotificationPreferences" })
            return
        }
    }

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
        </SafeAreaView>
    );
};

export default NotificationPreferences;