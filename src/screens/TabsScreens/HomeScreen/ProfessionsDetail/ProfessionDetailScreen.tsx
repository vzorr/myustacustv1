import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../../types/stacksParams'
import ProfessionDetailScreenUi from './ProfessionDetailScreenUi'
import { COLORS } from '../../../../config/themes/theme'
import AppHeader from '../../../../components/AppHeader/AppHeader'

const ProfessionDetailScreen: React.FC<UserNavigationRootProps<"ProfessionDetailScreen">> = (props) => {
    return (
        <View style={styles.professionDetailContainer}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={() => { }}
                showNotificationBadge={true}
                badgeCount={0}
                isProfile={false}
            />
            <ProfessionDetailScreenUi />
        </View>
    )
}

export default ProfessionDetailScreen

const styles = StyleSheet.create({
    professionDetailContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})