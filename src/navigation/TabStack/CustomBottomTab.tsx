import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Text, View, TouchableOpacity, Platform, Dimensions, StyleSheet, Keyboard } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS, fontSize } from '../../config/themes/theme';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

// Define types for tab button props
interface TabButtonProps {
    route: any;
    isFocused: boolean;
    onPress: () => void;
    label: string;
    tabWidth: number;
    iconComponent: React.ReactNode;
}

// Pre-render tab items to improve performance
const TabButton = React.memo(({
    route,
    isFocused,
    onPress,
    label,
    tabWidth,
    iconComponent
}: TabButtonProps) => {
    return (
        <TouchableOpacity
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
});

export const CustomBottomTab = ({ state, descriptors, navigation }: any) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // Cache screen dimensions to avoid recalculating on each render
    const screenWidth = useMemo(() => Dimensions.get('window').width, []);
    const numberOfTabs = useMemo(() => state.routes.length, [state.routes.length]);
    const tabWidth = useMemo(() =>
        (screenWidth - 40 - 24) / numberOfTabs,
        [screenWidth, numberOfTabs]
    );

    // Optimize keyboard event handlers
    const showKeyboard = useCallback(() => {
        setKeyboardVisible(true);
    }, []);

    const hideKeyboard = useCallback(() => {
        setKeyboardVisible(false);
    }, []);

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            showKeyboard
        );
        const keyboardWillHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            hideKeyboard
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, [showKeyboard, hideKeyboard]);

    // Important: render all content regardless of keyboard visibility
    // Use conditional styling instead of conditional rendering
    return (
        <View style={[
            styles.container,
            isKeyboardVisible && { opacity: 0, height: 0 }
        ]}>
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

                    // Memoize icon component to avoid recreation on each render
                    const iconComponent = useMemo(() => {
                        switch (route.name) {
                            case "JobsStatusSackNav":
                                return isFocused ? <SVGIcons.HomeWhiteIcon /> : <SVGIcons.HomeIcon />;
                            case "SearchScreen":
                                return isFocused ? <SVGIcons.SearchWhiteIcon /> : <SVGIcons.SearchIcon />;
                            case "PostJobScreen":
                                return isFocused ? <SVGIcons.PlusWhiteIcon /> : <SVGIcons.plusIcon />;
                            case "ChatList":
                                return isFocused ? <SVGIcons.ChatWhiteIcon /> : <SVGIcons.MessageIcon />;
                            case "ProfileScreen":
                                return isFocused ? <SVGIcons.ProfileIcon /> : <SVGIcons.UserIcon />;
                            default:
                                return null;
                        }
                    }, [route.name, isFocused]);

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            // Use the navigate method with more specific params for better performance
                            navigation.navigate({
                                name: route.name,
                                merge: true,
                            });
                        }
                    };

                    return (
                        <TabButton
                            key={index}
                            route={route}
                            isFocused={isFocused}
                            onPress={onPress}
                            label={label}
                            tabWidth={tabWidth}
                            iconComponent={iconComponent}
                        />
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
        backgroundColor: COLORS.Navy,
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