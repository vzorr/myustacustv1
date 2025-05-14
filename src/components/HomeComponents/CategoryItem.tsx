import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme'
import { SVGIcons } from '../../config/constants/svg'

// ✅ Define the props interface
interface CategoryItemProps {
    iconName: keyof typeof SVGIcons
    label: string
}

const CategoryItem: React.FC<CategoryItemProps> = ({ iconName, label }) => {
    const IconComponent = iconName ? SVGIcons[iconName] : null

    return (
        <TouchableOpacity style={styles.categoryItem}>
            {IconComponent ? <IconComponent /> : null}
            <Text style={styles.categoryLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    categoryItem: {
        flexDirection: 'row',
        alignSelf: 'flex-start', // <-- Important: keeps width only as wide as the content
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        gap: 8,
    },
    categoryLabel: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interMedium,
        fontWeight: 500,
        color: COLORS.Navy,
        textAlign: 'center',
    },
})
