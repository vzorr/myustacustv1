import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { chatListStyle } from './chatListStyles'
import { SVGIcons } from '../../../../config/constants/svg'

type ChatListCardProps = {
    handleChatNav: () => void
    jobTitle: string
    userName: string
    userId: string | number
    lastMsg: string
    chatDate: string // ISO format expected (e.g., 2024-04-27T10:30:00)
    count: number
    navigation: any // You may replace `any` with proper StackNavigationProp if needed
    isBlocker: boolean
    isBlocked: boolean
    isOnline: boolean
}

const ChatListCard: React.FC<ChatListCardProps> = ({
    jobTitle,
    userName,
    handleChatNav,
    userId,
    lastMsg,
    chatDate,
    count,
    navigation,
    isBlocker,
    isBlocked,
    isOnline
}) => {
    const formatChatDate = (dateString: string) => {
        const now = moment()
        const messageDate = moment(dateString)

        if (!messageDate.isValid()) return ''

        if (now.isSame(messageDate, 'day')) {
            return messageDate.format('h:mm A')
        } else if (now.clone().subtract(1, 'day').isSame(messageDate, 'day')) {
            return 'Yesterday'
        } else {
            return messageDate.format('DD/MM/YYYY')
        }
    }

    const formattedDate = formatChatDate(chatDate)

    //   const handleChatNav = () => {
    //     navigation.navigate('ChatInbox', {
    //       chatData: {
    //         userId,
    //         jobTitle,
    //         userName,
    //         isOnline,
    //         isBlocked,
    //         isBlocker
    //       }
    //     })
    //   }

    return (
        <TouchableOpacity
            style={chatListStyle.chatListCardMain}
            activeOpacity={0.5}
            onPress={handleChatNav}
        >
            <View style={chatListStyle.chatListInner}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={chatListStyle.imageMainView}>
                        <Image
                            style={chatListStyle.imageView}
                            source={require('../../../../assets/images/MostVisitedProfessions/Plumber.png')}
                            resizeMode="contain"
                        />
                        {isOnline && <View style={chatListStyle.isOnlineView} />}
                    </View>

                    <View style={{ marginStart: 8, width: '80%' }}>
                        <View style={chatListStyle.jobTitleContainer}>
                            <SVGIcons.breifCase width={14} height={14} />
                            <Text style={chatListStyle.jobTitle} numberOfLines={1}>
                                {jobTitle}
                            </Text>
                        </View>

                        <View style={chatListStyle.nameContainer}>
                            <View style={{ width: '70%' }}>
                                <Text style={chatListStyle.userNameText} numberOfLines={1}>
                                    {userName || 'user name'}
                                </Text>
                            </View>
                            <Text style={chatListStyle.dateText}>{formattedDate}</Text>
                        </View>

                        <View style={chatListStyle.lastMsgContainer}>
                            <Text style={chatListStyle.lastMsg} numberOfLines={1}>
                                {lastMsg || 'no msg'}
                            </Text>
                            {count > 0 && (
                                <View style={chatListStyle.countView}>
                                    <Text style={chatListStyle.counntText}>{count}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListCard
