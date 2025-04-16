import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native'
import React from 'react'
import { COLORS, fontSize, SIZES } from '../../../config/themes/theme'
import JobsStatusCard from '../../../components/HomeComponents/JobsStatusCard'
const jobStatusData = [
  {
    id: '1',
    time: '1 hour ago',
    jobTitle: 'Looking for an Experienced Tiler',
    statusText: 'Pending',
    applicationsCount: 'Less than 5',
  },
  {
    id: '2',
    time: '2 hours ago',
    jobTitle: 'Need Electric Work in Kitchen',
    statusText: 'Pending',
    milestones: '3 milestones created',
  },
  {
    id: '3',
    time: '3 hours ago',
    jobTitle: 'Fix broken bathroom tiles',
    statusText: 'Pending',
    applicationsCount: '10+ applicants',
  },
  {
    id: '4',
    time: '4 hours ago',
    jobTitle: 'Build a small deck',
    statusText: 'Pending',
    milestones: '2 payment stages',
  },
  {
    id: '5',
    time: '5 hours ago',
    jobTitle: 'Wall painting job',
    statusText: 'Pending',
    // No applications or milestones
  },
];


const PendingStatusScreen = () => {
  const renderItem = ({ item }: { item: typeof jobStatusData[0] }) => (
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

export default PendingStatusScreen

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