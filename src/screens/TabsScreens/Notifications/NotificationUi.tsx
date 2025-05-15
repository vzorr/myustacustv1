import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { client } from '../../../apiManager/Client';
import { useSelector } from 'react-redux';
import JobsStatusCard from '../../../components/HomeComponents/JobsStatusCard';
import LineSeparator from '../../../components/LineSeparator/LineSeparator';
import FooterLoader from '../../../components/Loader/FooterLoader';
import { NOTIFICATION_TABS } from '../../../config/constants/constants';
import NotificationCard from './NotificationCard';
import { notiiStyles } from './NotiiStyles';

const NotificationUi = (props: any) => {
    const { activeTab, setActiveTab, isLoading, setIsloading, NotiiData } = props

    const handleActiveTab = (tabType: string) => {
        setActiveTab(tabType)
    };
    const renderItem = ({ item, index }: { item: any, index: any }) => (
        <NotificationCard
            chatDate={item?.time}
            NotificationTetx={item?.notification}
            handleChatNav={() => { }}
        />
    );

    return (
        <View style={notiiStyles.notiContainer}>
            <View style={notiiStyles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        notiiStyles.tab,
                        activeTab === NOTIFICATION_TABS.ACTIVITY && notiiStyles.activeTab,
                    ]}
                    onPress={() => handleActiveTab(NOTIFICATION_TABS.ACTIVITY)}
                >
                    <Text style={[
                        notiiStyles.tabText,
                        activeTab === NOTIFICATION_TABS.ACTIVITY && notiiStyles.activeTabText
                    ]}>
                        {NOTIFICATION_TABS.ACTIVITY}
                    </Text>
                    {activeTab !== NOTIFICATION_TABS.ACTIVITY &&
                        <View style={notiiStyles.dotStyle} />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        notiiStyles.tab,
                        activeTab === NOTIFICATION_TABS.CONTRACTS && notiiStyles.activeTab,
                    ]}
                    onPress={() => handleActiveTab(NOTIFICATION_TABS.CONTRACTS)}
                >
                    <Text style={[
                        notiiStyles.tabText,
                        activeTab === NOTIFICATION_TABS.CONTRACTS && notiiStyles.activeTabText
                    ]}>
                        {NOTIFICATION_TABS.CONTRACTS}
                    </Text>
                    {activeTab !== NOTIFICATION_TABS.CONTRACTS &&
                        <View style={notiiStyles.dotStyle} />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        notiiStyles.tab,
                        activeTab === NOTIFICATION_TABS.REMINDERS && notiiStyles.activeTab,
                    ]}
                    onPress={() => handleActiveTab(NOTIFICATION_TABS.REMINDERS)}
                >
                    <Text style={[
                        notiiStyles.tabText,
                        activeTab === NOTIFICATION_TABS.REMINDERS && notiiStyles.activeTabText
                    ]}>
                        {NOTIFICATION_TABS.REMINDERS}
                    </Text>
                    {activeTab !== NOTIFICATION_TABS.REMINDERS &&
                        <View style={notiiStyles.dotStyle} />
                    }
                </TouchableOpacity>
            </View>
            <View style={notiiStyles.tabContentContainer}>
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <FlatList
                        data={NotiiData}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={notiiStyles.content}
                        ListEmptyComponent={
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', padding: 20 }}>No Jobs Found</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </View>
    );
};

export default NotificationUi;