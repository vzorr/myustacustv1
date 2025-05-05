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
import ImagePicker from 'react-native-image-crop-picker';
// import DocumentPicker from '@react-native-documents/picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import EmojiKeyboard from 'rn-emoji-keyboard';
import FastImage from 'react-native-fast-image';
import DocumentPicker, { types } from '@react-native-documents/picker';
import ChatModal from '../../../../components/ConfirmationModal/ChatModal';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
type Attachment = {
    type: 'image' | 'file' | 'audio';
    uri: string;
    name?: string | null;  // Add null to the type
    size?: number | null;  // Add null to the type
    duration?: string | null;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const ChatInboxUi = (props: any) => {
    const {
        userId,
        jobId,
        jobTitle,
        userName,
        isOnline,
        chatDate,
        navigation
    } = props;

    const [messages, setMessages] = useState<any[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');
    const [startRecording, setStartRecording] = useState(false);
    const [showLock, setShowLock] = useState(false);
    const [lockRecording, setLockRecording] = useState(false);
    const [replyingTo, setReplyingTo] = useState<any>(null);
    const [showReplyIcon, setShowReplyIcon] = useState<string | null>(null);
    const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [blockUser, setBlockUser] = useState(false);
    const [deleteChat, setDeleteChat] = useState(false);
    const [recordingTime, setRecordingTime] = useState('00:00');
    const [recordSecs, setRecordSecs] = useState(0);
    const [audioPath, setAudioPath] = useState('');
    // Update the attachments state type definition
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [emojiKeyboardOpen, setEmojiKeyboardOpen] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const currentUserId = '101';

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    const panResponder = (messageId: string) => {
        const pan = new Animated.ValueXY();

        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 0) {
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

    const handleEmojiSelect = (emoji: any) => {
        setNewMessage(prev => prev + emoji.emoji);
    };

    const toggleEmojiKeyboard = () => {
        // setShowEmojiKeyboard(prev => !prev);
        setEmojiKeyboardOpen(prev => !prev);
        setShowEmojiKeyboard(prev => !prev);
    };

    const startAudioRecording = async () => {
        try {
            const result = await audioRecorderPlayer.startRecorder();
            setAudioPath(result);
            audioRecorderPlayer.addRecordBackListener((e: any) => {
                setRecordSecs(e.current_position);
                setRecordingTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
            });
            setStartRecording(true);
            setShowLock(true);
        } catch (error) {
            console.log('Recording error', error);
        }
    };

    const stopAudioRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setStartRecording(false);
            setLockRecording(false);

            setAttachments(prev => [...prev, {
                type: 'audio',
                uri: result,
                name: `recording-${Date.now()}.mp3`,
                size: recordSecs
            }]);

            setRecordingTime('00:00');
            setRecordSecs(0);
        } catch (error) {
            console.log('Stop recording error', error);
        }
    };

    const handleFileAttachment = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            const newAttachment: Attachment = {
                type: 'file',
                uri: res[0].uri,
                name: res[0].name ?? undefined,  // Explicit conversion
                size: res[0].size ?? undefined   // Explicit conversion
            };

            setAttachments(prev => [...prev, newAttachment]);
        } catch (err) {
            // Error handling
        }
    };


    const handleImageAttachment = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
                multiple: true,
            });

            const newImages = Array.isArray(image) ? image : [image];
            const imageAttachments = newImages.map(img => ({
                type: 'image' as const,
                uri: img.path,
                name: img.filename || `image-${Date.now()}.jpg`,
                size: img.size
            }));

            setAttachments(prev => [...prev, ...imageAttachments]);
        } catch (err: any) {
            if (err.code !== 'E_PICKER_CANCELLED') {
                console.log('Image picker error', err);
            }
        }
    };

    const handleChatMenu = () => {
        setShowModal(true)
    }
    const handleViewProgress = () => {
        setShowModal(false)
    }
    const handleContract = () => {
        setShowModal(false)
    }
    const handleBlockUser = () => {
        setShowModal(false)
        setBlockUser(true)
    }
    const handleConfirmBlockUser = () => {
        setBlockUser(false)
    }
    const handleDeleteChat = () => {
        setShowModal(false)
        setDeleteChat(true)
    }
    const handleConfirmDeleteChat = () => {
        setDeleteChat(false)
    }

    const handleChatProfileImg = () => {
        navigation.navigate('Tabs', {
            screen: 'JobsStatusSackNav',
            params: {
                screen: 'UstaProfile',
                params: {
                    otherUserId: '',
                    jobId: jobId,
                },
            },
        });
        setShowModal(false)
    }
    const handleChatSelfProfileImg = () => {
        navigation.navigate('Tabs', {
            screen: 'ProfileScreen',
        })
    }

    const handleJobTitle = () => {
        navigation.navigate("PostedJobDetailScreen", { jobId: jobId })
    }

    const handleVoicRecorder = () => {
        startAudioRecording();
    }

    const handleLockRecording = () => {
        setShowLock(false);
        setLockRecording(true);
    }

    const handleDeleteRecording = () => {
        stopAudioRecording();
    }

    const handleSendMessage = () => {
        if ((newMessage.trim() === '' && !lockRecording && attachments.length === 0)) return;

        const newMsg: any = {
            id: Date.now().toString(),
            text: newMessage,
            senderId: currentUserId,
            receiverId: userId,
            timestamp: new Date().toISOString(),
            status: 'sent',
            senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg',
            ...(replyingTo && { replyTo: replyingTo.id }),
            ...(attachments.length > 0 && { attachments: [...attachments] })
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        setAttachments([]);
        setReplyingTo(null);
        setShowLock(false);
        setLockRecording(false);
        setStartRecording(false);

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
                    <TouchableOpacity style={chatInboxStyles.userImageContainer} onPress={handleChatProfileImg}>
                        <Image
                            source={{ uri: userImage }}
                            style={chatInboxStyles.userImage}
                        />
                    </TouchableOpacity>
                )}

                <View style={[
                    chatInboxStyles.messageContainer,
                    isCurrentUser ? chatInboxStyles.currentUserMessage : chatInboxStyles.otherUserMessage
                ]}>
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

                    {item.attachments && item.attachments.map((attachment: any, index: number) => {
                        if (attachment.type === 'image') {
                            return (
                                <FastImage
                                    key={index}
                                    source={{ uri: attachment.uri }}
                                    style={chatInboxStyles.attachmentImage}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            );
                        } else if (attachment.type === 'file') {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={chatInboxStyles.fileAttachmentContainer}
                                    onPress={() => { }}
                                >
                                    <SVGIcons.fileAttach width={24} height={24} />
                                    <Text style={chatInboxStyles.fileName} numberOfLines={1}>
                                        {attachment.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        } else if (attachment.type === 'audio') {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={chatInboxStyles.audioAttachmentContainer}
                                    onPress={() => { }}
                                >
                                    <SVGIcons.deleteIcon width={24} height={24} />
                                    <Text style={chatInboxStyles.audioDuration}>
                                        {attachment.duration || '00:00'}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }
                        return null;
                    })}

                    {item.text && (
                        <Text style={[
                            chatInboxStyles.messageText,
                            isCurrentUser ? chatInboxStyles.currentUserMessageText : null
                        ]}>{item.text}</Text>
                    )}

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
                    <TouchableOpacity style={chatInboxStyles.userImageContainer} onPress={handleChatSelfProfileImg}>
                        <Image
                            source={{ uri: userImage }}
                            style={chatInboxStyles.userImage}
                        />
                    </TouchableOpacity>
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

                {attachments.length > 0 && (
                    <View style={chatInboxStyles.attachmentsPreviewContainer}>
                        {attachments.map((attachment, index) => (
                            <View key={index} style={chatInboxStyles.attachmentPreview}>
                                {attachment.type === 'image' ? (
                                    <FastImage
                                        source={{ uri: attachment.uri }}
                                        style={chatInboxStyles.previewImage}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                ) : attachment.type === 'file' ? (
                                    <View style={chatInboxStyles.previewFile}>
                                        <SVGIcons.fileAttach width={24} height={24} />
                                        <Text style={chatInboxStyles.previewFileName} numberOfLines={1}>
                                            {attachment.name}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={chatInboxStyles.previewAudio}>
                                        <SVGIcons.chatVoice width={24} height={24} />
                                        <Text style={chatInboxStyles.previewAudioDuration}>
                                            {recordingTime}
                                        </Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    style={chatInboxStyles.removeAttachmentButton}
                                    onPress={() => {
                                        const newAttachments = [...attachments];
                                        newAttachments.splice(index, 1);
                                        setAttachments(newAttachments);
                                    }}
                                >
                                    <SVGIcons.crossIcon width={16} height={16} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {showEmojiKeyboard && (
                    <EmojiKeyboard
                        onEmojiSelected={handleEmojiSelect}
                        enableSearchBar={true}
                        open={emojiKeyboardOpen}
                        onClose={() => setEmojiKeyboardOpen(false)}
                        styles={{
                            container: {
                                backgroundColor: COLORS.white,
                                borderTopWidth: 1,
                                borderTopColor: COLORS.grey,
                            } as any, // Type assertion
                            searchBar: {
                                backgroundColor: COLORS.grey,
                            } as any,
                        }}
                    />
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
                                    <Text style={chatInboxStyles.recordingText}>{recordingTime}</Text>
                                </View>
                            </View>
                        )}
                        {!startRecording && (
                            <View style={chatInboxStyles.emojiContainer}>
                                <TouchableOpacity onPress={toggleEmojiKeyboard}>
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
                                    <TouchableOpacity onPress={handleFileAttachment}>
                                        <SVGIcons.fileAttach />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleImageAttachment}>
                                        <SVGIcons.insertPhoto />
                                    </TouchableOpacity>
                                </>
                            )}
                            {!lockRecording && newMessage.length === 0 && !startRecording &&
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
                <ChatModal
                    visible={showModal}
                    isProgress={false}
                    handleViewProfile={handleChatProfileImg}
                    handleViewProgress={handleViewProgress}
                    handleContract={handleContract}
                    handleBlockUser={handleBlockUser}
                    handleDeleteChat={handleDeleteChat}
                />
                <ConfirmationModal
                    visible={blockUser}
                    title='Block User?'
                    message='You can unblock users again'
                    confirmText='Block User'
                    onCancel={() => setBlockUser(false)}
                    Confirm={handleConfirmBlockUser}
                />
                <ConfirmationModal
                    visible={deleteChat}
                    title='Delete Chat?'
                    confirmText='Delete'
                    onCancel={() => setDeleteChat(false)}
                    Confirm={handleConfirmDeleteChat}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatInboxUi;