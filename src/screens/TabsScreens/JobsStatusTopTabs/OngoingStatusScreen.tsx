import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../config/themes/theme'
import JobsStatusCard from '../../../components/HomeComponents/JobsStatusCard';
const jobStatusData = [
  {
    id: '1',
    time: '1 hour ago',
    jobTitle: 'Looking for an Experienced Tiler',
    statusText: 'Pending Approval',
    applicationsCount: 'Less than 5',
  },
  {
    id: '2',
    time: '2 hours ago',
    jobTitle: 'Need Electric Work in Kitchen',
    statusText: 'Ongoing',
    milestones: '3 milestones created',
  },
  {
    id: '3',
    time: '3 hours ago',
    jobTitle: 'Fix broken bathroom tiles',
    statusText: 'Ongoing',
    applicationsCount: '10+ applicants',
  },
  {
    id: '4',
    time: '4 hours ago',
    jobTitle: 'Build a small deck',
    statusText: 'Ongoing',
    milestones: '2 payment stages',
  },
  {
    id: '5',
    time: '5 hours ago',
    jobTitle: 'Wall painting job',
    statusText: 'Ongoing',
    // No applications or milestones
  },
];

const OngoingStatusScreen = () => {
  const renderItem = ({ item }: { item: typeof jobStatusData[0] }) => (
    <JobsStatusCard
      time={item.time}
      jobTitle={item.jobTitle}
      statusText={item.statusText}
      applicationsCount={item?.applicationsCount}
      milestones={item?.milestones}
      statusTextColor={item.statusText === "Ongoing" ? COLORS.ongoingStatusColor : COLORS.statusBtnBorderColor}
      statusBgColor={item.statusText === "Ongoing" ? COLORS.ongoingBgColor : COLORS.statusBtnBgColor}
      statusBorderColor={item.statusText === "Ongoing" ? COLORS.ongoingStatusColor : COLORS.statusBtnBorderColor}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobStatusData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    top: 16,
  },
  contentContainer: {
    paddingBottom: 100,
  },
})
export default OngoingStatusScreen