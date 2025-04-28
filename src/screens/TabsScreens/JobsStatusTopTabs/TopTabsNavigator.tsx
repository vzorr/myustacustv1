import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme';
import { JOBS_STATUS_TABS } from '../../../config/constants/constants';
import { client } from '../../../apiManager/Client';
import { useSelector } from 'react-redux';
import JobsStatusCard from '../../../components/HomeComponents/JobsStatusCard';
import LineSeparator from '../../../components/LineSeparator/LineSeparator';
import { statusTabsStyles } from '../../../styles/statusTabsStyles';
import { useNavigation } from '@react-navigation/native';
import FooterLoader from '../../../components/Loader/FooterLoader';

const TopTabsNavigator = (props: any) => {
  const { activeTab, setActiveTab } = props
  const [isLoading, setIsloading] = useState(true)
  const [jobData, setJobData] = useState<any>([])
  const { userData }: any = useSelector((state: any) => state?.userInfo)
  const navigation: any = useNavigation()

  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const limit = 5
  const getAllJobList = async (tabType: string, pageNumber: number = 1, isLoadMore: boolean = false) => {
    try {
      // let url = `jobs/usta/jobs?filter=${tabType === 'Recommended' ? "recommended" : tabType === 'Most Recent' ? "most_recent" : "saved"}`
      if (tabType !== JOBS_STATUS_TABS.PENDING && !isLoadMore) {
        setIsloading(false);
        setJobData([]);
        return
      }
      // let url = `jobs/user/jobs`
      let url = `jobs/user/jobs?page=${pageNumber}&limit=${limit}`
      let response = await client(userData?.token).get(`${url}`)
      console.log("API Response:", JSON.stringify(response.data, null, 2))
      let res = response?.data
      setIsloading(false)
      if (res?.code !== 200) {
        return
      }
      const newJobs = res?.result?.data || [];
      setHasNextPage(res?.result?.hasNextPage ?? false);
      setPage(res?.result?.page)

      if (isLoadMore) {
        setJobData((prev: any) => [...prev, ...newJobs]);
      } else {
        setJobData(newJobs);
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
      await getAllJobList(activeTab, 1);
    };
    fetchData();
  }, []);
  const handleActiveTab = (tabType: string) => {
    setActiveTab(tabType)
    getAllJobList(tabType)
  };
  const handleLoadMore = () => {
    if (hasNextPage && !loadMore) {
      setLoadMore(true)
      const nextPage = page + 1;
      getAllJobList(activeTab, nextPage, true);
    }
  }
  const handleViewButton = (status: string, id: any) => {
    if (status === "pending") {
      navigation.navigate("ApplicationsList", { jobId: id })
    } else if (status === "ongoing") {
      // return () => props.navigation.navigate("JobStatusUpdateScreen")
    } else if (status === "completed") {
      // return () => props.navigation.navigate("JobStatusUpdateScreen")
    }
  }
  const handlejobDetail = (jobId: any) => {
    navigation.navigate("PostedJobDetailScreen", { jobId: jobId })
  }
  const renderItem = ({ item, index }: { item: any, index: any }) => (
    <View>
      <JobsStatusCard
        time={item?.createdAt}
        jobTitle={item?.title}
        statusText={item?.status}
        milestones={item?.milestones}
        applicationsCount={item?.jobProposalsCount}
        handleViewButton={() => handleViewButton(item?.status, item?.id)}
        handleJobDetail={() => handlejobDetail(item?.id)}
      // handleCardPress={() => console.log("herree")
      //   // navigation.navigate("AppliedJobDetailScreen", {
      //   //   jobDetails: {
      //   //     id: item?.id,
      //   //     status: item?.status,
      //   //     applicationsCount: item?.applicationsCount,
      //   //   }
      //   // })
      // }
      />
      <View style={{ paddingVertical: 16 }}>
        <LineSeparator />
      </View>
    </View>
  );



  return (
    <View style={statusTabsStyles.container}>
      <View style={statusTabsStyles.tabsContainer}>
        <TouchableOpacity
          style={[
            statusTabsStyles.tab,
            activeTab === JOBS_STATUS_TABS.ONGOING && statusTabsStyles.activeTab,
          ]}
          onPress={() => handleActiveTab(JOBS_STATUS_TABS.ONGOING)}
        >
          <Text style={[
            statusTabsStyles.tabText,
            activeTab === JOBS_STATUS_TABS.ONGOING && statusTabsStyles.activeTabText
          ]}>
            {JOBS_STATUS_TABS.ONGOING}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            statusTabsStyles.tab,
            activeTab === JOBS_STATUS_TABS.PENDING && statusTabsStyles.activeTab,
          ]}
          onPress={() => handleActiveTab(JOBS_STATUS_TABS.PENDING)}
        >
          <Text style={[
            statusTabsStyles.tabText,
            activeTab === JOBS_STATUS_TABS.PENDING && statusTabsStyles.activeTabText
          ]}>
            {JOBS_STATUS_TABS.PENDING}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            statusTabsStyles.tab,
            activeTab === JOBS_STATUS_TABS.COMPLETED && statusTabsStyles.activeTab,
          ]}
          onPress={() => handleActiveTab(JOBS_STATUS_TABS.COMPLETED)}
        >
          <Text style={[
            statusTabsStyles.tabText,
            activeTab === JOBS_STATUS_TABS.COMPLETED && statusTabsStyles.activeTabText
          ]}>
            {JOBS_STATUS_TABS.COMPLETED}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={statusTabsStyles.contentContainer}>
        {renderTabContent()}
      </View> */}
      <View style={statusTabsStyles.contentContainer}>
        <FlatList
          data={jobData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={statusTabsStyles.content}
          ListFooterComponent={loadMore ? <FooterLoader /> : null}
          onEndReached={handleLoadMore}
        />
      </View>
    </View>
  );
};

export default TopTabsNavigator;
