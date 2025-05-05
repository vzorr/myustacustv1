import React, { useContext, useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { UserNavigationRootProps } from '../../../../types/stacksParams'
import ChatInboxUi from './ChatInboxUi'


const ChatInboxContainer: React.FC<UserNavigationRootProps<"ChatInbox">> = (props) => {
    const { route, navigation } = props
    const {
        userId,
        jobId,
        jobTitle,
        userName,
        isOnline,
        isBlocked,
        isBlocker,
        chatDate
    } = route?.params?.chatData;
    console.log("userName", userName)

    return (
        <ChatInboxUi
            userId={userId}
            jobId={jobId}
            jobTitle={jobTitle}
            userName={userName}
            isOnline={isOnline}
            isBlocked={isBlocked}
            isBlocker={isBlocker}
            chatDate={chatDate}
            navigation={navigation}
        />
    )
}

export default ChatInboxContainer