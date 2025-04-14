import React, { useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { COLORS, FONTS, fontSize, } from '../../../config/themes/theme';
import CustomButton from '../../../components/Buttons/CustomButton';
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles';
import BackHeader from '../../../components/BackHeader/BackHeader';
import { useNavigation } from '@react-navigation/native';
import { setAccountCreation } from '../../../stores/reducer/AccountCreationReducer';
import { useDispatch, useSelector } from 'react-redux';

const TermsAndConditions: React.FC<UserNavigationRootProps<'TermsAndConditions'>> = (props) => {
    const scrollRef = useRef<ScrollView>(null);
    const navigation = useNavigation()
    const { accountCreation }: any = useSelector((state: any) => state?.accountCreation)
    const dispatch: any = useDispatch()

    const handleAcceptedConditions = () => {
        const updateLocationData = {
            ...accountCreation,
            termsAndConditions: true

        }
        dispatch(setAccountCreation(updateLocationData))
        props.navigation.replace('NotificationPreferences', {
            isTermsAndConditionsAccepted: true,
        });
    };

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    };
    const handleBackPress = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollRef} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={{ gap: 10 }}>
                    <BackHeader
                        onPress={handleBackPress}
                        title='Availability & Preferences'
                    />
                    <Text style={reuseableTextStyles.title}>Terms & Conditions</Text>
                </View>

                {/* Scrollable Content */}
                <View style={{ gap: 10, paddingHorizontal: 5 }}>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>Acceptance of Terms</Text>
                        <Text style={reuseableTextStyles.subTitle}>
                            By using myUsta, you agree to these terms and conditions. If you do not accept these
                            terms, you may not use our platform.
                        </Text>
                    </View>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>User Accounts</Text>
                        <Text style={reuseableTextStyles.subTitle}>• You are responsible for maintaining the confidentiality of your account credentials.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• You must provide accurate and up-to-date information during registration.</Text>
                    </View>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>Use of the Platform</Text>
                        <Text style={reuseableTextStyles.subTitle}>• Homeowners can post jobs and hire tradespeople for their services.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• Tradespeople can create profiles, showcase portfolios, and connect with homeowners.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• All interactions between users are conducted at their own discretion. myUsta is not responsible for disputes, damages, or service quality.</Text>
                    </View>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>Payments and Fees</Text>
                        <Text style={reuseableTextStyles.subTitle}>• myUsta may charge fees for connecting users.</Text>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>Use of the Platform</Text>
                        <Text style={reuseableTextStyles.subTitle}>• Homeowners can post jobs and hire tradespeople for their services.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• Tradespeople can create profiles, showcase portfolios, and connect with homeowners.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• All interactions between users are conducted at their own discretion. myUsta is not responsible for disputes, damages, or service quality.</Text>
                    </View>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>Payments and Fees</Text>
                        <Text style={reuseableTextStyles.subTitle}>• myUsta may charge fees for connecting users.</Text>
                        <Text style={reuseableTextStyles.subTitle}>Use of the Platform</Text>
                        <Text style={reuseableTextStyles.subTitle}>• Homeowners can post jobs and hire tradespeople for their services.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• Tradespeople can create profiles, showcase portfolios, and connect with homeowners.</Text>
                        <Text style={reuseableTextStyles.subTitle}>• All interactions between users are conducted at their own discretion. myUsta is not responsible for disputes, damages, or service quality.</Text>
                    </View>
                    <View>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[18] }]}>Payments and Fees</Text>
                        <Text style={reuseableTextStyles.subTitle}>• myUsta may charge fees for connecting users.</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.footer}>
                <CustomButton
                    title='Scroll to Top'
                    onPress={scrollToTop}
                    style={styles.scrollTopButton}
                />
                <CustomButton
                    title='Accept & Continue'
                    onPress={handleAcceptedConditions}
                    style={styles.acceptButton}
                />
            </View>
        </SafeAreaView>
    );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    content: {
        gap: 8
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 14,
        color: COLORS.Gray,
        marginBottom: 6,
    },
    scrollTopButton: {
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.white
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        width: "100%"
    },
});
