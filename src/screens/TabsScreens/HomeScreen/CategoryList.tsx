import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SVGIcons } from '../../../config/constants/svg'
import CategoryItem from '../../../components/HomeComponents/CategoryItem'

const categories = [
    { id: '1', icon: <SVGIcons.plusIcon />, label: 'Plumbing' },
    { id: '2', icon: <SVGIcons.searchIcon />, label: 'Electrical' },
    { id: '3', icon: <SVGIcons.HomeIcon />, label: 'Carpenter' },
]

const CategoryList = () => {
    return (
        <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <CategoryItem iconName={item.icon} label={item.label} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            ItemSeparatorComponent={() => <Separator />}
        />
    )
}

const Separator = () => <></>

export default CategoryList

const styles = StyleSheet.create({
    categoriesContainer: {
        paddingVertical: 16,
        gap: 8,
        paddingHorizontal: 20
    },
})
