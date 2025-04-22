import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams';
import JobDetailHeader from '../../../components/AppHeader/JobDetailHeader';
import { COLORS, fontSize } from '../../../config/themes/theme';
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import LineSeparator from '../../../components/LineSeparator/LineSeparator';
import Heading from '../../../components/Heading/Heading';
import SubHeading from '../../../components/Heading/SubHeading';
import ConfirmationButtons from '../../../components/Buttons/ConfirmationButtons';

const ApplicationDetailScreen: React.FC<UserNavigationRootProps<"ApplicationDetail">> = (props) => {
    const handleViewProfile = () => {
        props.navigation.navigate('UstaProfile');
    };
    const handleInterview = () => {
        // props.navigation.navigate('ApplicationDetail');
    };


    const renderScreenContent = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='DESCRIPTION'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    />
                </View>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='START DATE'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={'Jan 20, 2025'}
                    />
                </View>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='END DATE'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={'Jan 30, 2025'}
                    />
                </View>
                <LineSeparator />
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='TOTAL PRICE'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={'60,000 ALL'}
                    />
                </View>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='MATERIALS'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={'Tiles, Adhesive, Grout'}
                    />
                </View>
                <ConfirmationButtons
                    cancelText='View Profile'
                    onCancel={handleViewProfile}
                    confirmText='Interview'
                    onConfirm={handleInterview}
                    confirmContainerStyle={{ backgroundColor: COLORS.Yellow }}
                />
            </View>
        </SafeAreaView>
    );
    const screenData = [{ id: '1' }];
    return (
        <SafeAreaView style={styles.container}>
            <JobDetailHeader
                headingTitle='My Applications'
                jobTitle='Tile installations'
                jobProviderName='Igli Faslija'
                time='2 minutes ago'
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </SafeAreaView>
    )
}

export default ApplicationDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    innerContainer: {
        gap: 16,
        padding: 20,
    },
})