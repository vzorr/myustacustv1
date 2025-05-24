import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { COLORS } from '../../../config/themes/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { useSelector } from 'react-redux';
import { ProfileView } from '../../../components/ProfileView/ProfileView';

const ProfileScreen: React.FC<UserNavigationRootProps<"ProfileScreen">> = (props) => {
    const { navigation } = props;
    
    // Get user data from Redux store
    const { userData }: any = useSelector((state: any) => state?.userInfo);

    const handleEditButton = () => {
        navigation.navigate("EditProfile");
    };

    // Handle menu press - opens navigation drawer
    const handleMenuPress = () => {
        navigation.openDrawer?.();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={handleMenuPress}
                userName={`${userData?.firstName || 'User'} ${userData?.lastName || ''}`}
                userLocation={userData?.location?.[0]?.address || 'Location not set'}
                imageUrl={userData?.profilePicture || 'https://randomuser.me/api/portraits/men/1.jpg'}
                isProfile={true}
                showNotificationBadge={true}
                badgeCount={userData?.notifications?.unread || 0}
            />

            <ProfileView 
                // Don't pass userId to show own profile
                onEditPress={handleEditButton}
                showEditButton={true}
                showWorkHistory={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default ProfileScreen;