import { FlatList, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserNavigationRootProps } from '../../types/stacksParams';
import Heading from '../../components/Heading/Heading';
import { COLORS, fontSize } from '../../config/themes/theme';
import SubHeading from '../../components/Heading/SubHeading';
import SkillsItem from '../../components/SkillsItem/SkillsItem';
import JobDetailHeader from '../../components/AppHeader/JobDetailHeader';
import LineSeparator from '../../components/LineSeparator/LineSeparator';
import StatusUpdate from '../../components/HomeComponents/StatusUpdate';
import { getCustomTimeAgo } from '../../config/constants/constants';
import { client } from '../../apiManager/Client';
import { useSelector } from 'react-redux';
import moment from 'moment';
const skills = [
    'Construction & Repairs',
    'Tile Installation',
];

const UstaPortfolioDetailScreen: React.FC<UserNavigationRootProps<"UstaPortfolioDetail">> = (props) => {
    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const { token }: any = useSelector((state: any) => state?.accessToken)
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [portFolioDetail, setPortFolioDetail] = useState<any>("");
    const applicationId = props?.route.params?.proposalId
    const portfolioId = props.route.params?.portfolioId
    const jobId = props.route.params?.jobId
    console.log("jobidddd", jobId)
    const handleViewProfile = () => {
        props.navigation.navigate('UstaProfile', { otherUserId: portFolioDetail?.usta?.id });
    };
    const handleInterview = () => {
        // props.navigation.navigate('ApplicationDetail');
    };

    const getAppDetail = async () => {
        try {
            const userToken = token ? token : userData?.toke
            if (userToken) {
                if (userData?.token) {
                    let response = await client(userToken).get(`account/portfolio/${portfolioId}`)
                    let res = response?.data
                    console.log("resresresresresresresres", res)
                    setIsloading(false)
                    if (res?.code !== 200) {
                        return
                    }
                    setIsloading(false)
                    if (res?.result) {
                        setPortFolioDetail(res?.result)
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
            await getAppDetail();
        };
        fetchData();

    }, [userData?.token, token]);
    // const jobDetail= setPortFolioDetail?.job
    // const time = getCustomTimeAgo(jobDetail?.createdAt)
    // const customer = jobDetail?.customer

    const handleNav = () => {
        props.navigation.replace('PostedJobDetailScreen', { jobId: jobId })
    }

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
            <View>
                <Heading
                    headingText='SKILLS'
                    style={{ fontSize: fontSize[16] }}
                />
                {/* Skills grid using map and flexWrap */}
                <View style={styles.skillsContainer}>
                    <View style={styles.skillItem}>
                        <SkillsItem label={portFolioDetail?.category} />
                    </View>
                    {/* {skills.map((skill, index) => (
                    <View key={index} style={styles.skillItem}>
                    <SkillsItem label={skill} />
                    </View>
                    ))} */}
                </View>
            </View>
            <View>
                {portFolioDetail?.media?.map((item: any, index: any) => (
                    <View style={styles.imgContainer}
                        key={index}
                    >
                        <Image
                            // source={{ uri: imageUrl }}
                            source={{ uri: item?.url }}
                            style={{
                                width: "100%",
                                height: 251.25,
                                borderRadius: 8,
                            }}
                        />
                    </View>
                ))
                }
                <SubHeading
                    subHeadingText={portFolioDetail?.description}
                    subTitle={{ textAlign: 'center' }}
                />
            </View>
            <View style={{ paddingTop: 10 }}>
                <LineSeparator />
            </View>
            <View style={{ gap: 4 }}>

                <Heading
                    headingText='RELATED PROJECT'
                    style={{ fontSize: fontSize[16] }}
                />
                <SubHeading
                    subHeadingText='4 days ago'
                />
                <TouchableOpacity onPress={handleNav}>
                    <View style={{ gap: 8 }}>
                        <Heading
                            headingText='Experienced Mason Wanted'
                            style={{ fontSize: fontSize[16] }}
                        />
                        <StatusUpdate
                            text={"Completed"}
                            textColor={COLORS.completedTxtColor}
                            bgColor={COLORS.completedBgColor}
                            borderColor={COLORS.completedTxtColor}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
    const screenData = [{ id: '1' }];
    return (
        <SafeAreaView style={styles.container}>
            <JobDetailHeader
                headingTitle={portFolioDetail?.usta?.firstName + " " + portFolioDetail?.usta?.lastName}
                // jobTitle='Tile installations'
                jobProviderName='Igli Faslija'
                time={moment(portFolioDetail?.createdAt).format('MMM DD, YYYY')}
                isPortfolio={true}
                jobTitle={portFolioDetail?.title}
            // jobProviderName={customer?.firstName + " " + customer?.lastName}
            // time={time}
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
            />
        </SafeAreaView>
    )
}

export default UstaPortfolioDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    contentContainer: {
        flexGrow: 1,
        padding: 20,
        gap: 10,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginHorizontal: -2,
    },
    skillItem: {
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    imgContainer: {
        width: "100%",
        height: 251.25,
        borderRadius: 8,
        marginBottom: 5
    },
})