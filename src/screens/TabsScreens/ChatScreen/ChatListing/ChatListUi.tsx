// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ChatListUi = () => {
//     return (
//         <View>
//             <Text>ChatListingUi</Text>
//         </View>
//     )
// }

// export default ChatListUi

// const styles = StyleSheet.create({})
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import { chatListStyle } from './chatListStyles'
import { SVGIcons } from '../../../../config/constants/svg'

const ChatListUi = (props: any) => {
    const { jobTitle, userName, userId, lastMsg, chatDate, count, navigation, isBlocker, isBlocked, isOnline } = props
    const formattedDate = moment(chatDate, "DD-MM-YYYY/h:mm A")?.format("DD-MM-YYYY/h:mm A");
    const handleChatNav = () => {
        navigation.navigate("ChatInbox", {
            chatData: {
                userId: userId,
                jobTitle: jobTitle,
                userName: userName,
                isOnline: isOnline,
                isBlocked: isBlocked,
                isBlocker: isBlocker
            }
        })
    }
    return (
        <TouchableOpacity style={[chatListStyle.chatListCardMain]}
            activeOpacity={0.5}
            onPress={handleChatNav}
        >
            <View style={[chatListStyle.chatListInner]}>
                <View style={{ flexDirection: "row", }}>
                    <View style={chatListStyle.imageMainView}>
                        <Image
                            style={chatListStyle.imageView}
                            source={require("../../../../assets/images/MostVisitedProfessions/Plumber.png")}
                            resizeMode='contain'
                        />
                        {isOnline ?
                            <View style={chatListStyle.isOnlineView} /> : null
                        }
                    </View>
                    <View style={{ marginStart: 8, width: "80%" }}>
                        <View style={chatListStyle.jobTitleContainer}>
                            <SVGIcons.breifCase width={14} height={14} />
                            <Text style={chatListStyle.jobTitle} numberOfLines={1}>{jobTitle}</Text>
                        </View>
                        <View style={chatListStyle.nameContainer}>
                            <View style={{ width: "45%" }}>
                                <Text style={chatListStyle.userNameText} numberOfLines={1}>{userName ? userName : "user name"}</Text>
                            </View>
                            <Text style={chatListStyle.dateText}>{formattedDate}</Text>
                        </View>
                        <View style={chatListStyle.lastMsgContainer}>
                            <Text style={chatListStyle.lastMsg}
                                numberOfLines={1}
                            >{lastMsg ? lastMsg : " no msg"}</Text>
                            {count > 0 ?
                                <View style={chatListStyle.countView}>
                                    <Text style={chatListStyle.counntText}>{count}</Text>
                                </View>
                                : null
                            }
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListUi