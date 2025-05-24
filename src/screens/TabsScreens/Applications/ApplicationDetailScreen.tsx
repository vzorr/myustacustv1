import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams';
import JobDetailHeader from '../../../components/AppHeader/JobDetailHeader';
import { COLORS, fontSize } from '../../../config/themes/theme';
import AccountHeader from '../../../components/AccountHeader/AccountHeader';
import LineSeparator from '../../../components/LineSeparator/LineSeparator';
import Heading from '../../../components/Heading/Heading';
import SubHeading from '../../../components/Heading/SubHeading';
import ConfirmationButtons from '../../../components/Buttons/ConfirmationButtons';
import { useSelector } from 'react-redux';
import { client } from '../../../apiManager/Client';
import LoadingScreen from '../../../components/Loader/LoadingScreen';
import moment from 'moment';
import { getCustomTimeAgo } from '../../../config/constants/constants';

const ApplicationDetailScreen: React.FC<UserNavigationRootProps<"ApplicationDetail">> = (props) => {
    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const { token }: any = useSelector((state: any) => state?.accessToken)
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [appDetail, setAppDetails] = useState<any>("");
    const applicationId = props?.route.params?.proposalId
    const handleViewProfile = () => {
        props.navigation.navigate('UstaProfile', { otherUserId: appDetail?.usta?.id, jobId: appDetail?.job?.id });
    };
    console.log("appDetail", appDetail)
    const handleInterview = () => {
        props.navigation.navigate('ChatInbox',
            {
                chatData:{
                    conversationId: "",
                    otherUserId: appDetail?.usta?.id,
                    jobId: appDetail?.job?.id,
                    jobTitle: appDetail?.job?.title,
                    userName: `${appDetail?.usta?.firstName} ${appDetail?.usta?.lastName}`,
                    isOnline: true,
                    isBlocked: false,
                    isBlocker: false,
                    profileImage: ""
                }
            })
    };

    const getAppDetail = async () => {
        try {
            const userToken = token ? token : userData?.token
            if (userToken) {
                if (userData?.token) {
                    let response = await client(userToken).get(`jobs/proposals/${applicationId}`)
                    let res = response?.data
                    setIsloading(false)
                    if (res?.code !== 200) {
                        return
                    }
                    setIsloading(false)
                    if (res?.result) {
                        setAppDetails(res?.result)
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
            await getAppDetail();
        };
        fetchData();

    }, [userData?.token, token]);
    const jobDetail = appDetail?.job
    const time = getCustomTimeAgo(jobDetail?.createdAt)
    const customer = jobDetail?.customer
    const renderScreenContent = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='DESCRIPTION'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={appDetail?.description}
                    />
                </View>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='START DATE'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={moment(appDetail?.startDate).format('MMM DD, YYYY')}
                    />
                </View>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='END DATE'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={moment(appDetail?.endDate).format('MMM DD, YYYY')}
                    />
                </View>
                <LineSeparator />
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='TOTAL PRICE'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={`${appDetail?.totalCost} ALL`}
                    />
                </View>
                <View style={{ gap: 2 }}>
                    <Heading
                        headingText='MATERIALS'
                        style={{ fontSize: fontSize[16] }}
                    />
                    <SubHeading
                        subHeadingText={appDetail?.materials}
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
        <>
            {isLoading ?
                <LoadingScreen /> :
                <SafeAreaView style={styles.container}>
                    <JobDetailHeader
                        headingTitle='My Applications'
                        jobTitle={jobDetail?.title}
                        jobProviderName={customer?.firstName + " " + customer?.lastName}
                        time={time}
                    />
                    <FlatList
                        data={screenData}
                        keyExtractor={item => item.id}
                        renderItem={() => renderScreenContent()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                    />
                </SafeAreaView>
            }
        </>
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