import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Platform } from 'react-native';
import { SVGIcons } from '../../config/constants/svg';
import { COLORS } from '../../config/themes/theme';

export const CustomBottomTab = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 10 : 5,
            backgroundColor: "white",
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        }}>
            <View
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
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
                            iconComponent = isFocused ? <SVGIcons.HomeIcon stroke={COLORS.white} /> : <SVGIcons.HomeIcon />;
                            break;
                        case "SearchScreen":
                            iconComponent = isFocused ? <SVGIcons.SearchIcon stroke={COLORS.white} /> : <SVGIcons.SearchIcon />;
                            break;
                        case "PostJobScreen":
                            iconComponent = isFocused ? <SVGIcons.plusIcon stroke={COLORS.white} /> : <SVGIcons.plusIcon />;
                            break;
                        case "ChatScreen":
                            iconComponent = isFocused ? <SVGIcons.MessageIcon stroke={COLORS.white} /> : <SVGIcons.MessageIcon />;
                            break;
                        case "UsersScreen":
                            iconComponent = isFocused ? <SVGIcons.UserIcon stroke={COLORS.white} /> : <SVGIcons.UserIcon />;
                            break;
                        default:
                            break;
                    }
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{ padding: 12, borderBottomColor: isFocused ? COLORS.Yellow : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                            onPress={onPress}
                        >
                            {iconComponent}
                            <Text style={{ color: isFocused ? COLORS.Yellow : 'black', margin: 4 }}>{label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};