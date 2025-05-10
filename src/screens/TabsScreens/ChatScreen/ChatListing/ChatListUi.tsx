import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { chatListStyle } from './chatListStyles'
import { SVGIcons } from '../../../../config/constants/svg'
import ChatListCard from './ChatListCard'

const ChatListUi = (props: any) => {
    const {
        jobId,
        jobTitle,
        userName,
        userId,
        lastMsg,
        chatDate,
        count,
        navigation,
        isBlocked,
        isOnline,
        onPress
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
            return messageDate.format("DD/MM/YY");
        }
    };

    const formattedDate = formatChatDate(chatDate);

    const handleChatNav = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate("ChatInbox", {
                chatData: {
                    userId: userId,
                    jobId: jobId,
                    jobTitle: jobTitle,
                    userName: userName,
                    isOnline: isOnline,
                    isBlocked: isBlocked,
                    chatDate: chatDate,
                }
            })
        }
    }

    return (
        <ChatListCard
            handleChatNav={handleChatNav}
            jobId={jobId}
            jobTitle={jobTitle}
            userName={userName}
            userId={userId}
            lastMsg={lastMsg}
            chatDate={chatDate}
            count={count}
            navigation={navigation}
            isBlocked={isBlocked}
            isOnline={isOnline}
            formattedDate={formattedDate}
        />
    )
}

export default ChatListUi
