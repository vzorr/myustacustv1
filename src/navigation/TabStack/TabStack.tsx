import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { UserStackParamList } from '../../types/stacksParams';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabsScreenOptionsStyle } from './tabStyles';
import { CustomBottomTab } from './CustomBottomTab';
import SearchScreen from '../../screens/TabsScreens/SearchScreen/SearchScreen';
import PostJobScreen from '../../screens/TabsScreens/PostJobScreens/PostJobScreen';
import ProfileScreen from '../../screens/TabsScreens/ProfileScreen/ProfileScreen';
import { COLORS } from '../../config/themes/theme';
import JobsStatusSackNav from '../../screens/TabsScreens/JobsStatusScreens/JobsStatusStackNav';
import ChatListContainer from '../../screens/TabsScreens/ChatScreen/ChatListing/ChatListContainer';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../apiManager/Client';
import { setUserProfile } from '../../stores/reducer/UserProfileReducer';

const Tab = createBottomTabNavigator<UserStackParamList>();

const TabStack: React.FC = () => {
        const { token }: any = useSelector((state: any) => state?.accessToken)
        const { userData }: any = useSelector((state: any) => state?.userInfo)
    const dispatch = useDispatch()
    const getUserProfile = async () => {
        const userToken = token ? token : userData?.token
        if(userToken){
            try {
                let res = await client(userToken).get('users/customerProfile')
                if (res.data?.code !== 200) {
                    return
                }
                dispatch(setUserProfile(res?.data?.result))
                
            } catch (error) {
                
            }
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [])
    return (
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName="JobsStatusSackNav"
                screenOptions={tabsScreenOptionsStyle}
                tabBar={props => <CustomBottomTab {...props} />}
            >
                <Tab.Screen
                    name="JobsStatusSackNav"
                    component={JobsStatusSackNav}
                    options={{ tabBarLabel: "Home" }}
                />
                <Tab.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{ tabBarLabel: "Search" }}
                />
                <Tab.Screen
                    name="PostJobScreen"
                    component={PostJobScreen}
                    options={{ tabBarLabel: "Post Job" }}
                />
                <Tab.Screen
                    name="ChatList"
                    component={ChatListContainer}
                    options={{ tabBarLabel: "Messages" }}
                />
                <Tab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ tabBarLabel: "Profile" }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    }
});

export default TabStack