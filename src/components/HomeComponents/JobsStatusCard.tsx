import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'
import Heading from '../Heading/Heading'
import CustomButton from '../Buttons/CustomButton'
import { reuseableTextStyles } from '../../styles/reuseableTextStyles'
import StatusUpdate from './StatusUpdate'
import LineSeparator from '../LineSeparator/LineSeparator'

interface JobsStatusCardProps {
    time: string;
    jobTitle: string;
    statusText: string;
    statusTextColor: string;
    statusBgColor: string;
    statusBorderColor: string;
    applicationsCount?: string;
    milestones?: string;
    // buttonTitle?: string;
    onPress?: () => void;
    onButtonPress?: () => void;
    // BtnWidth: any
}

const JobsStatusCard: React.FC<JobsStatusCardProps> = ({
    time,
    jobTitle,
    statusText,
    statusTextColor,
    statusBgColor,
    statusBorderColor,
    applicationsCount,
    milestones,
    // buttonTitle = 'View Applications',
    onPress,
    onButtonPress = () => { },
    // BtnWidth
}) => {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={styles.cardInnerContainer}
                onPress={onPress}
                activeOpacity={0.7}
            >
                <View>
                    <Text style={styles.timeStyle}>{time}</Text>
                </View>
                <Heading
                    headingText={jobTitle}
                    style={styles.jobTitle}
                    containerStyle={styles.jobTitleContainer}
                />
                <StatusUpdate
                    text={statusText}
                    textColor={statusTextColor}
                    bgColor={statusBgColor}
                    borderColor={statusBorderColor}
                />
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
            {(statusText === "Ongoing" ?
                <CustomButton
                    title={"View Progress"}
                    onPress={onButtonPress}
                    style={{ width: SIZES.wp(45) }}
                /> : statusText === "Pending" ?
                    <CustomButton
                        title={"View Applications"}
                        onPress={onButtonPress}
                        style={{ width: SIZES.wp(50) }}
                    /> :
                    <CustomButton
                        title={"Leave Review"}
                        onPress={onButtonPress}
                        style={{ width: SIZES.wp(45) }}
                    />
            )}
            <View style={{ paddingVertical: 16 }}>
                <LineSeparator />
            </View>
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