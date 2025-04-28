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
import FooterLoader from '../../../components/Loader/FooterLoader';

const ApplicationsList: React.FC<UserNavigationRootProps<"ApplicationsList">> = (props) => {
    const [isLoading, setIsloading] = useState(true)
    const [appData, setAppData] = useState<any>([])
    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const id = props.route?.params?.jobId
    const navigation: any = useNavigation()
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const limit = 5
    const getAllAppList = async (pageNumber: number = 1, isLoadMore: boolean = false) => {
        try {
            let url = `jobs/${id}/applications?page=${pageNumber}&limit=${limit}`
            //  let url = `jobs/user/jobs?page=${pageNumber}&limit=${limit}`
            let response = await client(userData?.token).get(`${url}`)
            let res = response?.data
            setIsloading(false)
            if (res?.code !== 200) {
                return
            }
            setIsloading(false)
            const newapp = res?.result;
            setHasNextPage(res?.result?.hasNextPage ?? false);
            setPage(res?.result?.page)
            if (isLoadMore) {
                setAppData((prev: any) => ({
                    ...prev,
                    data: [...(prev?.data || []), ...(newapp?.data || [])]
                }));
            } else {
                setAppData(newapp);
            }
            setLoadMore(false)
            setIsloading(false);
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
    const handleLoadMore = () => {
        if (hasNextPage && !loadMore) {
            setLoadMore(true)
            const nextPage = page + 1;
            getAllAppList(nextPage, true);
        }
    }
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
                            ListFooterComponent={loadMore ? <FooterLoader /> : null}
                            onEndReached={handleLoadMore}
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