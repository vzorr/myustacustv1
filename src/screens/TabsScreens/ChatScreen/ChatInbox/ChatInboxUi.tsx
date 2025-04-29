// import {
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     View,
//     FlatList,
//     KeyboardAvoidingView,
//     Platform,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     Animated
// } from 'react-native'
// import React, { useState, useRef } from 'react'
// import ChatHeader from '../../../../components/AppHeader/ChatHeader'
// import { COLORS, FONTS, fontSize } from '../../../../config/themes/theme';
// import { SVGIcons } from '../../../../config/constants/svg';
// import ChatMessageItem from './ChatMessageItem';

// // Mock data for chat messages
// const mockMessages: any[] = [
//     {
//         id: '1',
//         text: 'Hey there! How are you doing?',
//         senderId: '101',
//         receiverId: '102',
//         timestamp: new Date(Date.now() - 3600000).toISOString(),
//         status: 'delivered',
//         senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
//     },
//     {
//         id: '2',
//         text: "I'm good! Working on that project we discussed.",
//         senderId: '102',
//         receiverId: '101',
//         timestamp: new Date(Date.now() - 3000000).toISOString(),
//         status: 'read',
//         senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
//     },
//     {
//         id: '3',
//         text: 'When do you think you can finish?',
//         senderId: '101',
//         receiverId: '102',
//         timestamp: new Date(Date.now() - 2400000).toISOString(),
//         status: 'delivered',
//         senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
//     },
//     {
//         id: '4',
//         text: 'Probably by Friday. I will send you the files then.',
//         senderId: '102',
//         receiverId: '101',
//         timestamp: new Date(Date.now() - 1800000).toISOString(),
//         status: 'read',
//         senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
//     },
//     {
//         id: '5',
//         text: 'Sounds good! Looking forward to it.',
//         senderId: '101',
//         receiverId: '102',
//         timestamp: new Date(Date.now() - 1200000).toISOString(),
//         status: 'delivered',
//         senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
//     },
//     {
//         id: '6',
//         text: 'Did you check the new design specs I sent?',
//         senderId: '102',
//         receiverId: '101',
//         timestamp: new Date(Date.now() - 600000).toISOString(),
//         status: 'read',
//         senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
//     },
//     {
//         id: '7',
//         text: 'Not yet, will review them today and get back to you.',
//         senderId: '101',
//         receiverId: '102',
//         timestamp: new Date(Date.now() - 300000).toISOString(),
//         status: 'sent',
//         senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
//         receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
//     }
// ];

// const ChatInboxUi = (props: any) => {
//     const {
//         userId,
//         jobTitle,
//         userName,
//         isOnline,
//         chatDate
//     } = props;

//     const [messages, setMessages] = useState<any[]>(mockMessages);
//     const [newMessage, setNewMessage] = useState('');
//     const [startRecording, setStartRecording] = useState(false);
//     const [showLock, setShowLock] = useState(false);
//     const [lockRecording, setLockRecording] = useState(false);
//     const [replyingTo, setReplyingTo] = useState<any>(null);
//     const [swipedMessageId, setSwipedMessageId] = useState<string | null>(null);
//     const flatListRef = useRef<FlatList>(null);
//     const currentUserId = '101';
//     const pan = useRef(new Animated.ValueXY()).current;

//     const handleReply = (message: any) => {
//         setReplyingTo(message);
//     };

//     const cancelReply = () => {
//         setReplyingTo(null);
//     };

//     const handleChatMenu = () => {
//         // Handle chat menu actions
//     }

//     const handleJobTitle = () => {
//         // Handle job title press
//     }
//     const handleVoicRecorder = () => {
//         setStartRecording(true)
//         setShowLock(true)
//     }
//     const handleLockRecording = () => {
//         setShowLock(false)
//         setLockRecording(true)
//     }
//     const handleDeleteRecording = () => {
//         setShowLock(false)
//         setLockRecording(false)
//         setStartRecording(false)
//     }


//     const handleSendMessage = () => {
//         if (newMessage.trim() === '' && !replyingTo) return;

//         const newMsg: any = {
//             id: Date.now().toString(),
//             text: newMessage,
//             senderId: currentUserId,
//             receiverId: userId,
//             timestamp: new Date().toISOString(),
//             status: 'sent',
//             senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
//             receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg',
//             ...(replyingTo && {
//                 repliedTo: {
//                     text: replyingTo.text,
//                     senderImage: replyingTo.senderId === currentUserId
//                         ? replyingTo.senderImage
//                         : replyingTo.receiverImage,
//                 },
//             }),
//         };

//         setMessages(prev => [...prev, newMsg]);
//         setNewMessage('');
//         setReplyingTo(null);
//         setSwipedMessageId(null);

//         setTimeout(() => {
//             flatListRef.current?.scrollToEnd({ animated: true });
//         }, 100);
//     };


//     const renderMessage = ({ item }: { item: any }) => (
//         <ChatMessageItem
//             message={item}
//             currentUserId={currentUserId}
//         />
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <ChatHeader
//                 jobTitle={jobTitle}
//                 userName={userName}
//                 status={isOnline ? "Online" : "Offline"}
//                 handleChatMenu={handleChatMenu}
//                 handleJobTitle={handleJobTitle}
//             />
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={styles.chatContainer}
//             >
//                 <FlatList
//                     ref={flatListRef}
//                     data={messages}
//                     renderItem={renderMessage}
//                     keyExtractor={(item) => item.id}
//                     contentContainerStyle={styles.messagesList}
//                     showsVerticalScrollIndicator={false}
//                     onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//                     onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
//                 />
//                 {showLock &&
//                     <TouchableOpacity style={[styles.btnContainer, styles.lockContainer]} onPress={handleLockRecording}>
//                         <SVGIcons.whiteLock />
//                     </TouchableOpacity>
//                 }
//                 <View style={styles.inputMainContainer}>
//                     <View style={styles.inputContainer}>
//                         {startRecording && (
//                             <View style={styles.recordingContainer}>
//                                 <TouchableOpacity onPress={handleDeleteRecording}>
//                                     <SVGIcons.deleteIcon width={20} height={20} />
//                                 </TouchableOpacity>
//                                 <View style={styles.recordingIndicator} />
//                                 <View style={styles.recordingTextContainer}>
//                                     <Text style={styles.recordingText}>Recording</Text>
//                                     <Text style={styles.recordingText}>{"00.01"}</Text>
//                                 </View>
//                             </View>
//                         )}
//                         {!startRecording && (
//                             <View style={styles.emojiContainer}>
//                                 <TouchableOpacity>
//                                     <SVGIcons.emoji />
//                                 </TouchableOpacity>
//                                 <TextInput
//                                     style={styles.input}
//                                     value={newMessage}
//                                     onChangeText={setNewMessage}
//                                     placeholder="Type a message..."
//                                     placeholderTextColor={COLORS.GreyedOut}
//                                     multiline
//                                 />
//                             </View>
//                         )}
//                         <View style={styles.fileVoiceContainer}>
//                             {!startRecording && (
//                                 <>
//                                     <TouchableOpacity>
//                                         <SVGIcons.fileAttach />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity>
//                                         <SVGIcons.insertPhoto />
//                                     </TouchableOpacity>
//                                 </>
//                             )}
//                             {!lockRecording && newMessage.length === 0 &&
//                                 <TouchableOpacity onPress={handleVoicRecorder}>
//                                     <SVGIcons.chatVoice />
//                                 </TouchableOpacity>
//                             }
//                             {lockRecording &&
//                                 <>
//                                     <SVGIcons.LockIconAlt width={20} height={20} />
//                                     <TouchableOpacity
//                                         style={styles.btnContainer}
//                                         onPress={handleSendMessage}
//                                     >
//                                         <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
//                                     </TouchableOpacity>
//                                 </>
//                             }
//                             {newMessage.length > 0 &&
//                                 <TouchableOpacity
//                                     style={styles.btnContainer}
//                                     onPress={handleSendMessage}
//                                 >
//                                     <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
//                                 </TouchableOpacity>
//                             }
//                         </View>
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     )
// }

// export default ChatInboxUi

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     chatContainer: {
//         flex: 1,
//     },
//     messagesList: {
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         backgroundColor: COLORS.white,
//     },
//     messageRow: {
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         marginBottom: 10,
//     },
//     currentUserRow: {
//         justifyContent: 'flex-end',
//     },
//     otherUserRow: {
//         justifyContent: 'flex-start',
//     },
//     messageContainer: {
//         maxWidth: '85%',
//         padding: 12,
//         borderRadius: 12,
//     },
//     currentUserMessage: {
//         backgroundColor: COLORS.Navy,
//         borderBottomRightRadius: 0,
//         marginLeft: 8,
//     },
//     otherUserMessage: {
//         backgroundColor: COLORS.otherChatBgColor,
//         borderBottomLeftRadius: 0,
//         marginRight: 8,
//     },
//     messageText: {
//         fontSize: fontSize[14],
//         fontFamily: FONTS.interRegular,
//         fontWeight: "400",
//         color: COLORS.Navy
//     },
//     currentUserMessageText: {
//         color: COLORS.white,
//     },
//     messageTime: {
//         fontSize: 12,
//         marginTop: 5,
//         textAlign: 'right',
//     },
//     currentUserMessageTime: {
//         color: 'rgba(255,255,255,0.7)',
//     },
//     userImageContainer: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         overflow: 'hidden',
//         backgroundColor: COLORS.grey,
//         marginHorizontal: 4,
//     },
//     userImage: {
//         width: '100%',
//         height: '100%',
//     },
//     inputMainContainer: {
//         paddingHorizontal: 20,
//         paddingBottom: 20,
//         paddingTop: 10,
//         backgroundColor: COLORS.white,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderWidth: 1,
//         borderRadius: 8,
//         borderColor: COLORS.inputBorder,
//         minHeight: 44,
//         backgroundColor: COLORS.white,
//         paddingRight: 8,
//     },
//     recordingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//         paddingLeft: 8,
//         gap: 4
//     },
//     recordingTextContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 2
//     },
//     recordingText: {
//         fontSize: fontSize[14],
//         fontFamily: FONTS.interRegular,
//         fontWeight: "400",
//         color: COLORS.GreyedOut
//     },
//     recordingIndicator: {
//         width: 10,
//         height: 10,
//         borderRadius: 5,
//         backgroundColor: COLORS.ErrorRed
//     },
//     emojiContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//         paddingLeft: 8,
//     },
//     fileVoiceContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         gap: 4,
//         end: 4
//     },
//     iconButton: {
//         padding: 4,
//     },
//     input: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//         paddingHorizontal: 8,
//         paddingVertical: 8,
//         maxHeight: 100,
//     },
//     lockContainer: {
//         alignSelf: 'flex-end',
//         marginEnd: 32,
//         bottom: -6,
//         zIndex: 2
//     },
//     btnContainer: {
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         backgroundColor: COLORS.Navy,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     sendButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// })

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
    Image,
    PanResponder,
    Animated
} from 'react-native'
import React, { useState, useRef } from 'react'
import ChatHeader from '../../../../components/AppHeader/ChatHeader'
import { COLORS, FONTS, fontSize } from '../../../../config/themes/theme';
import { SVGIcons } from '../../../../config/constants/svg';

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
        chatDate
    } = props;

    const [messages, setMessages] = useState<any[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const [startRecording, setStartRecording] = useState(false);
    const [showLock, setShowLock] = useState(false);
    const [lockRecording, setLockRecording] = useState(false);
    const [replyingTo, setReplyingTo] = useState<any>(null);
    const [showReplyIcon, setShowReplyIcon] = useState<string | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const currentUserId = '101'; // This would normally come from your auth context

    // Pan responder for swipe to reply
    const panResponder = (messageId: string, isCurrentUser: boolean) => {
        const pan = new Animated.ValueXY();

        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                // Only allow left swipe for current user's messages and right swipe for others
                if ((isCurrentUser && gestureState.dx < 0) || (!isCurrentUser && gestureState.dx > 0)) {
                    pan.setValue({ x: gestureState.dx, y: 0 });
                    setShowReplyIcon(messageId);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if ((isCurrentUser && gestureState.dx < -50) || (!isCurrentUser && gestureState.dx > 50)) {
                    // Find the message being replied to
                    const messageToReply = messages.find(msg => msg.id === messageId);
                    if (messageToReply) {
                        setReplyingTo(messageToReply);
                    }
                }
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
                setShowReplyIcon(null);
            },
            onPanResponderTerminate: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
                setShowReplyIcon(null);
            }
        });
    };

    const handleChatMenu = () => {
        // Handle chat menu actions
    }

    const handleJobTitle = () => {
        // Handle job title press
    }

    const handleVoicRecorder = () => {
        setStartRecording(true)
        setShowLock(true)
    }

    const handleLockRecording = () => {
        setShowLock(false)
        setLockRecording(true)
    }

    const handleDeleteRecording = () => {
        setShowLock(false)
        setLockRecording(false)
        setStartRecording(false)
    }

    const handleSendMessage = () => {
        if ((newMessage.trim() === '' && !lockRecording)) return;

        const newMsg: any = {
            id: Date.now().toString(),
            text: newMessage,
            senderId: currentUserId,
            receiverId: userId,
            timestamp: new Date().toISOString(),
            status: 'sent',
            senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg',
            ...(replyingTo && { replyTo: replyingTo.id }) // Add reply reference if replying
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        setReplyingTo(null);
        setShowLock(false);
        setLockRecording(false);
        setStartRecording(false);

        // Scroll to bottom after sending
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }

    const cancelReply = () => {
        setReplyingTo(null);
    }

    const renderMessage = ({ item }: { item: any }) => {
        const isCurrentUser = item.senderId === currentUserId;
        const userImage = isCurrentUser ? item.senderImage : item.receiverImage;
        const panResponderInstance = panResponder(item.id, isCurrentUser);

        // Check if this message is a reply to another message
        const isReply = item.replyTo;
        const repliedMessage = isReply ? messages.find(msg => msg.id === item.replyTo) : null;

        return (
            <Animated.View
                style={[
                    styles.messageRow,
                    isCurrentUser ? styles.currentUserRow : styles.otherUserRow
                ]}
                {...panResponderInstance.panHandlers}
            >
                {/* Show reply icon when swiping */}
                {showReplyIcon === item.id && (
                    <View style={styles.replyIconContainer}>
                        <SVGIcons.replayIcon />
                    </View>
                )}

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
                    {/* Reply preview if this is a reply */}
                    {isReply && repliedMessage && (
                        <View style={[
                            styles.replyPreviewContainer,
                            isCurrentUser ? styles.currentUserReplyPreview : styles.otherUserReplyPreview
                        ]}>
                            <Text style={styles.replyPreviewText}>
                                Replying to: {repliedMessage.text.length > 30
                                    ? repliedMessage.text.substring(0, 30) + '...'
                                    : repliedMessage.text}
                            </Text>
                        </View>
                    )}

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
            </Animated.View>
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

                {showLock &&
                    <TouchableOpacity style={[styles.btnContainer, styles.lockContainer]} onPress={handleLockRecording}>
                        <SVGIcons.whiteLock />
                    </TouchableOpacity>
                }

                {/* Reply preview in input area */}
                {replyingTo && (
                    <View style={styles.replyBar}>
                        <View style={styles.replyingToContainer}>
                            <Text style={styles.replyBarTitle}>Replying to {replyingTo.senderId === currentUserId ? 'yourself' : userName}</Text>
                            <TouchableOpacity onPress={cancelReply}>
                                <SVGIcons.crossIcon width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.replyBarContent}>
                            <View style={styles.replyBarLine} />
                            <View style={styles.replyBarTextContainer}>
                                <Text style={styles.replyBarMessage} numberOfLines={1}>
                                    {replyingTo.text.length > 40
                                        ? replyingTo.text.substring(0, 40) + '...'
                                        : replyingTo.text}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                <View style={[styles.inputMainContainer, { backgroundColor: replyingTo ? COLORS.otherChatBgColor : COLORS.white }]}>
                    <View style={styles.inputContainer}>
                        {startRecording && (
                            <View style={styles.recordingContainer}>
                                <TouchableOpacity onPress={handleDeleteRecording}>
                                    <SVGIcons.deleteIcon width={20} height={20} />
                                </TouchableOpacity>
                                <View style={styles.recordingIndicator} />
                                <View style={styles.recordingTextContainer}>
                                    <Text style={styles.recordingText}>Recording</Text>
                                    <Text style={styles.recordingText}>{"00.01"}</Text>
                                </View>
                            </View>
                        )}
                        {!startRecording && (
                            <View style={styles.emojiContainer}>
                                <TouchableOpacity>
                                    <SVGIcons.emoji />
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    value={newMessage}
                                    onChangeText={setNewMessage}
                                    placeholder={replyingTo ? "Type a reply..." : "Type a message..."}
                                    placeholderTextColor={COLORS.GreyedOut}
                                    multiline
                                />
                            </View>
                        )}
                        <View style={styles.fileVoiceContainer}>
                            {!startRecording && (
                                <>
                                    <TouchableOpacity>
                                        <SVGIcons.fileAttach />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <SVGIcons.insertPhoto />
                                    </TouchableOpacity>
                                </>
                            )}
                            {!lockRecording && newMessage.length === 0 &&
                                <TouchableOpacity onPress={handleVoicRecorder}>
                                    <SVGIcons.chatVoice />
                                </TouchableOpacity>
                            }
                            {lockRecording &&
                                <>
                                    <SVGIcons.LockIconAlt width={20} height={20} />
                                    <TouchableOpacity
                                        style={styles.btnContainer}
                                        onPress={handleSendMessage}
                                    >
                                        <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
                                    </TouchableOpacity>
                                </>
                            }
                            {newMessage.length > 0 &&
                                <TouchableOpacity
                                    style={styles.btnContainer}
                                    onPress={handleSendMessage}
                                >
                                    <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

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
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        color: COLORS.Navy
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
    inputMainContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: COLORS.white,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.inputBorder,
        minHeight: 44,
        backgroundColor: COLORS.white,
        paddingRight: 8,
    },
    recordingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 8,
        gap: 4
    },
    recordingTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    recordingText: {
        fontSize: fontSize[14],
        fontFamily: FONTS.interRegular,
        fontWeight: "400",
        color: COLORS.GreyedOut
    },
    recordingIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.ErrorRed
    },
    emojiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 8,
    },
    fileVoiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 4,
        end: 4
    },
    iconButton: {
        padding: 4,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 8,
        maxHeight: 100,
    },
    lockContainer: {
        alignSelf: 'flex-end',
        marginEnd: 32,
        bottom: -6,
        zIndex: 2
    },
    btnContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.Navy,
        alignItems: 'center',
        justifyContent: 'center',
    },
    replyIconContainer: {
        position: 'absolute',
        left: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
    replyPreviewContainer: {
        padding: 8,
        borderRadius: 6,
        marginBottom: 8,
        borderLeftWidth: 3,
    },
    currentUserReplyPreview: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderLeftColor: COLORS.white,
    },
    otherUserReplyPreview: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderLeftColor: COLORS.Navy,
    },
    replyPreviewText: {
        fontSize: fontSize[12],
        fontStyle: 'italic',
        color: COLORS.GreyedOut
    },
    replyBar: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: COLORS.otherChatBgColor
    },
    replyBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyBarLine: {
        width: 4,
        height: 40,
        backgroundColor: COLORS.Navy100,
        borderRadius: 22,
        marginRight: 10
    },
    replyBarTextContainer: {
        flex: 1,
    },
    replyingToContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8
    },
    replyBarTitle: {
        fontSize: fontSize[12],
        color: COLORS.Navy,
        fontWeight: 'bold'
    },
    replyBarMessage: {
        fontSize: fontSize[12],
        color: COLORS.GreyedOut
    },
    replyBarClose: {
        // marginLeft: 10,
        // padding: 5
    }
});

export default ChatInboxUi;