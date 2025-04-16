import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../config/themes/theme'
import JobsStatusCard from '../../../components/HomeComponents/JobsStatusCard';
const jobStatusData = [
  {
    id: '1',
    time: '1 hour ago',
    jobTitle: 'Looking for an Experienced Tiler',
    statusText: 'Completed',
    applicationsCount: 'Less than 5',
  },
  {
    id: '2',
    time: '2 hours ago',
    jobTitle: 'Need Electric Work in Kitchen',
    statusText: 'Completed',
    milestones: '3 milestones created',
  },
  {
    id: '3',
    time: '3 hours ago',
    jobTitle: 'Fix broken bathroom tiles',
    statusText: 'Completed',
    applicationsCount: '10+ applicants',
  },
  {
    id: '4',
    time: '4 hours ago',
    jobTitle: 'Build a small deck',
    statusText: 'Completed',
    milestones: '2 payment stages',
  },
  {
    id: '5',
    time: '5 hours ago',
    jobTitle: 'Wall painting job',
    statusText: 'Completed',
    // No applications or milestones
  },
];

const CompletedStatusScreen = () => {
  const renderItem = ({ item }: { item: typeof jobStatusData[0] }) => (
    <JobsStatusCard
      time={item.time}
      jobTitle={item.jobTitle}
      statusText={item.statusText}
      applicationsCount={item?.applicationsCount}
      milestones={item?.milestones}
      statusTextColor={COLORS.completedTxtColor}
      statusBgColor={COLORS.completedBgColor}
      statusBorderColor={COLORS.completedTxtColor}
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

export default CompletedStatusScreen

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