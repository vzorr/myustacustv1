import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useState, useRef } from 'react'
import ChatHeader from '../../../../components/AppHeader/ChatHeader'
import { COLORS } from '../../../../config/themes/theme';

// Mock data for chat messages
const mockMessages: any[] = [
    {
        id: '1',
        text: 'Hey there! How are you doing?',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'delivered',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        id: '2',
        text: "I'm good! Working on that project we discussed.",
        senderId: '102',
        receiverId: '101',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        status: 'read',
        senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: '3',
        text: 'When do you think you can finish?',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        status: 'delivered',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        id: '4',
        text: 'Probably by Friday. I will send you the files then.',
        senderId: '102',
        receiverId: '101',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'read',
        senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: '5',
        text: 'Sounds good! Looking forward to it.',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        status: 'delivered',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        id: '6',
        text: 'Did you check the new design specs I sent?',
        senderId: '102',
        receiverId: '101',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        status: 'read',
        senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: '7',
        text: 'Not yet, will review them today and get back to you.',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        status: 'sent',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
];

const ChatInboxUi = (props: any) => {
    const {
        userId,
        jobTitle,
        userName,
        isOnline,
    } = props;

    const [messages, setMessages] = useState<any[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const currentUserId = '101'; // This would normally come from your auth context

    const handleChatMenu = () => {
        // Handle chat menu actions
    }

    const handleJobTitle = () => {
        // Handle job title press
    }

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg: any = {
            id: Date.now().toString(),
            text: newMessage,
            senderId: currentUserId,
            receiverId: userId,
            timestamp: new Date().toISOString(),
            status: 'sent',
            senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');

        // Scroll to bottom after sending
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }

    const renderMessage = ({ item }: { item: any }) => {
        const isCurrentUser = item.senderId === currentUserId;
        const userImage = isCurrentUser ? item.senderImage : item.receiverImage;

        return (
            <View style={[
                styles.messageRow,
                isCurrentUser ? styles.currentUserRow : styles.otherUserRow
            ]}>
                {!isCurrentUser && (
                    <View style={styles.userImageContainer}>
                        <Image
                            source={{ uri: userImage }}
                            style={styles.userImage}
                        />
                    </View>
                )}

                <View style={[
                    styles.messageContainer,
                    isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
                ]}>
                    <Text style={[
                        styles.messageText,
                        isCurrentUser ? styles.currentUserMessageText : null
                    ]}>{item.text}</Text>
                    <Text style={[
                        styles.messageTime,
                        isCurrentUser ? styles.currentUserMessageTime : null
                    ]}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>

                {isCurrentUser && (
                    <View style={styles.userImageContainer}>
                        <Image
                            source={{ uri: userImage }}
                            style={styles.userImage}
                        />
                    </View>
                )}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader
                jobTitle={jobTitle}
                userName={userName}
                status={isOnline ? "Online" : "Offline"}
                handleChatMenu={handleChatMenu}
                handleJobTitle={handleJobTitle}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.chatContainer}
            // keyboardVerticalOffset={90}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Type a message..."
                        placeholderTextColor="#999"
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSendMessage}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatInboxUi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    chatContainer: {
        flex: 1,
    },
    messagesList: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    currentUserRow: {
        justifyContent: 'flex-end',
    },
    otherUserRow: {
        justifyContent: 'flex-start',
    },
    messageContainer: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 12,
    },
    currentUserMessage: {
        backgroundColor: COLORS.Navy,
        borderBottomRightRadius: 0,
        marginLeft: 8,
    },
    otherUserMessage: {
        backgroundColor: COLORS.otherChatBgColor,
        borderBottomLeftRadius: 0,
        marginRight: 8,
    },
    messageText: {
        fontSize: 16,
    },
    currentUserMessageText: {
        color: COLORS.white,
    },
    messageTime: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
    },
    currentUserMessageTime: {
        color: 'rgba(255,255,255,0.7)',
    },
    userImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: COLORS.grey,
        marginHorizontal: 4,
    },
    userImage: {
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 10,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#007AFF',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})