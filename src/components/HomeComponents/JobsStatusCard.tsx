import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'
import Heading from '../Heading/Heading'
import CustomButton from '../Buttons/CustomButton'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'
import StatusUpdate from './StatusUpdate'
import LineSeparator from '../LineSeparator/LineSeparator'
import { getCustomTimeAgo } from '../../config/constants/constants'

interface JobsStatusCardProps {
    time: string;
    jobTitle: string;
    statusText: string;
    applicationsCount?: string;
    milestones?: string;
    handleCardPress?: () => void;
    handleViewButton?: any;
    handleJobDetail?: any;
}

const JobsStatusCard: React.FC<JobsStatusCardProps> = ({
    time,
    jobTitle,
    statusText,
    applicationsCount,
    milestones,
    handleCardPress,
    handleViewButton,
    handleJobDetail
}) => {
    const timeAgo = getCustomTimeAgo(time)
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={styles.cardInnerContainer}
                onPress={handleCardPress}
                activeOpacity={0.7}
            >
                <View>
                    <Text style={styles.timeStyle}>{timeAgo}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleJobDetail }
                >

                    <Heading
                        headingText={jobTitle}
                        style={styles.jobTitle}
                        containerStyle={styles.jobTitleContainer}
                    />
                </TouchableOpacity>
                {statusText === "pending" ?
                    <StatusUpdate
                        text={statusText}
                        textColor={COLORS.statusBtnBorderColor}
                        bgColor={COLORS.statusBtnBgColor}
                        borderColor={COLORS.statusBtnBorderColor}
                    />
                    : statusText === "ongoing" ?
                        <StatusUpdate
                            text={statusText}
                            textColor={COLORS.ongoingStatusColor}
                            bgColor={COLORS.ongoingBgColor}
                            borderColor={COLORS.ongoingStatusColor}
                        />
                        :
                        <StatusUpdate
                            text={statusText}
                            textColor={COLORS.completedTxtColor}
                            bgColor={COLORS.completedBgColor}
                            borderColor={COLORS.completedBgColor}
                        />
                }
                {(applicationsCount || milestones) ?
                    <View style={styles.countContainer}>
                        <Text style={[reuseableTextStyles.subTitle, styles.countTxt]}>{applicationsCount ? "Applications:" : "Milestones"}</Text>
                        <Text style={[reuseableTextStyles.subTitle, styles.countTxt]}>{applicationsCount ? applicationsCount : milestones}</Text>
                    </View>
                    :
                    <View>
                        <Text style={[reuseableTextStyles.subTitle, styles.countTxt]}>No Applications Yet</Text>
                    </View>
                }
            </TouchableOpacity>
            {(statusText === "ongoing" ?
                <CustomButton
                    title={"View Progress"}
                    onPress={handleViewButton}
                    style={{ width: SIZES.wp(45) }}
                /> : statusText === "pending" ?
                    <CustomButton
                        title={"View Applications"}
                        onPress={handleViewButton}
                        style={{ width: SIZES.wp(50) }}
                    /> :
                    <CustomButton
                        title={"Leave Review"}
                        onPress={handleViewButton}
                        style={{ width: SIZES.wp(45) }}
                    />
            )}
        </View>
    )
}

export default JobsStatusCard

const styles = StyleSheet.create({
    cardContainer: {
        gap: 8,
        backgroundColor: COLORS.white,
    },
    cardInnerContainer: {
        gap: 8
    },
    jobTitleContainer: {
        width: "90%",
    },
    jobTitle: {
        fontSize: fontSize[16]
    },
    timeStyle: {
        fontSize: fontSize[12],
        color: COLORS.GreyedOut,
        fontFamily: FONTS.interRegular,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    countTxt: {
        fontSize: fontSize[12],
        color: COLORS.GreyedOut,
        marginStart: 5
    }
})