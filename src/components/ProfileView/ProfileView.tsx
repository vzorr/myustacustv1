// components/ProfileView/ProfileView.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, fontSize } from '../../config/themes/theme';
import Heading from '../Heading/Heading';
import SubHeading from '../Heading/SubHeading';
import LineSeparator from '../LineSeparator/LineSeparator';
import { WORK_HISTORY_TABS } from '../../config/constants/constants';
import WorkHistoryCard from '../WorkHistoryCard/WorkHistoryCard';
import LoadingScreen from '../Loader/LoadingScreen';
import { SVGIcons } from '../../config/constants/svg';
import { useProfileData } from '../../hooks/useProfileData';

interface ProfileViewProps {
    userId?: string | null;
    userRole?: 'CUSTOMER' | 'USTA' | null;
    onEditPress?: () => void;
    showEditButton?: boolean;
    showWorkHistory?: boolean;
    containerStyle?: any;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
    userId,
    userRole,
    onEditPress,
    showEditButton = true,
    showWorkHistory = true,
    containerStyle
}) => {
    const [activeTab, setActiveTab] = useState(WORK_HISTORY_TABS.FINISHED_JOBS);
    
    // Use the custom hook with parameters
    const {
        isLoading,
        profileData,
        workHistory,
        activeJobs,
        reviews,
        userRole: determinedRole,
        isOwnProfile
    } = useProfileData({ userId, userRole });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!profileData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to load profile</Text>
            </View>
        );
    }

    // Render profile details based on user role
    const renderProfileDetails = () => {
        if (determinedRole === 'USTA') {
            return (
                <>
                    {/* Bio/About section */}
                    <View style={{ gap: 8 }}>
                        <View style={styles.headingContainer}>
                            <Heading
                                headingText='ABOUT SERVICE PROVIDER'
                                style={{ fontSize: fontSize[16] }}
                            />
                            {showEditButton && isOwnProfile && onEditPress && (
                                <TouchableOpacity style={styles.editIconContainer} onPress={onEditPress}>
                                    <SVGIcons.editIcon width={16} height={16} stroke={COLORS.white} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <SubHeading
                            subHeadingText={profileData?.bio || profileData?.aboutMe || 'Professional service provider dedicated to delivering quality work.'}
                        />
                    </View>

                    <LineSeparator />

                    {/* Skills section */}
                    {profileData?.skills && profileData.skills.length > 0 && (
                        <>
                            <View style={{ gap: 8 }}>
                                <Heading
                                    headingText='SKILLS'
                                    style={{ fontSize: fontSize[16] }}
                                />
                                <View style={styles.skillsContainer}>
                                    {profileData.skills.map((skill: string, index: number) => (
                                        <View key={index} style={styles.skillChip}>
                                            <Text style={styles.skillText}>{skill}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <LineSeparator />
                        </>
                    )}

                    {/* Experience and Rate */}
                    <View style={styles.statsContainer}>
                        {profileData?.experience && (
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Experience</Text>
                                <Text style={styles.statValue}>{profileData.experience} years</Text>
                            </View>
                        )}
                        {profileData?.hourlyRate && (
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Hourly Rate</Text>
                                <Text style={styles.statValue}>${profileData.hourlyRate}/hr</Text>
                            </View>
                        )}
                        {profileData?.rating && (
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Rating</Text>
                                <Text style={styles.statValue}>⭐ {profileData.rating.toFixed(1)}</Text>
                            </View>
                        )}
                        {profileData?.totalJobs !== undefined && (
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>Jobs</Text>
                                <Text style={styles.statValue}>{profileData.totalJobs}</Text>
                            </View>
                        )}
                    </View>

                    {showWorkHistory && <LineSeparator />}
                </>
            );
        } else {
            // Customer profile
            return (
                <>
                    <View style={{ gap: 8 }}>
                        <View style={styles.headingContainer}>
                            <Heading
                                headingText='ABOUT CUSTOMER'
                                style={{ fontSize: fontSize[16] }}
                            />
                            {showEditButton && isOwnProfile && onEditPress && (
                                <TouchableOpacity style={styles.editIconContainer} onPress={onEditPress}>
                                    <SVGIcons.editIcon width={16} height={16} stroke={COLORS.white} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <SubHeading
                            subHeadingText={profileData?.aboutMe || 'A detail-oriented and communicative customer who values quality work and professionalism.'}
                        />
                    </View>

                    {showWorkHistory && <LineSeparator />}
                </>
            );
        }
    };

    // Determine which data to display based on active tab
    const getDisplayData = () => {
        if (determinedRole === 'USTA' && activeTab === 'REVIEWS') {
            return reviews;
        }
        return activeTab === WORK_HISTORY_TABS.FINISHED_JOBS ? workHistory : activeJobs;
    };

    const displayData = getDisplayData();

    return (
        <ScrollView style={[styles.container, containerStyle]} showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
                {/* Profile header with name and basic info */}
                <View style={styles.profileHeader}>
                    <Text style={styles.userName}>
                        {profileData?.firstName} {profileData?.lastName}
                    </Text>
                    {profileData?.locations?.[0]?.address && (
                        <Text style={styles.location}>
                            📍 {profileData.locations[0].address}
                        </Text>
                    )}
                </View>

                <LineSeparator />

                {renderProfileDetails()}

                {/* Work History / Reviews Section */}
                {showWorkHistory && isOwnProfile && (
                    <View style={{ flex: 1 }}>
                        <Heading
                            headingText={determinedRole === 'USTA' ? 'WORK HISTORY' : 'JOB HISTORY'}
                            style={{ fontSize: fontSize[16] }}
                        />
                        
                        {/* Tab switcher */}
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
                                    COMPLETED ({workHistory.length})
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
                                    ACTIVE ({activeJobs.length})
                                </Text>
                            </TouchableOpacity>

                            {determinedRole === 'USTA' && (
                                <TouchableOpacity
                                    style={[
                                        styles.tab,
                                        activeTab === 'REVIEWS' && styles.activeTab,
                                    ]}
                                    onPress={() => setActiveTab('REVIEWS')}
                                >
                                    <Text style={[
                                        styles.tabText,
                                        activeTab === 'REVIEWS' && styles.activeTabText
                                    ]}>
                                        REVIEWS ({reviews.length})
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Work history / Reviews list */}
                        {displayData.map((item, index) => (
                            <View key={item.id || index}>
                                <WorkHistoryCard
                                    title={item.title || 'Review'}
                                    rating={item.rating || 5.0}
                                    dateRange={`${new Date(item.startDate || item.createdAt).toLocaleDateString()} - ${item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Present'}`}
                                    description={item.description || item.review || item.comment}
                                    amount={item.budget ? `${item.budget} ${item.currency || 'ALL'}` : undefined}
                                />
                                {index < displayData.length - 1 && (
                                    <View style={{ paddingVertical: 16 }}>
                                        <LineSeparator />
                                    </View>
                                )}
                            </View>
                        ))}

                        {displayData.length === 0 && (
                            <View style={styles.emptyStateContainer}>
                                <Text style={styles.emptyStateText}>
                                    {activeTab === WORK_HISTORY_TABS.FINISHED_JOBS
                                        ? 'No completed work yet.'
                                        : activeTab === WORK_HISTORY_TABS.ACTIVE_JOBS
                                        ? 'No active work at the moment.'
                                        : 'No reviews yet.'}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Reviews only for USTA profiles when viewing others */}
                {!isOwnProfile && determinedRole === 'USTA' && reviews.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        <Heading
                            headingText='REVIEWS'
                            style={{ fontSize: fontSize[16] }}
                        />
                        {reviews.slice(0, 3).map((review, index) => (
                            <View key={review.id || index}>
                                <WorkHistoryCard
                                    title="Customer Review"
                                    rating={review.rating || 5.0}
                                    dateRange={new Date(review.createdAt).toLocaleDateString()}
                                    description={review.comment || review.review}
                                />
                                {index < 2 && index < reviews.length - 1 && (
                                    <View style={{ paddingVertical: 8 }}>
                                        <LineSeparator />
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        padding: 20,
        gap: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: fontSize[16],
        color: COLORS.GreyedOut,
    },
    profileHeader: {
        alignItems: 'center',
        gap: 8,
    },
    userName: {
        fontSize: fontSize[20],
        fontWeight: 'bold',
        color: COLORS.Navy,
    },
    location: {
        fontSize: fontSize[14],
        color: COLORS.GreyedOut,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editIconContainer: {
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
        backgroundColor: COLORS.Navy,
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
        padding: 40,
    },
    emptyStateText: {
        fontSize: fontSize[14],
        color: COLORS.GreyedOut,
        textAlign: 'center',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillChip: {
        backgroundColor: COLORS.Navy + '20',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    skillText: {
        fontSize: fontSize[12],
        color: COLORS.Navy,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: fontSize[12],
        color: COLORS.GreyedOut,
        marginBottom: 4,
    },
    statValue: {
        fontSize: fontSize[16],
        fontWeight: '600',
        color: COLORS.Navy,
    },
});