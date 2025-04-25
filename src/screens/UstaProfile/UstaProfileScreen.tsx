import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { UserNavigationRootProps } from '../../types/stacksParams';
import AppHeader from '../../components/AppHeader/AppHeader';
import { COLORS, fontSize } from '../../config/themes/theme';
import Heading from '../../components/Heading/Heading';
import SubHeading from '../../components/Heading/SubHeading';
import { useSelector } from 'react-redux';
import { client } from '../../apiManager/Client';
import LoadingScreen from '../../components/Loader/LoadingScreen';
import UstaPortfolioList from './UstaPortfolioList';
import WorkHistoryTabs from './WorkHistoryTabs';
import { WORK_HISTORY_TABS } from '../../config/constants/constants';
import SkillsItem from '../../components/SkillsItem/SkillsItem';

const UstaProfileScreen: React.FC<UserNavigationRootProps<"UstaProfile">> = (props) => {
    const [activeTab, setActiveTab] = useState(WORK_HISTORY_TABS.FINISHED_JOBS)
    const portfolioData = [
        {
            id: '1',
            imageUrl: 'https://example.com/office1.jpg',
            workText: 'Modern Office',
            workTypeTxt: 'Transformations',
        },
        {
            id: '2',
            imageUrl: 'https://example.com/livingroom.jpg',
            workText: 'Cozy Living Room',
            workTypeTxt: 'Renovations',
        },
        {
            id: '3',
            imageUrl: 'https://example.com/kitchen.jpg',
            workText: 'Luxury Kitchen',
            workTypeTxt: 'Upgrades',
        },
        {
            id: '4',
            imageUrl: 'https://example.com/bathroom.jpg',
            workText: 'Elegant Bathroom',
            workTypeTxt: 'Remodel',
        },
        {
            id: '5',
            imageUrl: 'https://example.com/balcony.jpg',
            workText: 'Balcony Design',
            workTypeTxt: 'Makeover',
        },
        {
            id: '6',
            imageUrl: 'https://example.com/bedroom.jpg',
            workText: 'Peaceful Bedroom',
            workTypeTxt: 'Interior',
        },
    ];
    const mockData = [
        {
            id: '1',
            title: 'Looking for an Experience Tiler',
            rating: 5.0,
            dateRange: 'Jan 2025 - Mar 2025',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
            amount: '60,000 ALL',
        },
        {
            id: '2',
            title: 'Bathroom Renovation',
            rating: 4.0,
            dateRange: 'Feb 2025 - Apr 2025',
            description: 'Renovated the entire bathroom with tiles and plumbing upgrades.',
            amount: '45,000 ALL',
        },
        {
            id: '3',
            title: 'Office Tiling Work',
            rating: 3.5,
            dateRange: 'Mar 2025 - Jun 2025',
            description: 'Corporate office space tiled with high-grade ceramic tiles.',
            amount: '70,000 ALL',
        },
        {
            id: '4',
            title: 'Kitchen Floor Tiling',
            rating: 4.5,
            dateRange: 'Apr 2025 - May 2025',
            description: 'Installed marble tiles in the kitchen area.',
            amount: '55,000 ALL',
        },
        {
            id: '5',
            title: 'Backyard Patio',
            rating: 5,
            dateRange: 'May 2025 - Jul 2025',
            description: 'Outdoor tiling project for backyard patio.',
            amount: '65,000 ALL',
        },
        {
            id: '6',
            title: 'Entrance Walkway',
            rating: 2,
            dateRange: 'Jun 2025 - Jul 2025',
            description: 'Simple tile work done for main entrance.',
            amount: '30,000 ALL',
        },
        {
            id: '7',
            title: 'Hotel Lobby Flooring',
            rating: 4.8,
            dateRange: 'Jul 2025 - Aug 2025',
            description: 'Large-scale marble tiling for luxury hotel lobby.',
            amount: '120,000 ALL',
        },
        {
            id: '8',
            title: 'Swimming Pool Surround',
            rating: 4.2,
            dateRange: 'Aug 2025 - Sep 2025',
            description: 'Non-slip tiles installed around residential pool.',
            amount: '85,000 ALL',
        },
        {
            id: '9',
            title: 'Restaurant Kitchen Tiles',
            rating: 3.8,
            dateRange: 'Sep 2025 - Oct 2025',
            description: 'Heat-resistant tiles for commercial kitchen.',
            amount: '75,000 ALL',
        },
        {
            id: '10',
            title: 'Balcony Tile Replacement',
            rating: 4.0,
            dateRange: 'Oct 2025 - Nov 2025',
            description: 'Replaced worn-out tiles on apartment balcony.',
            amount: '40,000 ALL',
        },
        {
            id: '11',
            title: 'Shopping Mall Flooring',
            rating: 4.6,
            dateRange: 'Nov 2025 - Dec 2025',
            description: 'Durable ceramic tiles for high-traffic mall area.',
            amount: '150,000 ALL',
        },
        {
            id: '12',
            title: 'Boutique Store Tiling',
            rating: 4.3,
            dateRange: 'Dec 2025 - Jan 2026',
            description: 'Premium decorative tiles for fashion boutique.',
            amount: '65,000 ALL',
        },
        {
            id: '13',
            title: 'Gym Floor Renovation',
            rating: 4.1,
            dateRange: 'Jan 2026 - Feb 2026',
            description: 'Shock-absorbent tiles for fitness center.',
            amount: '90,000 ALL',
        },
        {
            id: '14',
            title: 'Hospital Bathroom Tiles',
            rating: 4.7,
            dateRange: 'Feb 2026 - Mar 2026',
            description: 'Antibacterial tiles for medical facility bathrooms.',
            amount: '110,000 ALL',
        },
        {
            id: '15',
            title: 'University Hallway Flooring',
            rating: 4.4,
            dateRange: 'Mar 2026 - Apr 2026',
            description: 'Long-lasting tiles for academic building corridors.',
            amount: '130,000 ALL',
        }
    ];
    // const skills = [
    //     'Construction & Repairs',
    //     'Tile Installation',
    //     'Bathroom Remodeling',
    //     'Kitchen Renovation',
    //     'Flooring Installation',
    //     'Painting Services',
    //     'Plumbing Work',
    //     'Electrical Work',
    //     'Drywall Installation',
    //     'Carpentry',
    //     'Masonry',
    //     'Roofing',
    //     'Demolition',
    //     'Concrete Work',
    //     'Home Maintenance'
    // ];

    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const { token }: any = useSelector((state: any) => state?.accessToken)
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [otherUserData, setOtherUserData] = useState<any>("");
    const otherUserId = props?.route.params?.otherUserId
    const jobId = props?.route.params?.jobId
    const handleViewProfile = () => {
        // props.navigation.navigate('UstaProfile', { otherUserId: appDetail?.usta?.id });
    };
    const handlePortfolio = (id: any) => () => {
        props.navigation.navigate('UstaPortfolioDetail', { portfolioId: id, jobId: jobId });
    }
    const handleInterview = () => {
        // props.navigation.navigate('ApplicationDetail');
    };

    const getUserDetail = async () => {
        try {
            const userToken = token ? token : userData?.token
            if (userToken) {
                if (userData?.token) {
                    let response = await client(userToken).get(`account/usta-profile/${otherUserId}`)
                    let res = response?.data
                    setIsloading(false)
                    if (res?.code !== 200) {
                        return
                    }
                    setIsloading(false)
                    if (res?.result) {
                        setOtherUserData(res?.result)
                    }
                }
            }
        } catch (error) {
            setIsloading(false)
            console.log("errrrorr", error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await getUserDetail();
        };
        fetchData();

    }, [userData?.token, token]);
    const skills = otherUserData?.professionalDetail?.experiences
    const renderScreenContent = () => (
        <View style={styles.contentContainer}>
            <View>
                <Heading
                    headingText='ABOUT ME'
                    style={{ fontSize: fontSize[16] }}
                />
                <SubHeading
                    subHeadingText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                />
            </View>
            <Heading
                headingText='PORTFOLIO'
                style={{ fontSize: fontSize[16] }}
            />
            <UstaPortfolioList data={otherUserData?.portfolios} handlePortfolio={handlePortfolio} />
            <Heading
                headingText='WORK HISTORY'
                style={{ fontSize: fontSize[16] }}
            />
            <WorkHistoryTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                jobData={mockData}
                finishedJobsCount={10}
                activeJobsCount={5}
            />
            <Heading
                headingText='SKILLS'
                style={{ fontSize: fontSize[16] }}
                containerStyle={{ marginTop: -10 }}
            />
            {/* Skills grid using map and flexWrap */}
            <View style={styles.skillsContainer}>

                {skills?.map((skill: any, index: any) => (
                    <View key={index} style={styles.skillItem}>
                        <SkillsItem label={skill.category} />
                    </View>
                ))}
            </View>

        </View>
    )
    const screenData = [{ id: '1' }];
    return (
        <>
            {isLoading ?
                <LoadingScreen /> :
                <SafeAreaView style={styles.container}>
                    <AppHeader
                        onMenuPress={() => { }}
                        onNotificationPress={() => { }}
                        showNotificationBadge={true}
                        badgeCount={5}
                        isProfile={true}
                        isChat={true}
                        userName={otherUserData?.firstName + " " + otherUserData?.lastName}
                        userLocation={otherUserData && otherUserData?.locations && otherUserData?.locations[0]?.address}
                        imageUrl={otherUserData?.profilePicture}
                    />
                    <FlatList
                        data={screenData}
                        keyExtractor={item => item.id}
                        renderItem={() => renderScreenContent()}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            }
        </>
    )
}

export default UstaProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 20,
        gap: 10,
        paddingBottom: 120
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginHorizontal: -2,
    },
    skillItem: {
        paddingHorizontal: 2,
        paddingVertical: 3,
    },
})