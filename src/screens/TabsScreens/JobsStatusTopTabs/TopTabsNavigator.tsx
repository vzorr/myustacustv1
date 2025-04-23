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

const TopTabsNavigator = (props: any) => {
  const { activeTab, setActiveTab } = props
  const [isLoading, setIsloading] = useState(true)
  const [jobData, setJobData] = useState<any>([])
  const { userData }: any = useSelector((state: any) => state?.userInfo)
  const navigation: any = useNavigation()

  const getAllJobList = async (tabType: any) => {
    try {
      // let url = `jobs/usta/jobs?filter=${tabType === 'Recommended' ? "recommended" : tabType === 'Most Recent' ? "most_recent" : "saved"}`
      if (tabType === JOBS_STATUS_TABS.ONGOING) {
        setJobData([])
        return
      } else if (tabType === JOBS_STATUS_TABS.COMPLETED) {
        setJobData([])
        return
      }
      let url = `jobs/user/jobs`
      let response = await client(userData?.token).get(`${url}`)
      console.log("API Response:", JSON.stringify(response.data, null, 2))
      let res = response?.data
      setIsloading(false)
      if (res?.code !== 200) {
        return
      }
      setIsloading(false)
      if (res?.result?.data?.length > 0) {
        setJobData(res?.result?.data)
      }
    } catch (error) {
      setIsloading(false)
      console.log("API Error:", JSON.stringify(error, null, 2))
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getAllJobList(activeTab);
    };
    fetchData();
  }, []);
  const handleActiveTab = (tabType: string) => {
    setActiveTab(tabType)
    getAllJobList(tabType)
  };
  const handleViewButton = (status: string, id: any) => {
    if (status === "pending") {
      navigation.navigate("ApplicationsList", {jobId: id})
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
        handleCardPress={() => console.log("herree")
          // navigation.navigate("AppliedJobDetailScreen", {
          //   jobDetails: {
          //     id: item?.id,
          //     status: item?.status,
          //     applicationsCount: item?.applicationsCount,
          //   }
          // })
        }
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
        />
      </View>
    </View>
  );
};

export default TopTabsNavigator;
