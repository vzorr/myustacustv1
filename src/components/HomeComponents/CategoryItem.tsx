import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../config/themes/theme'
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
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.wp(35),
        height: SIZES.hp(6),
        borderWidth: 1,
        borderRadius: 36,
        borderColor: COLORS.inputBorder,
        gap: 8,
    },
    categoryLabel: {
        fontSize: 12,
        color: COLORS.Navy,
        textAlign: 'center',
    },
})
