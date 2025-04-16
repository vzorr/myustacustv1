import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme';
import RecommendedScreen from './PendingStatusScreen';
import MostRecentScreen from './OngoingStatusScreen';
import SavedScreen from './CompletedStatusScreen';
import { JOBS_STATUS_TABS } from '../../../config/constants/constants';
import OngoingStatusScreen from './OngoingStatusScreen';
import PendingStatusScreen from './PendingStatusScreen';
import CompletedStatusScreen from './CompletedStatusScreen';
import { client } from '../../../apiManager/Client';
import { useSelector } from 'react-redux';
import JobsStatusCard from '../../../components/HomeComponents/JobsStatusCard';
import LineSeparator from '../../../components/LineSeparator/LineSeparator';

const TopTabsNavigator = (props: any) => {
  const { activeTab, setActiveTab } = props
  const [isLoading, setIsloading] = useState(true)
  const [jobData, setJobData] = useState<any>([])
  const { userData }: any = useSelector((state: any) => state?.userInfo)

  const getAllJobList = async () => {
    try {
      // let url = `jobs/usta/jobs?filter=${tabType === 'Recommended' ? "recommended" : tabType === 'Most Recent' ? "most_recent" : "saved"}`
      let url = `api/jobs/user/jobs`
      let response = await client(userData?.token).get(`${url}`)
      console.log("ressss", response)
      let res = response?.data
      setIsloading(false)
      if (res?.code !== 200) {
        return
      }
      setIsloading(false)
      if (res?.result?.length > 0) {
        setJobData(res?.result)
      }
    } catch (error) {
      setIsloading(false)
      console.log("errrrorr", error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getAllJobList();
    };
    fetchData();
  }, []);
  const handleActiveTab = (tabType: string) => {
    setActiveTab(tabType)
    getAllJobList()
  };
  const renderItem = ({ item, index }: { item: any, index: any }) => (
    <View>
      <JobsStatusCard
        time={item.time}
        jobTitle={item.jobTitle}
        statusText={item.statusText}
        applicationsCount={item?.applicationsCount}
        milestones={item?.milestones}
        statusTextColor={COLORS.statusBtnBorderColor}
        statusBgColor={COLORS.statusBtnBgColor}
        statusBorderColor={COLORS.statusBtnBorderColor}
      />
      <LineSeparator />
    </View>
  );


  // const renderTabContent = () => {
  //   switch (activeTab) {
  //     case JOBS_STATUS_TABS.ONGOING:
  //       return <OngoingStatusScreen />;
  //     case JOBS_STATUS_TABS.PENDING:
  //       return <PendingStatusScreen />;
  //     case JOBS_STATUS_TABS.COMPLETED:
  //       return <CompletedStatusScreen />;
  //     default:
  //       return <RecommendedScreen />;
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === JOBS_STATUS_TABS.ONGOING && styles.activeTab,
          ]}
          onPress={() => setActiveTab(JOBS_STATUS_TABS.ONGOING)}
        >
          <Text style={[
            styles.tabText,
            activeTab === JOBS_STATUS_TABS.ONGOING && styles.activeTabText
          ]}>
            {JOBS_STATUS_TABS.ONGOING}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === JOBS_STATUS_TABS.PENDING && styles.activeTab,
          ]}
          onPress={() => handleActiveTab(JOBS_STATUS_TABS.PENDING)}
        >
          <Text style={[
            styles.tabText,
            activeTab === JOBS_STATUS_TABS.PENDING && styles.activeTabText
          ]}>
            {JOBS_STATUS_TABS.PENDING}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === JOBS_STATUS_TABS.COMPLETED && styles.activeTab,
          ]}
          onPress={() => setActiveTab(JOBS_STATUS_TABS.COMPLETED)}
        >
          <Text style={[
            styles.tabText,
            activeTab === JOBS_STATUS_TABS.COMPLETED && styles.activeTabText
          ]}>
            {JOBS_STATUS_TABS.COMPLETED}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.contentContainer}>
        {renderTabContent()}
      </View> */}
      <View style={styles.contentContainer}>
        <FlatList
          data={jobData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        />
      </View>
    </View>
  );
};

export default TopTabsNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 5,
    // paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.Navy,
  },
  tabText: {
    fontSize: fontSize[12],
    color: COLORS.Navy,
    fontWeight: '400',
    textAlign: 'center',
  },
  activeTabText: {
    color: COLORS.Navy,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    gap: 16,
    paddingBottom: 100,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
}); 