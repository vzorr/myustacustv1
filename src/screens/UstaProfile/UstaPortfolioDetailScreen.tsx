import { FlatList, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../types/stacksParams';
import Heading from '../../components/Heading/Heading';
import { COLORS, fontSize } from '../../config/themes/theme';
import SubHeading from '../../components/Heading/SubHeading';
import SkillsItem from '../../components/SkillsItem/SkillsItem';
import JobDetailHeader from '../../components/AppHeader/JobDetailHeader';
import LineSeparator from '../../components/LineSeparator/LineSeparator';
import StatusUpdate from '../../components/HomeComponents/StatusUpdate';
const skills = [
    'Construction & Repairs',
    'Tile Installation',
];

const UstaPortfolioDetailScreen: React.FC<UserNavigationRootProps<"UstaPortfolioDetail">> = (props) => {

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
                headingText='SKILLS'
                style={{ fontSize: fontSize[16] }}
            />
            {/* Skills grid using map and flexWrap */}
            <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                    <View key={index} style={styles.skillItem}>
                        <SkillsItem label={skill} />
                    </View>
                ))}
            </View>
            <View style={{ gap: 2 }}>
                <View style={styles.imgContainer}>
                    <Image
                        // source={{ uri: imageUrl }}
                        source={require('../../assets/images/office.jpg')}
                        style={{
                            width: "100%",
                            height: 251.25,
                            borderRadius: 8,
                        }}
                    />
                </View>
                <SubHeading
                    subHeadingText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    subTitle={{ textAlign: 'center' }}
                />
            </View>
            <View style={{ paddingTop: 10 }}>
                <LineSeparator />
            </View>
            <Heading
                headingText='RELATED PROJECT'
                style={{ fontSize: fontSize[16] }}
            />
            <TouchableOpacity onPress={() => props.navigation.replace('PostedJobDetailScreen')}>
                <SubHeading
                    subHeadingText='4 days ago'
                />
                <View style={{ gap: 4 }}>
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
    )
    const screenData = [{ id: '1' }];
    return (
        <SafeAreaView style={styles.container}>
            <JobDetailHeader
                headingTitle='Applier Name'
                jobTitle='Tile installations'
                jobProviderName='Igli Faslija'
                time='31 January 2025'
                isPortfolio={true}
            />
            <FlatList
                data={screenData}
                keyExtractor={item => item.id}
                renderItem={() => renderScreenContent()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
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
        paddingVertical: 5,
    },
    imgContainer: {
        width: "100%",
        height: 251.25,
        borderRadius: 8,
    },
})