import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { WORK_HISTORY_TABS } from '../../config/constants/constants';
import LineSeparator from '../../components/LineSeparator/LineSeparator';
import { statusTabsStyles } from '../../styles/statusTabsStyles';
import WorkHistoryCard from '../../components/WorkHistoryCard/WorkHistoryCard';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';
import CustomButton from '../../components/Buttons/CustomButton';

interface WorkHistoryTabsProps {
    activeTab: string;
    setActiveTab: any
    finishedJobsCount: number;
    activeJobsCount: number;
    navigation?: any;
    jobData: any[];
    // onViewMorePress: () => void;
}

const WorkHistoryTabs: React.FC<WorkHistoryTabsProps> = ({
    activeTab,
    setActiveTab,
    finishedJobsCount,
    activeJobsCount,
    navigation,
    jobData,
    // onViewMorePress
}) => {
    const [visibleCount, setVisibleCount] = useState(2);

    const handleActiveTab = (tabType: string) => {
        setActiveTab(tabType);
        setVisibleCount(2); // Reset on tab change
    };

    const handleViewMore = () => {
        setVisibleCount(prev => prev + 5);
        // onViewMorePress(); // Call parent handler
    };

    const visibleJobs = jobData.slice(0, visibleCount);

    const renderItem = ({ item }: { item: any }) => (
        <View>
            <WorkHistoryCard
                title={item.title}
                rating={item.rating}
                dateRange={item.dateRange}
                description={item.description}
                amount={item.amount}
            />
            <View style={{ paddingVertical: 16 }}>
                <LineSeparator />
            </View>
        </View>
    );

    return (
        <View style={statusTabsStyles.container}>
            <View style={[statusTabsStyles.tabsContainer, { marginBottom: 10 }]}>
                <TouchableOpacity
                    style={[
                        statusTabsStyles.tab,
                        activeTab === WORK_HISTORY_TABS.FINISHED_JOBS && statusTabsStyles.activeTab,
                    ]}
                    onPress={() => handleActiveTab(WORK_HISTORY_TABS.FINISHED_JOBS)}
                >
                    <Text style={[
                        statusTabsStyles.tabText,
                        activeTab === WORK_HISTORY_TABS.FINISHED_JOBS && statusTabsStyles.activeTabText
                    ]}>
                        {WORK_HISTORY_TABS.FINISHED_JOBS} ({finishedJobsCount})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        statusTabsStyles.tab,
                        activeTab === WORK_HISTORY_TABS.ACTIVE_JOBS && statusTabsStyles.activeTab,
                    ]}
                    onPress={() => handleActiveTab(WORK_HISTORY_TABS.ACTIVE_JOBS)}
                >
                    <Text style={[
                        statusTabsStyles.tabText,
                        activeTab === WORK_HISTORY_TABS.ACTIVE_JOBS && statusTabsStyles.activeTabText
                    ]}>
                        {WORK_HISTORY_TABS.ACTIVE_JOBS} ({activeJobsCount})
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={statusTabsStyles.contentContainer}>
                <FlatList
                    data={visibleJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={statusTabsStyles.content}
                />
                {visibleCount < jobData.length && (
                    // <TouchableOpacity onPress={handleViewMore} style={styles.viewMoreButton}>
                    //     <Text style={reuseableTextStyles.title}>View More</Text>
                    // </TouchableOpacity>
                    <CustomButton
                        title='View More'
                        onPress={handleViewMore}
                        style={styles.viewMoreButton}
                    />
                )}
                {/* <View style={{ paddingVertical: 10 }}>
                    <LineSeparator />
                </View> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewMoreButton: {
        alignSelf: 'center',
        width: "35%",
        marginTop: -6,
    },
    viewMoreText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default WorkHistoryTabs;
