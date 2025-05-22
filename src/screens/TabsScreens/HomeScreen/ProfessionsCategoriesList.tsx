import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../../../components/Heading/Heading'
import { COLORS, fontSize } from '../../../config/themes/theme'
import SubHeading from '../../../components/Heading/SubHeading'
import ProfessionHeading from '../../../components/ProfessionHeading/ProfessionHeading'
import CustomSearchInput from '../../../components/CustomSearchInput/CustomSearchInput'
import LineSeparator from '../../../components/LineSeparator/LineSeparator'

const ProfessionsCategoriesList = (props: any) => {
    const { handleProfessionHeading } = props
    return (
        <View style={styles.listContainer}>
            <View>
                <Heading
                    headingText='Plumbing'
                    style={{ fontSize: fontSize[20] }}
                />
                <SubHeading
                    subHeadingText='Water systems,repairs, and installations'
                />
            </View>
            <CustomSearchInput
                placeholder='Search professions'
                placeholderTextColor={COLORS.Navy}
            />
            <LineSeparator />
            <View>
                <ProfessionHeading
                    title='Plumber'
                    onPress={handleProfessionHeading}
                    iconName='emoji'
                />
            </View>
        </View>
    )
}

export default ProfessionsCategoriesList

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
        gap: 16
    }
})