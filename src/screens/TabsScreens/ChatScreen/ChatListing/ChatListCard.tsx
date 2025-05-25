import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
// import { ChatRoom } from '../../../../types/chat';
import { COLORS, FONTS, fontSize } from '../../../../config/themes/theme';
import { SVGIcons } from '../../../../config/constants/svg';

// interface ChatListCardProps {
//   room: ChatRoom;
//   onPress: () => void;
// }

const ChatListCard = (props: any) => {
  const { room, onPress, currentUserId } = props
  const formatDate = (dateString: string) => {
    const now = moment();
    const messageDate = moment(dateString);

    if (!messageDate.isValid()) return '';

    if (now.isSame(messageDate, 'day')) {
      return messageDate.format('HH:mm');
    } else if (now.clone().subtract(1, 'day').isSame(messageDate, 'day')) {
      return 'Yesterday';
    } else if (now.diff(messageDate, 'days') < 7) {
      return messageDate.format('ddd');
    } else {
      return messageDate.format('DD/MM');
    }
  };

  const getLastMessageText = () => {
    if (!room.lastMessage) return 'No messages yet';

    switch (room.lastMessage.type) {
      case 'text':
        return room.lastMessage?.content?.text;
      case 'image':
        return '📷 Photo';
      case 'audio':
        return '🎵 Voice message';
      case 'file':
        return '📄 File';
      default:
        return room.lastMessage.content || 'Message';
    }
  };
  // let otherUser = room?.participants && room?.participants[0]

  const otherUser = room?.participants?.find((p: any) => p.id !== currentUserId);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={
            otherUser?.avatar
              ? { uri: otherUser?.avatar }
              : require('../../../../assets/images/MostVisitedProfessions/Plumber.png')
          }
          resizeMode="cover"
        />
        {otherUser?.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.jobTitleContainer}>
          <SVGIcons.breifCase width={12} height={12} />
          <Text style={styles.jobTitle} numberOfLines={1}>
            {room.jobTitle}
          </Text>
        </View>

        <View style={styles.nameTimeContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {otherUser?.name}
          </Text>
          <Text style={styles.timestamp}>
            {formatDate(room?.lastMessage?.updatedAt)}
          </Text>
        </View>

        <View style={styles.messageContainer}>
          <Text
            style={[
              styles.lastMessage,
              room.unreadCount > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {getLastMessageText()}
          </Text>

          {room.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {room.unreadCount > 99 ? '99+' : room.unreadCount}
              </Text>
            </View>
          )}
        </View>

        {room.isBlocked && (
          <View style={styles.blockedIndicator}>
            <SVGIcons.LockIcon width={12} height={12} />
            <Text style={styles.blockedText}>Blocked</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    gap: 2,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightSky,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: fontSize[10],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy200,
    marginLeft: 4,
    flexShrink: 1,
  },
  nameTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interSemiBold,
    color: COLORS.Navy,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: fontSize[10],
    fontFamily: FONTS.interRegular,
    color: COLORS.GreyedOut,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: fontSize[12],
    fontFamily: FONTS.interRegular,
    color: COLORS.Navy200,
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    fontFamily: FONTS.interMedium,
    fontWeight: '500',
    color: COLORS.Navy,
  },
  unreadBadge: {
    backgroundColor: COLORS.Yellow,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: fontSize[10],
    fontFamily: FONTS.interMedium,
    color: COLORS.Navy,
    fontWeight: '600',
  },
  blockedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  blockedText: {
    fontSize: fontSize[10],
    fontFamily: FONTS.interRegular,
    color: COLORS.ErrorRed,
    marginLeft: 4,
  },
});

export default ChatListCard;