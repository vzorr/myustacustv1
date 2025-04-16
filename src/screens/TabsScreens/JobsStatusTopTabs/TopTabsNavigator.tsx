import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, FONTS, fontSize } from '../../../config/themes/theme';
import RecommendedScreen from './PendingStatusScreen';
import MostRecentScreen from './OngoingStatusScreen';
import SavedScreen from './CompletedStatusScreen';
import { JOBS_STATUS_TABS } from '../../../config/constants/constants';
import OngoingStatusScreen from './OngoingStatusScreen';
import PendingStatusScreen from './PendingStatusScreen';
import CompletedStatusScreen from './CompletedStatusScreen';

const TopTabsNavigator = (props: any) => {
  const { activeTab, setActiveTab } = props

  const renderTabContent = () => {
    switch (activeTab) {
      case JOBS_STATUS_TABS.ONGOING:
        return <OngoingStatusScreen />;
      case JOBS_STATUS_TABS.PENDING:
        return <PendingStatusScreen />;
      case JOBS_STATUS_TABS.COMPLETED:
        return <CompletedStatusScreen />;
      default:
        return <RecommendedScreen />;
    }
  };

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
          onPress={() => setActiveTab(JOBS_STATUS_TABS.PENDING)}
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

      <View style={styles.contentContainer}>
        {renderTabContent()}
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
}); 