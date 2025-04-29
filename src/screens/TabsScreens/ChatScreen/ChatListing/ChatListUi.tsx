import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { chatListStyle } from './chatListStyles'
import { SVGIcons } from '../../../../config/constants/svg'
import ChatListCard from './ChatListCard'

const ChatListUi = (props: any) => {
    const {
        jobTitle,
        userName,
        userId,
        lastMsg,
        chatDate,
        count,
        navigation,
        isBlocker,
        isBlocked,
        isOnline
    } = props

    const formatChatDate = (dateString: string) => {
        const now = moment();
        const messageDate = moment(dateString); // Don't pass format string

        if (!messageDate.isValid()) return '';

        if (now.isSame(messageDate, 'day')) {
            return messageDate.format("h:mm A");
        } else if (now.clone().subtract(1, 'day').isSame(messageDate, 'day')) {
            return "Yesterday";
        } else {
            return messageDate.format("DD/MM/YYYY");
        }
    };

    const formattedDate = formatChatDate(chatDate);

    const handleChatNav = () => {
        navigation.navigate("ChatInbox", {
            chatData: {
                userId: userId,
                jobTitle: jobTitle,
                userName: userName,
                isOnline: isOnline,
                isBlocked: isBlocked,
                isBlocker: isBlocker,
                chatDate: chatDate,
            }
        })
    }

    return (
        <ChatListCard
            handleChatNav={handleChatNav}
            jobTitle={jobTitle}
            userName={userName}
            userId={userId}
            lastMsg={lastMsg}
            chatDate={chatDate}
            count={count}
            navigation={navigation}
            isBlocker={isBlocker}
            isBlocked={isBlocked}
            isOnline={isOnline}
        />
        // <TouchableOpacity
        //     style={chatListStyle.chatListCardMain}
        //     activeOpacity={0.5}
        //     onPress={handleChatNav}
        // >
        //     <View style={chatListStyle.chatListInner}>
        //         <View style={{ flexDirection: "row" }}>
        //             <View style={chatListStyle.imageMainView}>
        //                 <Image
        //                     style={chatListStyle.imageView}
        //                     source={require("../../../../assets/images/MostVisitedProfessions/Plumber.png")}
        //                     resizeMode='contain'
        //                 />
        //                 {isOnline && <View style={chatListStyle.isOnlineView} />}
        //             </View>

        //             <View style={{ marginStart: 8, width: "80%" }}>
        //                 <View style={chatListStyle.jobTitleContainer}>
        //                     <SVGIcons.breifCase width={14} height={14} />
        //                     <Text style={chatListStyle.jobTitle} numberOfLines={1}>
        //                         {jobTitle}
        //                     </Text>
        //                 </View>

        //                 <View style={chatListStyle.nameContainer}>
        //                     <View style={{ width: "70%" }}>
        //                         <Text style={chatListStyle.userNameText} numberOfLines={1}>
        //                             {userName || "user name"}
        //                         </Text>
        //                     </View>
        //                     <Text style={chatListStyle.dateText}>{formattedDate}</Text>
        //                 </View>

        //                 <View style={chatListStyle.lastMsgContainer}>
        //                     <Text style={chatListStyle.lastMsg} numberOfLines={1}>
        //                         {lastMsg || "no msg"}
        //                     </Text>
        //                     {count > 0 && (
        //                         <View style={chatListStyle.countView}>
        //                             <Text style={chatListStyle.counntText}>{count}</Text>
        //                         </View>
        //                     )}
        //                 </View>
        //             </View>
        //         </View>
        //     </View>
        // </TouchableOpacity>
    )
}

export default ChatListUi
