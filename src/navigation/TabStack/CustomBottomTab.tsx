import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Platform, Dimensions, StyleSheet, Keyboard } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS, fontSize } from '../../config/themes/theme';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

export const CustomBottomTab = ({ state, descriptors, navigation }: any) => {
    const screenWidth = Dimensions.get('window').width;
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    if (isKeyboardVisible) {
        return null; // Hide the tab bar when keyboard is visible
    }

    // Calculate tab widths based on screen width
    const numberOfTabs = state.routes.length;
    const tabWidth = (screenWidth - 40 - 24) / numberOfTabs; // Account for container padding and tab bar padding

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconComponent;
                    switch (route.name) {
                        case "JobsStatusSackNav":
                            iconComponent = isFocused ? <SVGIcons.HomeWhiteIcon /> : <SVGIcons.HomeIcon />;
                            break;
                        case "SearchScreen":
                            iconComponent = isFocused ? <SVGIcons.SearchWhiteIcon /> : <SVGIcons.SearchIcon />;
                            break;
                        case "PostJobScreen":
                            iconComponent = isFocused ? <SVGIcons.PlusWhiteIcon /> : <SVGIcons.plusIcon />;
                            break;
                        case "ChatScreen":
                            iconComponent = isFocused ? <SVGIcons.ChatWhiteIcon /> : <SVGIcons.MessageIcon />;
                            break;
                        case "ProfileScreen":
                            iconComponent = isFocused ? <SVGIcons.ProfileIcon /> : <SVGIcons.UserIcon />;
                            break;
                        default:
                            break;
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tabItem,
                                { width: tabWidth },
                                isFocused ? styles.tabItemActive : null
                            ]}
                            activeOpacity={0.7}
                            onPress={onPress}
                        >
                            <View style={styles.iconContainer}>
                                {iconComponent}
                            </View>
                            <Text
                                style={[
                                    styles.tabLabel,
                                    isFocused ? styles.tabLabelActive : styles.tabLabelInactive
                                ]}
                                numberOfLines={1}
                            >
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 999,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
    tabBar: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.Yellow,
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 12,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12, // More padding for iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    tabItem: {
        flex: 1,
        height: 60,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        height: 28,
        width: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabItemActive: {
        backgroundColor: COLORS.UstaBlack,
    },
    tabLabel: {
        ...reuseableTextStyles.subTitle,
        fontSize: fontSize[10],
        textAlign: 'center',
    },
    tabLabelActive: {
        color: COLORS.white,
    },
    tabLabelInactive: {
        color: COLORS.Navy,
    }
});