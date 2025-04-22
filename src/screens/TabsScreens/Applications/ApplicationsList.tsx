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
    const applications = [
        {
            id: 1,
            name: "Arjan Bytyqi",
            startDate: "Jan 20, 2025",
            endDate: "Jan 30, 2025",
            amount: 60000,
            rating: 4.2,
            status: "approved" as const,
            // imageSource: require('../../../assets/images/profiles/arjan.png') // Add image source
        },
        {
            id: 2,
            name: "Besnik Allajbej",
            startDate: "Jan 16, 2025",
            endDate: "Jan 28, 2025",
            amount: 50000,
            rating: 4.2,
            status: "approved" as const,
            // imageSource: { uri: 'https://example.com/besnik.jpg' } // Remote image example
        },
    ];
    const getAllAppList = async () => {
        try {

            let url = `jobs/${id}/applications`
            let response = await client(userData?.token).get(`${url}`)
            let res = response?.data
            setIsloading(false)
            if (res?.code !== 200) {
                return
            }
            if (res?.result?.applications?.length > 0) {
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
        console.log(`Pressed application ${applicationId}`);
        props.navigation.navigate('ApplicationDetail', { applicationId });
    };
    const time = getCustomTimeAgo(appData?.jobCreatedAt)
    return (
        <>
            {isLoading ?
                <LoadingScreen /> :
                <View style={styles.container}>
                    <JobDetailHeader
                        headingTitle='My Jobs'
                        jobTitle='Tile installations'
                        jobProviderName={appData?.customerName}
                        time={time}
                    />
                    <View style={styles.listContent}>
                        <Text style={[reuseableTextStyles.title, { fontSize: fontSize[16] }]}>JOB APPLICATIONS ({appData?.totalProposals})</Text>
                        <FlatList
                            data={appData?.applications}
                            keyExtractor={(item, index) => index.toString()}
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
                                    onPress={() => handlePress(item?.id)}
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
        gap: 16,
    },
});

export default ApplicationsList;