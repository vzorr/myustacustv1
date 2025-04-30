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
import { chatInboxStyles } from './chatInboxStyles';
import { mockMessages } from '../../../../utils/ChatMockApi\'s/ChatMockApi';

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

    // Format time with AM/PM
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    // Pan responder for swipe to reply (now only right swipe for all messages)
    const panResponder = (messageId: string) => {
        const pan = new Animated.ValueXY();

        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 0) { // Only allow right swipe
                    pan.setValue({ x: gestureState.dx, y: 0 });
                    setShowReplyIcon(messageId);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                const swipeThreshold = 50;
                const isSwipeValid = gestureState.dx > swipeThreshold;

                if (isSwipeValid) {
                    const messageToReply = messages.find(msg => msg.id === messageId);
                    if (messageToReply) {
                        setReplyingTo(messageToReply);
                    }
                }
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
                setTimeout(() => setShowReplyIcon(null), 200);
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
        const panResponderInstance = panResponder(item.id);

        // Check if this message is a reply to another message
        const isReply = item.replyTo;
        const repliedMessage = isReply ? messages.find(msg => msg.id === item.replyTo) : null;

        return (
            <Animated.View
                style={[
                    chatInboxStyles.messageRow,
                    isCurrentUser ? chatInboxStyles.currentUserRow : chatInboxStyles.otherUserRow
                ]}
                {...panResponderInstance.panHandlers}
            >
                {/* Show reply icon when swiping */}
                {showReplyIcon === item.id && (
                    <View style={[
                        chatInboxStyles.replyIconContainer,
                        isCurrentUser ? chatInboxStyles.currentUserReplyIcon : chatInboxStyles.otherUserReplyIcon
                    ]}>
                        <SVGIcons.replayIcon />
                        <Text style={chatInboxStyles.replyIconText}>Reply</Text>
                    </View>
                )}

                {!isCurrentUser && (
                    <View style={chatInboxStyles.userImageContainer}>
                        <Image
                            source={{ uri: userImage }}
                            style={chatInboxStyles.userImage}
                        />
                    </View>
                )}

                <View style={[
                    chatInboxStyles.messageContainer,
                    isCurrentUser ? chatInboxStyles.currentUserMessage : chatInboxStyles.otherUserMessage
                ]}>
                    {/* Reply preview if this is a reply */}
                    {isReply && repliedMessage && (
                        <View style={[
                            chatInboxStyles.replyPreviewContainer,
                            isCurrentUser ? chatInboxStyles.currentUserReplyPreview : chatInboxStyles.otherUserReplyPreview
                        ]}>
                            <View style={chatInboxStyles.replyPreviewContent}>
                                <View style={[
                                    chatInboxStyles.replyPreviewLine,
                                    isCurrentUser ? chatInboxStyles.currentUserReplyPreviewLine : chatInboxStyles.otherUserReplyPreviewLine
                                ]} />
                                <View style={chatInboxStyles.replyPreviewTextContainer}>
                                    <Text style={[
                                        chatInboxStyles.replyPreviewSender,
                                        isCurrentUser ? chatInboxStyles.currentUserReplyPreviewSender : chatInboxStyles.otherUserReplyPreviewSender
                                    ]}>
                                        {repliedMessage.senderId === currentUserId ? 'You' : userName}
                                    </Text>
                                    <Text style={[
                                        chatInboxStyles.replyPreviewText,
                                        isCurrentUser ? chatInboxStyles.currentUserReplyPreviewText : chatInboxStyles.otherUserReplyPreviewText
                                    ]} numberOfLines={1}>
                                        {repliedMessage.text}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <Text style={[
                        chatInboxStyles.messageText,
                        isCurrentUser ? chatInboxStyles.currentUserMessageText : null
                    ]}>{item.text}</Text>

                    <View style={chatInboxStyles.messageTimeContainer}>
                        <Text style={[
                            chatInboxStyles.messageTime,
                            isCurrentUser ? chatInboxStyles.currentUserMessageTime : null
                        ]}>
                            {formatTime(item.timestamp)}
                        </Text>
                    </View>
                </View>

                {isCurrentUser && (
                    <View style={chatInboxStyles.userImageContainer}>
                        <Image
                            source={{ uri: userImage }}
                            style={chatInboxStyles.userImage}
                        />
                    </View>
                )}
            </Animated.View>
        );
    }

    return (
        <SafeAreaView style={chatInboxStyles.container}>
            <ChatHeader
                jobTitle={jobTitle}
                userName={userName}
                status={isOnline ? "Online" : "Offline"}
                handleChatMenu={handleChatMenu}
                handleJobTitle={handleJobTitle}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={chatInboxStyles.chatContainer}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={chatInboxStyles.messagesList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                {showLock &&
                    <TouchableOpacity style={[chatInboxStyles.btnContainer, chatInboxStyles.lockContainer]} onPress={handleLockRecording}>
                        <SVGIcons.whiteLock />
                    </TouchableOpacity>
                }

                {/* Reply preview in input area */}
                {replyingTo && (
                    <View style={chatInboxStyles.replyBar}>
                        <View style={chatInboxStyles.replyingToContainer}>
                            <Text style={chatInboxStyles.replyBarTitle}>
                                Replying to {replyingTo.senderId === currentUserId ? 'yourself' : userName}
                            </Text>
                            <TouchableOpacity onPress={cancelReply}>
                                <SVGIcons.crossIcon width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                        <View style={chatInboxStyles.replyBarContent}>
                            <View style={[
                                chatInboxStyles.replyBarLine,
                                replyingTo.senderId === currentUserId ? chatInboxStyles.currentUserReplyLine : chatInboxStyles.otherUserReplyLine
                            ]} />
                            <View style={chatInboxStyles.replyMessageContainer}>
                                <View style={chatInboxStyles.replyUserImageContainer}>
                                    <Image
                                        source={{ uri: replyingTo.senderId === currentUserId ? replyingTo.senderImage : replyingTo.receiverImage }}
                                        style={chatInboxStyles.replyUserImage}
                                    />
                                </View>
                                <View style={chatInboxStyles.replyTextContainer}>
                                    <Text style={chatInboxStyles.replyBarMessage} numberOfLines={2}>
                                        {replyingTo.text}
                                    </Text>
                                    <Text style={chatInboxStyles.replyBarTime}>
                                        {formatTime(replyingTo.timestamp)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                <View style={[chatInboxStyles.inputMainContainer, { backgroundColor: replyingTo ? COLORS.otherChatBgColor : COLORS.white }]}>
                    <View style={chatInboxStyles.inputContainer}>
                        {startRecording && (
                            <View style={chatInboxStyles.recordingContainer}>
                                <TouchableOpacity onPress={handleDeleteRecording}>
                                    <SVGIcons.deleteIcon width={20} height={20} />
                                </TouchableOpacity>
                                <View style={chatInboxStyles.recordingIndicator} />
                                <View style={chatInboxStyles.recordingTextContainer}>
                                    <Text style={chatInboxStyles.recordingText}>Recording</Text>
                                    <Text style={chatInboxStyles.recordingText}>{"00.01"}</Text>
                                </View>
                            </View>
                        )}
                        {!startRecording && (
                            <View style={chatInboxStyles.emojiContainer}>
                                <TouchableOpacity>
                                    <SVGIcons.emoji />
                                </TouchableOpacity>
                                <TextInput
                                    style={chatInboxStyles.input}
                                    value={newMessage}
                                    onChangeText={setNewMessage}
                                    placeholder={replyingTo ? "Type a reply..." : "Type a message..."}
                                    placeholderTextColor={COLORS.GreyedOut}
                                    multiline
                                />
                            </View>
                        )}
                        <View style={chatInboxStyles.fileVoiceContainer}>
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
                                        style={chatInboxStyles.btnContainer}
                                        onPress={handleSendMessage}
                                    >
                                        <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
                                    </TouchableOpacity>
                                </>
                            }
                            {newMessage.length > 0 &&
                                <TouchableOpacity
                                    style={chatInboxStyles.btnContainer}
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

export default ChatInboxUi;