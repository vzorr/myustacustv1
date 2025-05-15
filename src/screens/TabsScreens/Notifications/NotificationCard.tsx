import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { notiiStyles } from './NotiiStyles'
import { SVGIcons } from '../../../config/constants/svg'

type ChatListCardProps = {
    chatDate: string // ISO format expected (e.g., 2024-04-27T10:30:00)
    NotificationTetx: string
    handleChatNav: () => void
}

const NotificationCard: React.FC<ChatListCardProps> = ({
    chatDate,
    NotificationTetx,
    handleChatNav,
}) => {
    const getShortTimeAgo = (dateString: string) => {
        const now = moment();
        const past = moment(dateString);

        const diffInSeconds = now.diff(past, 'seconds');
        if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;

        const diffInMinutes = now.diff(past, 'minutes');
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

        const diffInHours = now.diff(past, 'hours');
        if (diffInHours < 24) return `${diffInHours} hr ago`;

        const diffInDays = now.diff(past, 'days');
        if (diffInDays === 1) return `1 day ago`;
        return `${diffInDays} days ago`;
    };


    const formattedDate = getShortTimeAgo(chatDate)

    return (
        <TouchableOpacity
            style={notiiStyles.chatListCardMain}
            activeOpacity={0.5}
            onPress={handleChatNav}
        >
            <View style={notiiStyles.imageMainView}>
                <Image
                    style={notiiStyles.imageView}
                    source={require('../../../assets/images/MostVisitedProfessions/Plumber.png')}
                    resizeMode="contain"
                />
            </View>
            <View style={notiiStyles.cardContentContainer}>
                <View>
                    <Text style={notiiStyles.notiiText}>
                        {NotificationTetx}
                    </Text>
                </View>
                <View>
                    <Text style={notiiStyles.dateText}>{formattedDate}</Text>
                </View>
            </View>
            {/* <View style={notiiStyles.dotStyle} /> */}
        </TouchableOpacity>
    )
}

export default NotificationCard