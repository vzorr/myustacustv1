import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../types/stacksParams';
import AppHeader from '../../components/AppHeader/AppHeader';
import { COLORS, fontSize } from '../../config/themes/theme';
import Heading from '../../components/Heading/Heading';
import SubHeading from '../../components/Heading/SubHeading';

const UstaProfileScreen: React.FC<UserNavigationRootProps<"UstaProfile">> = (props) => {

    const renderScreenContent = () => (
        <View style={styles.contentContainer}>
            <View>
                <Heading
                    headingText='ABOUT ME'
                    style={{ fontSize: fontSize[16] }}
                />
                <SubHeading
                    subHeadingText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                />
            </View>
            <View>
                <Heading
                    headingText='PORTFOLIO'
                    style={{ fontSize: fontSize[16] }}
                />
            </View>
        </View>
    )
    const screenData = [{ id: '1' }];
    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                onMenuPress={() => { }}
                onNotificationPress={() => { }}
                showNotificationBadge={true}
                badgeCount={5}
                isProfile={true}
                isChat={true}
                userName={"Igli Faslija"}
                userLocation={'Tirana, AL'}
                imageUrl=''
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default UstaProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 20,
        gap: 10,
    },
})