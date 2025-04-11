import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, TextInput, Dimensions, Modal, Platform } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS, FONTS, fontSize, SIZES } from '../../config/themes/theme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface CustomDropDownProps {
    data: { key: string; value: string }[];
    placeholder: string;
    selectedItems: string[];
    onSelectionChange: (selectedItems: string[]) => void;
    isMultiSelect?: boolean;
    boxStyles?: object;
    dropdownStyles?: object;
    itemStyles?: object;
    isSearch?: boolean;
    maxHeight?: number;
    zIndex?: number;
    getValue?: any
}

const UseableDropDown: React.FC<CustomDropDownProps> = ({
    data,
    placeholder,
    selectedItems,
    onSelectionChange,
    isMultiSelect = true,
    boxStyles = {},
    dropdownStyles = {},
    itemStyles = {},
    isSearch,
    maxHeight,
    zIndex = 100,
    getValue
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [headerPosition, setHeaderPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const animation = useRef(new Animated.Value(0)).current;
    const dropdownRef = useRef<View>(null);
    const headerRef = useRef<View>(null);
    const [dropdownLayout, setDropdownLayout] = useState({ width: 0, height: 0 });

    // Close dropdown when user taps outside
    useEffect(() => {
        const backHandler = () => {
            if (isOpen) {
                setIsOpen(false);
                return true;
            }
            return false;
        };

        // We don't need web-specific implementation for React Native
        return () => { };
    }, [isOpen]);

    const toggleDropdown = () => {
        // Measure position whenever dropdown is toggled
        if (headerRef.current && !isOpen) {
            headerRef.current.measureInWindow((x, y, width, height) => {
                setHeaderPosition({ x, y, width, height });
                // Only open dropdown after measuring to ensure correct positioning
                setIsOpen(true);
            });
        } else {
            setIsOpen(false);
        }
    };

    const handleItemPress = (itemKey: string, itemValue: string) => {
        let newSelectedItems: string[] = [];

        if (isMultiSelect) {
            newSelectedItems = [...selectedItems];
            const index = newSelectedItems.indexOf(itemValue);
            if (index > -1) {
                newSelectedItems.splice(index, 1);
            } else {
                newSelectedItems.push(itemValue);
            }
        } else {
            newSelectedItems = [itemValue];
            setIsOpen(false); // close dropdown after selecting one item
        }

        onSelectionChange(newSelectedItems);
    };

    const filteredData = data.filter(item =>
        item.value.toLowerCase().includes(searchText.toLowerCase())
    );

    const calculateDropdownHeight = () => {
        const ITEM_HEIGHT = SIZES.hp(6);
        const SEARCH_HEIGHT = isSearch ? SIZES.hp(6) : 0;
        const PADDING = SIZES.hp(1);

        // Calculate available space (similar to original implementation)
        const BOTTOM_PADDING = 120;
        const availableSpace = SCREEN_HEIGHT - headerPosition.y - headerPosition.height - BOTTOM_PADDING;

        // Calculate content height based on items
        const contentHeight = filteredData.length * ITEM_HEIGHT + SEARCH_HEIGHT + PADDING;

        // Use maxHeight prop if provided, otherwise use available space
        const maximumHeight = maxHeight ? maxHeight : Math.min(contentHeight, availableSpace);
        return maximumHeight;
    };

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isOpen ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    // Calculate position for the dropdown (always below header)
    const getDropdownPosition = () => {
        const { y, height, width, x } = headerPosition;

        return {
            top: y + height + 8,
            width: width,
            left: x,
        };
    };

    // Get selected item text
    const getSelectedText = () => {
        if (selectedItems.length === 0) {
            return placeholder;
        } else if (selectedItems.length === 1) {
            return selectedItems[0];
        } else {
            return `${selectedItems.length} items selected`;
        }
    };

    return (
        <View style={[styles.container, { zIndex }, boxStyles]} ref={dropdownRef}>
            <Animated.View
                ref={headerRef}
                style={[
                    styles.header,
                    {
                        borderWidth: isOpen ? 2 : 1,
                        borderColor: isOpen ? COLORS.Navy : COLORS.inputBorder,
                    },
                ]}
            >
                <TouchableOpacity
                    style={styles.headerContent}
                    onPress={toggleDropdown}
                    activeOpacity={0.8}
                >
                    <Text style={[
                        styles.placeholder,
                        selectedItems.length > 0 ? styles.selectedText : null
                    ]} numberOfLines={1} ellipsizeMode="tail">
                        {getSelectedText()}
                    </Text>
                    {isOpen ?
                        <SVGIcons.ArrowUp fill={COLORS.Navy} /> :
                        <SVGIcons.ArrowDown fill={COLORS.Navy} />
                    }
                </TouchableOpacity>
            </Animated.View>

            {/* Use Modal for dropdown to avoid scroll conflicts */}
            <Modal
                visible={isOpen}
                transparent={true}
                animationType="none"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsOpen(false)}
                >
                    <View
                        style={[
                            styles.modalDropdown,
                            getDropdownPosition(),
                            { maxHeight: calculateDropdownHeight() },
                            dropdownStyles
                        ]}
                    >
                        {isSearch && (
                            <View style={styles.searchContainer}>
                                <SVGIcons.searchIcon />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    autoFocus={true}
                                />
                            </View>
                        )}

                        <FlatList
                            data={filteredData}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.item, itemStyles]}
                                    // onPress={() => handleItemPress(item.key, item.value)}
                                    onPress={() => {
                                        if (getValue) {
                                            getValue(item.value)
                                        }
                                        handleItemPress(item.key, item.value)
                                    }}
                                >
                                    {isMultiSelect && (
                                        <View
                                            style={[
                                                styles.checkbox,
                                                { borderColor: COLORS.inputBorder },
                                                selectedItems.includes(item.value) && { borderColor: COLORS.Black20 }
                                            ]}
                                        >
                                            {selectedItems.includes(item.value) && (
                                                <SVGIcons.checkIcon width={14} height={14} fill={COLORS.inputBorder} />
                                            )}
                                        </View>
                                    )}
                                    <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
                                        {item.value}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={5}
                            showsVerticalScrollIndicator={true}
                            // Remove custom scrollbar indicator styling
                            // Enable better scroll performance
                            removeClippedSubviews={true}
                            // Use FlatList's built-in getItemLayout for better performance
                            getItemLayout={(data, index) => ({
                                length: SIZES.hp(6),
                                offset: SIZES.hp(6) * index,
                                index,
                            })}
                            // Stop propagation of touch events to prevent closing the dropdown
                            onTouchStart={e => e.stopPropagation()}
                            onTouchMove={e => e.stopPropagation()}
                            onTouchEnd={e => e.stopPropagation()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
    },
    header: {
        width: '100%',
        height: SIZES.hp(6.1),
        borderRadius: 8,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholder: {
        flex: 1,
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontWeight: '500',
        color: COLORS.Navy,
        marginRight: 8,
    },
    selectedText: {
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    modalDropdown: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.Navy,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: SIZES.hp(6.1),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorder,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        color: COLORS.Navy,
        padding: 0,
        height: '100%',
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
    itemText: {
        flex: 1,
        fontFamily: FONTS.interMedium,
        fontSize: fontSize[14],
        fontWeight: '400',
        color: COLORS.Navy,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.inputBorder,
        marginHorizontal: 12,
    },
    flatList: {
        flex: 1,
    },
});

export default UseableDropDown;
