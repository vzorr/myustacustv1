import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProfessionDetailHeading from './ProfessionDetailHeading'
import { COLORS, fontSize } from '../../../../config/themes/theme'
import SubHeading from '../../../../components/Heading/SubHeading'
import CustomSearchInput from '../../../../components/CustomSearchInput/CustomSearchInput'
import { SVGIcons } from '../../../../config/constants/svg'
import LineSeparator from '../../../../components/LineSeparator/LineSeparator'
import Heading from '../../../../components/Heading/Heading'
import UstaProfileCard from '../../../../components/UstaProfileCard/UstaProfileCard'
import UstaProfileHorizentalCard from '../../../../components/UstaProfileHorizentalCard/UstaProfileHorizentalCard'

const ProfessionDetailScreenUi = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <ProfessionDetailHeading
                    iconName='ApplianceIcon'
                    headingText='Plumbers'
                    textStyle={{ fontSize: fontSize[20] }}
                />
                <SubHeading
                    subHeadingText='Find skilled plumbers near you for repairs, installations,and maintenance'
                />
            </View>
            <View style={styles.filterAndSearchContainer}>
                <View style={{ flex: 1 }}>
                    <CustomSearchInput
                        placeholder="Search professions"
                        placeholderTextColor={COLORS.Navy}
                    />
                </View>
                <TouchableOpacity style={styles.filterContainer}>
                    <SVGIcons.filterIcon />
                </TouchableOpacity>
            </View>
            <LineSeparator />
            <View style={{ gap: 10 }}>
                <Heading
                    headingText='Top Plumbers'
                    style={{ fontSize: fontSize[16] }}
                />
                <UstaProfileCard />
            </View>
            <View style={{ gap: 10 }}>
                <Heading
                    headingText='All Plumbers'
                    style={{ fontSize: fontSize[16] }}
                />
                <UstaProfileHorizentalCard
                    onPress={() => { }}
                    ustaName='John Doe'
                    rating={4.9}
                    distance={3}
                />
            </View>
        </ScrollView>
    )
}

export default ProfessionDetailScreenUi

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16
    },
    filterContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterAndSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    }
})