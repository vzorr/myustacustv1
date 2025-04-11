import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../config/themes/theme'

const CategoryItem = ({ iconName, label }: { iconName: React.ReactNode, label: string }) => {
    return (
        <TouchableOpacity style={styles.categoryItem}>
            <View>
                {iconName}
            </View>
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
        gap: 8
    },
    categoryLabel: {
        fontSize: 12,
        color: COLORS.Navy,
        textAlign: 'center',
    },
})
