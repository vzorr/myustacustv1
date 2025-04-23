import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserNavigationRootProps } from '../../types/stacksParams';
import AppHeader from '../../components/AppHeader/AppHeader';
import { COLORS, fontSize } from '../../config/themes/theme';
import Heading from '../../components/Heading/Heading';
import SubHeading from '../../components/Heading/SubHeading';
import { useSelector } from 'react-redux';
import { client } from '../../apiManager/Client';
import LoadingScreen from '../../components/Loader/LoadingScreen';

const UstaProfileScreen: React.FC<UserNavigationRootProps<"UstaProfile">> = (props) => {

    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const { token }: any = useSelector((state: any) => state?.accessToken)
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [otherUserData, setOtherUserData] = useState<any>("");
    const otherUserId = props?.route.params?.otherUserId
    console.log("ididididididid", otherUserId)
    console.log("ididididididid", userData)
    const handleViewProfile = () => {
        // props.navigation.navigate('UstaProfile', { otherUserId: appDetail?.usta?.id });
    };
    const handleInterview = () => {
        // props.navigation.navigate('ApplicationDetail');
    };

    const getUserDetail = async () => {
        try {
            const userToken = token ? token : userData?.token
            if (userToken) {
                if (userData?.token) {
                    let response = await client(userToken).get(`account/usta-profile/${otherUserId}`)
                    let res = response?.data
                    setIsloading(false)
                    if (res?.code !== 200) {
                        return
                    }
                    setIsloading(false)
                    if (res?.result) {
                        setOtherUserData(res?.result)
                    }
                }
            }
        } catch (error) {
            setIsloading(false)
            console.log("errrrorr", error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await getUserDetail();
        };
        fetchData();

    }, [userData?.token, token]);
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
        <>
            {isLoading ?
                <LoadingScreen /> :
                <SafeAreaView style={styles.container}>
                    <AppHeader
                        onMenuPress={() => { }}
                        onNotificationPress={() => { }}
                        showNotificationBadge={true}
                        badgeCount={5}
                        isProfile={true}
                        isChat={true}
                        userName={otherUserData?.firstName + " " + otherUserData?.lastName}
                        userLocation={'Tirana, AL'}
                        imageUrl={otherUserData?.profilePicture}
                    />
                    <FlatList
                        data={screenData}
                        keyExtractor={item => item.id}
                        renderItem={() => renderScreenContent()}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            }
        </>
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