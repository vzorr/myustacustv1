import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AppHeader from '../../../components/AppHeader/AppHeader'
import TopTabsNavigator from '../JobsStatusTopTabs/TopTabsNavigator'
import { JOBS_STATUS_TABS } from '../../../config/constants/constants'
import { COLORS, fontSize } from '../../../config/themes/theme'
import AccountHeader from '../../../components/AccountHeader/AccountHeader'
import { statusScreensStyles } from '../../../styles/statusScreensStyles'

const JobsStatusScreens: React.FC<UserNavigationRootProps<"JobsStatusScreens">> = (props) => {
    const [activeTab, setActiveTab] = useState<string>(JOBS_STATUS_TABS.ONGOING);
    return (
        <View style={statusScreensStyles.container}>
            <AppHeader
                onMenuPress={() => { }}
                onNotificationPress={() => { }}
                showNotificationBadge={true}
                badgeCount={5}
                isProfile={false}
            />
            <View style={statusScreensStyles.innerContainer}>
                <AccountHeader
                    title='My Jobs'
                    subTitle='A list of jobs you’ve already posted.'
                    containerStyle={statusScreensStyles.headingContainer}
                    titleStyle={statusScreensStyles.title}
                    subTitleStyle={statusScreensStyles.subTitle}
                />
                <TopTabsNavigator
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
        </View>
    )
}

export default JobsStatusScreens