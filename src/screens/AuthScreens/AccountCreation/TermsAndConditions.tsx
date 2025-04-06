import React, { useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { COLORS, FONTS, fontSize, textStyles, } from '../../../config/themes/theme';
import { SVGIcons } from '../../../config/constants/svg';
import CustomButton from '../../../components/Buttons/CustomButton';

const TermsAndConditions: React.FC<UserNavigationRootProps<'TermsAndConditions'>> = (props) => {
    const scrollRef = useRef<ScrollView>(null);

    const handleAcceptedConditions = () => {
        props.navigation.navigate('NotificationPreferences', {
            isTermsAndConditionsAccepted: true,
        });
    };

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <SVGIcons.leftArrow />
                    </TouchableOpacity>
                    <Text style={styles.title}>Notifications</Text>
                </View>
                <View>
                    <Text style={textStyles.title}>Terms & Conditions</Text>
                </View>

                {/* Scrollable Content */}

                <Text style={styles.sectionTitle}>Terms & Conditions</Text>
                <Text style={styles.sectionText}>
                    By using myUsta, you agree to these terms and conditions. If you do not accept these
                    terms, you may not use our platform.
                </Text>

                <Text style={styles.sectionTitle}>User Accounts</Text>
                <Text style={styles.sectionText}>• You are responsible for maintaining the confidentiality of your account credentials.</Text>
                <Text style={styles.sectionText}>• You must provide accurate and up-to-date information during registration.</Text>

                <Text style={styles.sectionTitle}>Use of the Platform</Text>
                <Text style={styles.sectionText}>• Homeowners can post jobs and hire tradespeople for their services.</Text>
                <Text style={styles.sectionText}>• Tradespeople can create profiles, showcase portfolios, and connect with homeowners.</Text>
                <Text style={styles.sectionText}>• All interactions between users are conducted at their own discretion. myUsta is not responsible for disputes, damages, or service quality.</Text>

                <Text style={styles.sectionTitle}>Payments and Fees</Text>
                <Text style={styles.sectionText}>• myUsta may charge fees for connecting users.</Text>
                <Text style={styles.sectionTitle}>Use of the Platform</Text>
                <Text style={styles.sectionText}>• Homeowners can post jobs and hire tradespeople for their services.</Text>
                <Text style={styles.sectionText}>• Tradespeople can create profiles, showcase portfolios, and connect with homeowners.</Text>
                <Text style={styles.sectionText}>• All interactions between users are conducted at their own discretion. myUsta is not responsible for disputes, damages, or service quality.</Text>

                <Text style={styles.sectionTitle}>Payments and Fees</Text>
                <Text style={styles.sectionText}>• myUsta may charge fees for connecting users.</Text>
                <Text style={styles.sectionTitle}>Use of the Platform</Text>
                <Text style={styles.sectionText}>• Homeowners can post jobs and hire tradespeople for their services.</Text>
                <Text style={styles.sectionText}>• Tradespeople can create profiles, showcase portfolios, and connect with homeowners.</Text>
                <Text style={styles.sectionText}>• All interactions between users are conducted at their own discretion. myUsta is not responsible for disputes, damages, or service quality.</Text>

                <Text style={styles.sectionTitle}>Payments and Fees</Text>
                <Text style={styles.sectionText}>• myUsta may charge fees for connecting users.</Text>


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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: '400',
        color: COLORS.Navy200,
        fontStyle: 'normal'
    },
    content: {
        // paddingHorizontal: 20,
        // paddingBottom: 100,
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
