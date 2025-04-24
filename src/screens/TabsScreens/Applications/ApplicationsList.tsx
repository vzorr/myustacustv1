import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import ApplicationListCard from '../../../components/ApplicationListCard/ApplicationListCard';
import { COLORS, fontSize } from '../../../config/themes/theme';
import JobDetailHeader from '../../../components/AppHeader/JobDetailHeader';
import { reuseableTextStyles } from '../../../styles/reuseableTextStyles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { client } from '../../../apiManager/Client';
import { getCustomTimeAgo } from '../../../config/constants/constants';
import VisibleLoader from '../../../components/Loader/VisibleLoader';
import LoadingScreen from '../../../components/Loader/LoadingScreen';

const ApplicationsList: React.FC<UserNavigationRootProps<"ApplicationsList">> = (props) => {
    const [isLoading, setIsloading] = useState(true)
    const [appData, setAppData] = useState<any>([])
    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const id = props.route?.params?.jobId
    const navigation: any = useNavigation()

    const getAllAppList = async () => {
        try {

            let url = `jobs/${id}/applications`
            let response = await client(userData?.token).get(`${url}`)
            let res = response?.data
            console.log("API Response:", JSON.stringify(res, null, 2))
            setIsloading(false)
            if (res?.code !== 200) {
                return
            }
            if (res?.result?.data?.length > 0) {
                setAppData(res?.result)
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log("API Error:", JSON.stringify(error, null, 2))
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await getAllAppList();
        };
        fetchData();
    }, []);
    const handlePress = (applicationId: number) => {
        // console.log(`Pressed application ${applicationId}`);
        props.navigation.navigate('ApplicationDetail', { proposalId: applicationId });
    };
    const time = getCustomTimeAgo(appData?.jobCreatedAt)
    return (
        <>
            {isLoading ?
                <LoadingScreen /> :
                <View style={styles.container}>
                    <JobDetailHeader
                        headingTitle='My Jobs'
                        jobTitle={appData?.jobTitle}
                        jobProviderName={appData?.customerName}
                        time={time}
                    />
                    <View style={styles.listContent}>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16] }]}>JOB APPLICATIONS ({appData?.totalProposals})</Text>
                        <FlatList
                            data={appData?.data}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            renderItem={({ item }) => (
                                <ApplicationListCard
                                    name={item?.ustaName}
                                    startDate={item?.proposalStartDate}
                                    endDate={item?.proposalEndDate}
                                    amount={item?.totalPrice}
                                    rating={item?.rating}
                                    status={item?.status}
                                    profileImg={item?.ustaProfilePic}
                                    // imageSource={item?.imageSource}
                                    onPress={() => handlePress(item?.proposalId)}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listContent: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
});

export default ApplicationsList;