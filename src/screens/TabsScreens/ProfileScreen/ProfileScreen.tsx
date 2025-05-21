import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { UserNavigationRootProps } from '../../../types/stacksParams';
import { COLORS, fontSize } from '../../../config/themes/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import Heading from '../../../components/Heading/Heading';
import SubHeading from '../../../components/Heading/SubHeading';
import LineSeparator from '../../../components/LineSeparator/LineSeparator';
import { WORK_HISTORY_TABS } from '../../../config/constants/constants';
import { useSelector } from 'react-redux';
import WorkHistoryCard from '../../../components/WorkHistoryCard/WorkHistoryCard';
import { client } from '../../../apiManager/Client';
import LoadingScreen from '../../../components/Loader/LoadingScreen';

const ProfileScreen: React.FC<UserNavigationRootProps<"ProfileScreen">> = (props) => {
    // States
    const [activeTab, setActiveTab] = useState(WORK_HISTORY_TABS.FINISHED_JOBS);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<any>(null);
    const [workHistory, setWorkHistory] = useState<any[]>([]);
    const [activeJobs, setActiveJobs] = useState<any[]>([]);
    
    // Get user data and auth token from Redux store
    const { userData }: any = useSelector((state: any) => state?.userInfo);
    const { token }: any = useSelector((state: any) => state?.accessToken);
    
    // Fetch user profile data from API
    // Using useCallback to memoize the function so it won't recreate on every render
    const fetchProfileData = useCallback(async () => {
        try {
            setIsLoading(true);
            const userToken = token ? token : userData?.token;
            
            if (!userToken) {
                console.log("No authentication token available");
                setIsLoading(false);
                return;
            }
            
            // Get user profile data
            const profileResponse = await client(userToken).get('users/customerProfile');
            
            if (profileResponse?.data?.code !== 200) {
                console.log("Failed to fetch profile data");
                setIsLoading(false);
                return;
            }
            
            setProfileData(profileResponse?.data?.result);
            
            // Get work history data (finished jobs)
            const historyResponse = await client(userToken).get('jobs/user/completed');
            
            if (historyResponse?.data?.code === 200 && historyResponse?.data?.result) {
                setWorkHistory(historyResponse?.data?.result?.data || []);
            }
            
            // Get active jobs
            const activeJobsResponse = await client(userToken).get('jobs/user/active');
            
            if (activeJobsResponse?.data?.code === 200 && activeJobsResponse?.data?.result) {
                setActiveJobs(activeJobsResponse?.data?.result?.data || []);
            }
            
        } catch (error) {
            console.log("Error fetching profile data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [token, userData?.token]); // Include token and userData?.token as dependencies
    
    // Load data when component mounts
    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]); // Now correctly include fetchProfileData as a dependency
    
    // Handle menu press
    const handleMenuPress = () => {
        // Add menu handling logic here
    };
    
    // Determine which jobs to display based on active tab
    const displayJobs = activeTab === WORK_HISTORY_TABS.FINISHED_JOBS ? workHistory : activeJobs;
    
    const renderScreenContent = () => (
        <View style={styles.contentContainer}>
            <View>
                <Heading
                    headingText='ABOUT ME'
                    style={{ fontSize: fontSize[16] }}
                />
                <SubHeading
                    subHeadingText={profileData?.aboutMe || 'A detail-oriented and communicative customer who values quality work and professionalism. Their clear expectations and collaborative approach make them a pleasure to work with on any project.'}
                />
            </View>
            
            <LineSeparator />
            
            <View style={{flex: 1}}>
                <Heading
                    headingText='WORK HISTORY'
                    style={{ fontSize: fontSize[16] }}
                />
                
                <View style={styles.tabsContainer}>
                    <TouchableOpacity 
                        style={[
                            styles.tab,
                            activeTab === WORK_HISTORY_TABS.FINISHED_JOBS && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(WORK_HISTORY_TABS.FINISHED_JOBS)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === WORK_HISTORY_TABS.FINISHED_JOBS && styles.activeTabText
                        ]}>
                            {WORK_HISTORY_TABS.FINISHED_JOBS} ({workHistory.length})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[
                            styles.tab,
                            activeTab === WORK_HISTORY_TABS.ACTIVE_JOBS && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(WORK_HISTORY_TABS.ACTIVE_JOBS)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === WORK_HISTORY_TABS.ACTIVE_JOBS && styles.activeTabText
                        ]}>
                            {WORK_HISTORY_TABS.ACTIVE_JOBS} ({activeJobs.length})
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {displayJobs.length > 0 ? (
                    <FlatList
                        data={displayJobs}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <WorkHistoryCard
                                    title={item.title}
                                    rating={item.rating || 5.0}
                                    dateRange={`${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`}
                                    description={item.description}
                                    amount={`${item.budget} ${item.currency || 'ALL'}`}
                                />
                                <View style={{ paddingVertical: 16 }}>
                                    <LineSeparator />
                                </View>
                            </View>
                        )}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={true}
                    />
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <Text style={styles.emptyStateText}>
                            {activeTab === WORK_HISTORY_TABS.FINISHED_JOBS
                                ? "You don't have any completed jobs yet."
                                : "You don't have any active jobs at the moment."}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
    
    if (isLoading) {
        return <LoadingScreen />;
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.Navy} barStyle="light-content" />
            <AppHeader
                onMenuPress={handleMenuPress}
                userName={`${profileData?.firstName || userData?.firstName || 'User'} ${profileData?.lastName || userData?.lastName || ''}`}
                userLocation={profileData?.locations?.[0]?.address || userData?.location?.[0]?.address || 'Location not set'}
                imageUrl={profileData?.profilePicture || userData?.profilePicture || 'https://randomuser.me/api/portraits/men/1.jpg'}
                isProfile={true}
                showNotificationBadge={true}
                badgeCount={profileData?.notifications?.unread || 0}
            />
            
            <FlatList
                data={[{ id: '1' }]} // Just need one item to render the content
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.scrollContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        gap: 16,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    tab: {
        paddingVertical: 5,
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
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: fontSize[14],
        color: COLORS.GreyedOut,
        textAlign: 'center',
    },
});

export default ProfileScreen;
