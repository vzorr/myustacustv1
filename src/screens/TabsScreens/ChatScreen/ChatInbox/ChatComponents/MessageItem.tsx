import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Message, MessageType } from '../../../../../types/chat';
import { COLORS, FONTS, fontSize } from '../../../../../config/themes/theme';
import { useSelector } from 'react-redux';
import moment from 'moment';

interface MessageItemProps {
  message: Message;
  onReply: (message: Message) => void;
  onProfilePress: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  onReply, 
  onProfilePress 
}) => {
  const { userData } = useSelector((state: any) => state?.userInfo);
  const isCurrentUser = message.senderId === userData?.userId;

  const formatTime = (timestamp: string) => {
    return moment(timestamp).format('HH:mm');
  };

  const getStatusColor = () => {
    switch (message.status) {
      case 'sending': return COLORS.GreyedOut;
      case 'sent': return COLORS.GreyedOut;
      case 'delivered': return COLORS.Navy200;
      case 'read': return COLORS.Yellow;
      case 'failed': return COLORS.ErrorRed;
      default: return COLORS.GreyedOut;
    }
  };

  const renderContent = () => {
    switch (message.type) {
      case MessageType.TEXT:
        return (
          <Text style={[
            styles.messageText,
            isCurrentUser ? styles.currentUserText : styles.otherUserText
          ]}>
            {message.content}
          </Text>
        );
      
      case MessageType.IMAGE:
        return (
          <View style={styles.attachmentContainer}>
            <Text style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText
            ]}>
              📷 Image
            </Text>
          </View>
        );
      
      case MessageType.AUDIO:
        return (
          <View style={styles.attachmentContainer}>
            <Text style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText
            ]}>
              🎵 Voice message
            </Text>
          </View>
        );
      
      case MessageType.FILE:
        return (
          <View style={styles.attachmentContainer}>
            <Text style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText
            ]}>
              📄 {message.content || 'File'}
            </Text>
          </View>
        );
      
      default:
        return (
          <Text style={[
            styles.messageText,
            isCurrentUser ? styles.currentUserText : styles.otherUserText
          ]}>
            {message.content}
          </Text>
        );
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.messageRow,
        isCurrentUser ? styles.currentUserRow : styles.otherUserRow
      ]}
      onLongPress={() => onReply(message)}
      activeOpacity={0.7}
    >
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        {message.replyTo && (
          <View style={styles.replyContainer}>
            <View style={styles.replyLine} />
            <Text style={styles.replyText}>Reply to message</Text>
          </View>
        )}
        
        {renderContent()}
        
        <View style={styles.messageFooter}>
          <Text style={[
            styles.messageTime,
            isCurrentUser ? styles.currentUserTime : styles.otherUserTime
          ]}>
            {formatTime(message.timestamp)}
          </Text>
          
          {isCurrentUser && (
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor() }
              ]} 
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  currentUserRow: {
    justifyContent: 'flex-end',
  },
  otherUserRow: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  currentUserMessage: {
    backgroundColor: COLORS.Navy,
    borderBottomRightRadius: 4,
  },
  otherUserMessage: {
    backgroundColor: COLORS.otherChatBgColor,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: fontSize[14],
    fontFamily: FONTS.interRegular,
    lineHeight: 20,
  },
  currentUserText: {
    color: COLORS.white,
  },
  otherUserText: {
    color: COLORS.Navy,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: fontSize[10],
    fontFamily: FONTS.interRegular,
  },
  currentUserTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  otherUserTime: {
    color: COLORS.GreyedOut,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
  },
  attachmentContainer: {
    minWidth: 100,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  replyLine: {
    width: 3,
    height: 20,
    backgroundColor: COLORS.Yellow,
    marginRight: 8,
  },
  replyText: {
    fontSize: fontSize[12],
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
});

export default MessageItem;