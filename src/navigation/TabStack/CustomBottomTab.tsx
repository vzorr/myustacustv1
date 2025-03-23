// import React from 'react';
// import { ScrollView, Text, View, TouchableOpacity, Platform } from 'react-native';
// import AppIcon from 'components/AppIcon';
// import { COLORS } from 'global/theme';

// export const CustomBottomTab = ({ state, descriptors, navigation }: any) => {
//     return (
//         <View style={{
//             position: 'absolute',
//             bottom: Platform.OS === 'ios' ? 10 : 5,
//             backgroundColor: "white",
//             shadowColor: '#000',
//             shadowOffset: {
//                 width: 0,
//                 height: 2,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 4,
//             elevation: 5,
//         }}>
//             <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', }}
//             >
//                 {state.routes.map((route: any, index: number) => {
//                     const { options } = descriptors[route.key];
//                     const label =
//                         options.tabBarLabel !== undefined
//                             ? options.tabBarLabel
//                             : options.title !== undefined
//                                 ? options.title
//                                 : route.name;
//                     const isFocused = state.index === index;
//                     const onPress = () => {
//                         const event = navigation.emit({
//                             type: 'tabPress',
//                             target: route.key,
//                             canPreventDefault: true,
//                         });
//                         if (!isFocused && !event.defaultPrevented) {
//                             navigation.navigate(route.name);
//                         }
//                     };
//                     let iconComponent;
//                     switch (route.name) {
//                         case "Home":
//                             iconComponent = <AppIcon category='AntDesign' name="home" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "Ads":
//                             iconComponent = <AppIcon category='MaterialIcons' name="campaign" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "Dashboard":
//                             iconComponent = <AppIcon category='Entypo' name="line-graph" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "Rewards":
//                             iconComponent = <AppIcon category='AntDesign' name="gift" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "CustomerToBusiness":
//                             iconComponent = <AppIcon category='Entypo' name="mobile" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "Favourite":
//                             iconComponent = <AppIcon category='MaterialIcons' name="favorite-border" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "Menu":
//                             iconComponent = <AppIcon category='Feather' name="list" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "Chat":
//                             iconComponent = <AppIcon category='Feather' name="message-square" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         case "MyShops":
//                             iconComponent = <AppIcon category='FontAwesome6' name="shop" size={20} color={isFocused ? COLORS.orange : 'black'} />;
//                             break;
//                         default:
//                             break;
//                     }
//                     // if (route.name === 'Home') {
//                     //     iconComponent = <AppIcon category='AntDesign' name="home" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'Ads') {
//                     //     iconComponent = <AppIcon category='MaterialIcons' name="campaign" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'Rewards') {
//                     //     iconComponent = <AppIcon category='AntDesign' name="gift" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'CustomerToBusiness') {
//                     //     iconComponent = <AppIcon category='Entypo' name="mobile" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'Favourite') {
//                     //     iconComponent = <AppIcon category='MaterialIcons' name="favorite-border" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'Menu') {
//                     //     iconComponent = <AppIcon category='Feather' name="list" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'Chat') {
//                     //     iconComponent = <AppIcon category='Feather' name="message-square" size={24} color={isFocused ? COLORS.orange : 'black'} />;
//                     // } else if (route.name === 'MyShops') {
//                     //     iconComponent = <AppIcon category='FontAwesome6' name="shop" size={20} color={isFocused ? COLORS.orange : 'black'} />;
//                     // }

//                     return (
//                         <TouchableOpacity
//                             key={index}
//                             style={{ padding: 12, borderBottomColor: isFocused ? COLORS.orange : 'transparent', alignItems: 'center', justifyContent: 'center' }}
//                             onPress={onPress}
//                         >
//                             {iconComponent}
//                             <Text style={{ color: isFocused ? COLORS.orange : 'black', margin: 4 }}>{label}</Text>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </ScrollView>
//         </View>
//     );
// };