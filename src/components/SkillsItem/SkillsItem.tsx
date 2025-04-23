import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'

// ✅ Define the props interface
interface skillsItemProps {
    label: string
}

const SkillsItem: React.FC<skillsItemProps> = ({ label }) => {

    return (
        <TouchableOpacity style={styles.categoryItem}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

export default SkillsItem

const styles = StyleSheet.create({
    categoryItem: {
        alignSelf: 'flex-start', // <-- Important: keeps width only as wide as the content
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 36,
        backgroundColor: COLORS.Yellow,
    },
    label: {
        fontSize: fontSize[12],
        fontFamily: FONTS.interRegular,
        color: COLORS.Navy,
        textAlign: 'center',
    },
})

