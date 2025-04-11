import React from 'react';
import { Text, View, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS, fontSize } from '../../config/themes/theme';
import { reuseableTextStyles } from '../../styles/reuseableTextStyles';

export const CustomBottomTab = ({ state, descriptors, navigation }: any) => {
    const screenWidth = Dimensions.get('window').width;

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
                        case "Home":
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
                                isFocused ? styles.tabItemActive : null
                            ]}
                            onPress={onPress}
                        >
                            {iconComponent}
                            <Text style={[
                                reuseableTextStyles.subTitle,
                                { fontSize: fontSize[10] },
                                isFocused ? styles.tabLabelActive : styles.tabLabelInactive
                            ]}>
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
        // alignItems: 'center',
        zIndex: 999,
        paddingHorizontal: 20
    },
    tabBar: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.Yellow,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 90,
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        gap: 4,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    tabItem: {
        width: 55,
        height: 55,
        borderRadius: 8,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabItemActive: {
        backgroundColor: COLORS.Navy,
    },
    tabLabelActive: {
        color: COLORS.white,
    },
    tabLabelInactive: {
        color: COLORS.Navy,
    }
});