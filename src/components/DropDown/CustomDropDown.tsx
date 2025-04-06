import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, TextInput, Dimensions } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CustomDropDownProps {
    data: { key: string; value: string }[];
    placeholder: string;
    selectedItems: string[];
    onSelectionChange: (selectedItems: string[]) => void;
    boxStyles?: object;
    dropdownStyles?: object;
    itemStyles?: object;
    isSearch?: boolean;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
    data,
    placeholder,
    selectedItems,
    isSearch,
    onSelectionChange,
    boxStyles = {},
    dropdownStyles = {},
    itemStyles = {},
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const animation = useRef(new Animated.Value(0)).current;
    const dropdownRef = useRef<View>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemPress = (itemValue: string) => {
        const newSelectedItems = [...selectedItems];
        const index = newSelectedItems.indexOf(itemValue);

        if (index > -1) {
            newSelectedItems.splice(index, 1);
        } else {
            newSelectedItems.push(itemValue);
        }

        onSelectionChange(newSelectedItems);
    };

    const filteredData = data.filter(item =>
        item.value.toLowerCase().includes(searchText.toLowerCase())
    );

    // Calculate dynamic height based on number of items
    const calculateDropdownHeight = () => {
        const ITEM_HEIGHT = 44; // Height of each item
        const SEARCH_HEIGHT = isSearch ? 44 : 0; // Height of search bar if present
        const MAX_HEIGHT = SCREEN_HEIGHT * 0.42; // Maximum height (50% of screen)

        const contentHeight = filteredData.length * ITEM_HEIGHT + SEARCH_HEIGHT + 16; // +16 for padding
        return Math.min(contentHeight, MAX_HEIGHT);
    };

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isOpen ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, calculateDropdownHeight()],
    });

    const opacityInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    // Border animation for the header
    const borderWidthInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    });

    const borderColorInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.inputBorder, COLORS.Navy],
    });

    return (
        <View style={[styles.container, boxStyles]} ref={dropdownRef}>
            <Animated.View
                style={[
                    styles.header,
                    {
                        borderWidth: borderWidthInterpolation,
                        borderColor: borderColorInterpolation,
                    }
                ]}
            >
                <TouchableOpacity
                    style={styles.headerContent}
                    onPress={toggleDropdown}
                    activeOpacity={0.8}
                >
                    <Text style={styles.placeholder}>
                        {placeholder}
                    </Text>
                    {isOpen ? <SVGIcons.ArrowUp /> : <SVGIcons.ArrowDown />}
                </TouchableOpacity>
            </Animated.View>

            {isOpen && (
                <Animated.View
                    style={[
                        styles.dropdown,
                        {
                            height: heightInterpolation,
                            opacity: opacityInterpolation,
                            borderWidth: 1,
                            borderColor: COLORS.Navy,
                            maxHeight: calculateDropdownHeight(),
                        },
                        dropdownStyles
                    ]}
                >
                    {isSearch &&
                        <View style={styles.searchContainer}>
                            <SVGIcons.searchIcon />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View>
                    }

                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.item, itemStyles]}
                                onPress={() => handleItemPress(item.value)}
                            >
                                <View style={styles.checkbox}>
                                    {selectedItems.includes(item.value) && (
                                        <View style={styles.checkboxSelected} />
                                    )}
                                </View>
                                <Text style={styles.itemText}>{item.value}</Text>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        getItemLayout={(data, index) => ({
                            length: 44, // Same as ITEM_HEIGHT
                            offset: 44 * index,
                            index,
                        })}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // marginBottom: 16,
    },
    header: {
        width: '100%',
        height: SIZES.hp(6.1),
        borderRadius: 8,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2
    },
    placeholder: {
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontWeight: '500',
        color: COLORS.Navy,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        marginTop: 8,
        zIndex: 10,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: SIZES.hp(6.1),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        paddingStart: 10
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        color: COLORS.Navy,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SIZES.hp(6.1),
        paddingHorizontal: 12,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: COLORS.Black20,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        width: 12,
        height: 12,
        borderRadius: 2,
        backgroundColor: COLORS.Navy,
    },
    itemText: {
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontStyle: 'normal',
        fontWeight: '400',
        color: COLORS.Navy,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.inputBorder,
        marginHorizontal: 12,
    },
});

export default CustomDropDown;