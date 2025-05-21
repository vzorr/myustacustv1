import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    Animated,
    PanResponder,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { Formik } from 'formik';
import ChatHeader from '../../../../components/AppHeader/ChatHeader';
import { COLORS } from '../../../../config/themes/theme';
import { SVGIcons } from '../../../../config/constants/svg';
import { chatInboxStyles } from './chatInboxStyles';
import EmojiKeyboard from 'rn-emoji-keyboard';
import CustomImagePickerModal from '../../../../components/ImagePickerModal/ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import ChatModal from '../../../../components/ConfirmationModal/ChatModal';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';

// Import message components
import {
    SelfMessage,
    OtherMessage,
    AudioSelfMessage,
    AudioOtherMessage,
    ReplySelfMessage,
    ReplyOtherMessage,
    SelfImages,
    OtherImages,
    SelfFileAttach,
    OtherFileAttach,
} from './ChatComponents';

const audioRecorderPlayer = new AudioRecorderPlayer();

interface ChatInboxUiProps {
    userId: string;
    jobId: string;
    jobTitle: string;
    userName: string;
    isOnline: boolean;
    isBlocked: boolean;
    navigation: any;
    messages: any[];
    loggedInUserId: string;
    userProfile: any;
    onSendMessage: (values: any) => void;
    onLoadMore: () => void;
    onRefresh: () => void;
    refreshing: boolean;
    isLoadingMore: boolean;
    onResendMessage: (message: any) => void;
    isConnected: boolean;
}

const ChatInboxUi: React.FC<ChatInboxUiProps> = (props) => {
    const {
        userId,
        jobId,
        jobTitle,
        userName,
        isOnline,
        isBlocked,
        navigation,
        messages,
        loggedInUserId,
        userProfile,
        onSendMessage,
        onLoadMore,
        onRefresh,
        refreshing,
        isLoadingMore,
        onResendMessage,
        isConnected
    } = props;

    // State
    const [replyingTo, setReplyingTo] = useState<any>(null);
    const [showReplyIcon, setShowReplyIcon] = useState<string | null>(null);
    const [showEmojiKeyboard, setShowEmojiKeyboard] = useState<boolean>(false);
    const [emojiKeyboardOpen, setEmojiKeyboardOpen] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [blockUser, setBlockUser] = useState<boolean>(false);
    const [deleteChat, setDeleteChat] = useState<boolean>(false);
    const [showImageModal, setShowImageModal] = useState<boolean>(false);
    const [startRecording, setStartRecording] = useState<boolean>(false);
    const [showLock, setShowLock] = useState<boolean>(false);
    const [lockRecording, setLockRecording] = useState<boolean>(false);
    const [recordingTime, setRecordingTime] = useState<string>('00:00');
    const [recordSecs, setRecordSecs] = useState<number>(0);
    const [audioPath, setAudioPath] = useState<string>('');
    const [attachments, setAttachments] = useState<any[]>([]);
    
    // Refs
    const flatListRef = useRef<FlatList>(null);
    const inputRef = useRef<TextInput>(null);
    
    // Format time for messages
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
    
    // Pan responder for swipe to reply
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
                    const messageToReply = messages.find((msg) => msg.id === messageId);
                    if (messageToReply) {
                        setReplyingTo(messageToReply);
                        inputRef.current?.focus();
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
    
    // Handle emoji selection
    const handleEmojiSelect = (emoji: any) => {
        if (inputRef.current) {
            const currentText = inputRef.current.value || '';
            inputRef.current.setNativeProps({ text: currentText + emoji.emoji });
        }
    };
    
    // Toggle emoji keyboard
    const toggleEmojiKeyboard = () => {
        setEmojiKeyboardOpen(prev => !prev);
        setShowEmojiKeyboard(prev => !prev);
    };
    
    // Start audio recording
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
    
    // Stop audio recording
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
    
    // Handle chat menu
    const handleChatMenu = () => {
        setShowModal(true);
    };
    
    // View progress
    const handleViewProgress = () => {
        setShowModal(false);
        // Implementation for viewing progress
    };
    
    // Handle contract
    const handleContract = () => {
        setShowModal(false);
        // Implementation for handling contract
    };
    
    // Block user
    const handleBlockUser = () => {
        setShowModal(false);
        setBlockUser(true);
    };
    
    // Confirm block user
    const handleConfirmBlockUser = () => {
        // Implementation for confirming block user
        setBlockUser(false);
    };
    
    // Delete chat
    const handleDeleteChat = () => {
        setShowModal(false);
        setDeleteChat(true);
    };
    
    // Confirm delete chat
    const handleConfirmDeleteChat = () => {
        // Implementation for confirming delete chat
        setDeleteChat(false);
    };
    
    // View profile
    const handleChatProfileImg = () => {
        navigation.navigate('Tabs', {
            screen: 'JobsStatusSackNav',
            params: {
                screen: 'UstaProfile',
                params: {
                    otherUserId: userId,
                    jobId: jobId,
                },
            },
        });
        setShowModal(false);
    };
    
    // View current user profile
    const handleChatSelfProfileImg = () => {
        navigation.navigate('Tabs', {
            screen: 'ProfileScreen',
        });
    };
    
    // View job details
    const handleJobTitle = () => {
        navigation.navigate("PostedJobDetailScreen", { jobId: jobId });
    };
    
    // Start voice recording
    const handleVoicRecorder = () => {
        startAudioRecording();
    };
    
    // Lock recording
    const handleLockRecording = () => {
        setShowLock(false);
        setLockRecording(true);
    };
    
    // Delete recording
    const handleDeleteRecording = () => {
        stopAudioRecording();
    };
    
    // Cancel reply
    const cancelReply = () => {
        setReplyingTo(null);
    };
    
    // Take photo
    const takePhotoWithCamera = async () => {
        try {
            const remainingSlots = 4 - attachments.filter(a => a.type === 'image').length;
            if (remainingSlots <= 0) {
                return;
            }

            const image = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo',
            });

            const newAttachment = {
                type: 'image',
                uri: image.path,
                name: image.filename || `photo-${Date.now()}.jpg`,
                size: image.size
            };

            setAttachments(prev => [...prev, newAttachment]);
            setShowImageModal(false);
        } catch (err: any) {
            if (err.code !== 'E_PICKER_CANCELLED') {
                console.log('Camera error', err);
            }
            setShowImageModal(false);
        }
    };
    
    // Pick image from gallery
    const pickImageFromGallery = async () => {
        try {
            const remainingSlots = 4 - attachments.filter(a => a.type === 'image').length;
            if (remainingSlots <= 0) {
                return;
            }

            const images = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
                multiple: true,
                mediaType: 'photo',
                maxFiles: remainingSlots,
            });

            const selectedImages = Array.isArray(images) ? images : [images];
            const imageAttachments = selectedImages.slice(0, remainingSlots).map(img => ({
                type: 'image',
                uri: img.path,
                name: img.filename || `image-${Date.now()}.jpg`,
                size: img.size
            }));

            setAttachments(prev => [...prev, ...imageAttachments]);
            setShowImageModal(false);
        } catch (err: any) {
            if (err.code !== 'E_PICKER_CANCELLED') {
                console.log('Gallery picker error', err);
            }
            setShowImageModal(false);
        }
    };
    
    // Show image upload modal
    const handleImageUpload = () => {
        setShowImageModal(true);
    };
    
    // Cancel image modal
    const handleCancelModal = () => {
        setShowImageModal(false);
    };
    
    // Render message item
    const renderMessage = ({ item, index }: { item: any; index: number }) => {
        const isCurrentUser = item.senderId === loggedInUserId;
        const userImage = isCurrentUser 
            ? userProfile?.profilePicture 
            : item.senderImage || 'https://randomuser.me/api/portraits/men/1.jpg';
        const panResponderInstance = panResponder(item.id);
        
        // Handle message types
        const messageType = item.type || item.messageType;
        const hasAttachments = item.attachments && item.attachments.length > 0;
        const isReply = item.replyToMessageId || item.replyTo;
        const repliedMessage = isReply && item.replyToMessageId
            ? messages.find(msg => msg.id === item.replyToMessageId || msg.messageId === item.replyToMessageId)
            : null;
            
        // Failed message
        if (item.status === 'failed') {
            return (
                <View style={chatInboxStyles.failedMessageContainer}>
                    <Text style={chatInboxStyles.failedMessageText}>
                        Failed to send message
                    </Text>
                    <TouchableOpacity 
                        style={chatInboxStyles.resendButton}
                        onPress={() => onResendMessage(item)}
                    >
                        <Text style={chatInboxStyles.resendButtonText}>Resend</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        
        // Audio message
        if (messageType === 'audio') {
            return isCurrentUser ? (
                <AudioSelfMessage
                    message={{
                        timestamp: item.timestamp || item.ChatDate,
                        senderImage: userImage,
                        attachments: [{
                            type: 'audio',
                            uri: item.audioFile,
                            duration: item.duration || '00:30'
                        }]
                    }}
                    formatTime={formatTime}
                    onProfilePress={handleChatSelfProfileImg}
                    onAudioPress={() => {}}
                />
            ) : (
                <AudioOtherMessage
                    message={{
                        timestamp: item.timestamp || item.ChatDate,
                        receiverImage: userImage,
                        attachments: [{
                            type: 'audio',
                            uri: item.audioFile,
                            duration: item.duration || '00:30'
                        }]
                    }}
                    formatTime={formatTime}
                    onProfilePress={handleChatProfileImg}
                    onAudioPress={() => {}}
                />
            );
        }
        
        // Image message
        if (messageType === 'image' || (item.messageImages && item.messageImages.length > 0)) {
            const imageAttachments = item.messageImages ? 
                item.messageImages.map((img: any) => ({
                    type: 'image',
                    uri: img.url || img.path || img
                })) : [];
                
            return isCurrentUser ? (
                <SelfImages
                    message={{
                        timestamp: item.timestamp || item.ChatDate,
                        senderImage: userImage,
                        attachments: imageAttachments
                    }}
                    formatTime={formatTime}
                    onProfilePress={handleChatSelfProfileImg}
                    onImagePress={() => {}}
                />
            ) : (
                <OtherImages
                    message={{
                        timestamp: item.timestamp || item.ChatDate,
                        receiverImage: userImage,
                        attachments: imageAttachments
                    }}
                    formatTime={formatTime}
                    onProfilePress={handleChatProfileImg}
                    onImagePress={() => {}}
                />
            );
        }
        
        // Reply message
        if (isReply && repliedMessage) {
            return isCurrentUser ? (
                <ReplySelfMessage
                    message={{
                        text: item.textMsg || item.message || '',
                        timestamp: item.timestamp || item.ChatDate,
                        senderImage: userImage,
                        replyTo: item.replyToMessageId || item.replyTo
                    }}
                    repliedMessage={{
                        text: repliedMessage.textMsg || repliedMessage.message || '',
                        senderId: repliedMessage.senderId
                    }}
                    formatTime={formatTime}
                    onProfilePress={handleChatSelfProfileImg}
                    currentUserId={loggedInUserId}
                    userName={userName}
                />
            ) : (
                <ReplyOtherMessage
                    message={{
                        text: item.textMsg || item.message || '',
                        timestamp: item.timestamp || item.ChatDate,
                        receiverImage: userImage,
                        replyTo: item.replyToMessageId || item.replyTo
                    }}
                    repliedMessage={{
                        text: repliedMessage.textMsg || repliedMessage.message || '',
                        senderId: repliedMessage.senderId
                    }}
                    formatTime={formatTime}
                    onProfilePress={handleChatProfileImg}
                    currentUserId={loggedInUserId}
                    userName={userName}
                />
            );
        }
        
        // Regular text message
        return isCurrentUser ? (
            <SelfMessage
                message={{
                    id: item.id || item.messageId,
                    text: item.textMsg || item.message || '',
                    timestamp: item.timestamp || item.ChatDate,
                    senderImage: userImage,
                }}
            />
        ) : (
            <OtherMessage
                message={{
                    id: item.id || item.messageId,
                    text: item.textMsg || item.message || '',
                    timestamp: item.timestamp || item.ChatDate,
                    receiverImage: userImage,
                }}
            />
        );
    };
    
    // List empty component
    const renderEmptyList = () => (
        <View style={chatInboxStyles.emptyContainer}>
            <Text style={chatInboxStyles.emptyText}>
                {isConnected ? "No messages yet. Start the conversation!" : "Connecting to chat server..."}
            </Text>
        </View>
    );
    
    // List header component
    const renderListHeader = () => (
        <>
            {isLoadingMore && (
                <View style={chatInboxStyles.loadingMoreContainer}>
                    <ActivityIndicator size="small" color={COLORS.Navy} />
                    <Text style={chatInboxStyles.loadingMoreText}>Loading more messages...</Text>
                </View>
            )}
        </>
    );

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
                    keyExtractor={(item, index) => item.id || item.messageId || index.toString()}
                    contentContainerStyle={chatInboxStyles.messagesList}
                    showsVerticalScrollIndicator={false}
                    inverted={true}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={renderListHeader}
                    ListEmptyComponent={renderEmptyList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[COLORS.Navy]}
                            tintColor={COLORS.Navy}
                        />
                    }
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
                                Replying to {replyingTo.senderId === loggedInUserId ? 'yourself' : userName}
                            </Text>
                            <TouchableOpacity onPress={cancelReply}>
                                <SVGIcons.crossIcon width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                        <View style={chatInboxStyles.replyBarContent}>
                            <View style={[
                                chatInboxStyles.replyBarLine,
                                replyingTo.senderId === loggedInUserId ? chatInboxStyles.currentUserReplyLine : chatInboxStyles.otherUserReplyLine
                            ]} />
                            <View style={chatInboxStyles.replyMessageContainer}>
                                <View style={chatInboxStyles.replyUserImageContainer}>
                                    <Image
                                        source={{ uri: replyingTo.senderId === loggedInUserId ? userProfile?.profilePicture : 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                        style={chatInboxStyles.replyUserImage}
                                    />
                                </View>
                                <View style={chatInboxStyles.replyTextContainer}>
                                    <Text style={chatInboxStyles.replyBarMessage} numberOfLines={1}>
                                        {replyingTo.textMsg || replyingTo.message}
                                    </Text>
                                    <Text style={chatInboxStyles.replyBarTime}>
                                        {formatTime(replyingTo.timestamp || replyingTo.ChatDate)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {attachments.length > 0 && (
                    <View style={chatInboxStyles.attachmentsPreviewContainer}>
                        {attachments.slice(0, 4).map((attachment, index) => (
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
                        {attachments.length > 4 && (
                            <View style={chatInboxStyles.attachmentPreview}>
                                <View style={[chatInboxStyles.previewImage, {
                                    backgroundColor: COLORS.grey,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]}>
                                    <Text style={{ color: COLORS.white }}>+{attachments.length - 4}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                )}
                
                <Formik
                    initialValues={{
                        textMsg: '',
                        imageFile: null,
                        audioFile: null,
                    }}
                    onSubmit={(values, { resetForm }) => {
                        // Add attachments to form values
                        const messageData = { ...values };
                        
                        // Handle image attachments
                        const imageAttachments = attachments.filter(a => a.type === 'image');
                        if (imageAttachments.length > 0) {
                            messageData.imageFile = imageAttachments[0];
                        }
                        
                        // Handle audio attachments
                        const audioAttachments = attachments.filter(a => a.type === 'audio');
                        if (audioAttachments.length > 0) {
                            messageData.audioFile = audioAttachments[0].uri;
                        }
                        
                        // Add reply information
                        if (replyingTo) {
                            messageData.replyToMessageId = replyingTo.id || replyingTo.messageId;
                        }
                        
                        // Send the message
                        onSendMessage(messageData);
                        
                        // Reset the form and state
                        resetForm();
                        setAttachments([]);
                        setReplyingTo(null);
                        
                        // Scroll to bottom
                        setTimeout(() => {
                            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
                        }, 100);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                        <>
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
                                        } as any,
                                        searchBar: {
                                            backgroundColor: COLORS.grey,
                                        } as any,
                                    }}
                                />
                            )}

                            <View style={[
                                chatInboxStyles.inputMainContainer, 
                                { backgroundColor: replyingTo || attachments.length > 0 ? COLORS.otherChatBgColor : COLORS.white }
                            ]}>
                                <View style={chatInboxStyles.inputContainer}>
                                    {startRecording ? (
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
                                    ) : (
                                        <View style={chatInboxStyles.emojiContainer}>
                                            <TouchableOpacity onPress={toggleEmojiKeyboard}>
                                                <SVGIcons.emoji />
                                            </TouchableOpacity>
                                            <TextInput
                                                ref={inputRef}
                                                style={chatInboxStyles.input}
                                                value={values.textMsg}
                                                onChangeText={handleChange("textMsg")}
                                                placeholder={replyingTo ? "Type a reply..." : "Type a message..."}
                                                placeholderTextColor={COLORS.GreyedOut}
                                                multiline
                                                onBlur={handleBlur("textMsg")}
                                                editable={!isBlocked}
                                            />
                                        </View>
                                    )}
                                    
                                    <View style={chatInboxStyles.fileVoiceContainer}>
                                        {!startRecording && !isBlocked && (
                                            <>
                                                <TouchableOpacity onPress={() => {/* Handle file attachment */}}>
                                                    <SVGIcons.fileAttach />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={handleImageUpload}>
                                                    <SVGIcons.insertPhoto />
                                                </TouchableOpacity>
                                            </>
                                        )}
                                        
                                        {!lockRecording && values.textMsg.length === 0 && 
                                          !startRecording && attachments.length === 0 && !isBlocked && (
                                            <TouchableOpacity onPress={handleVoicRecorder}>
                                                <SVGIcons.chatVoice />
                                            </TouchableOpacity>
                                        )}
                                        
                                        {lockRecording && (
                                            <>
                                                <SVGIcons.LockIconAlt width={20} height={20} />
                                                <TouchableOpacity
                                                    style={chatInboxStyles.btnContainer}
                                                    onPress={() => handleSubmit()}
                                                    disabled={isBlocked}
                                                >
                                                    <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
                                                </TouchableOpacity>
                                            </>
                                        )}
                                        
                                        {(values.textMsg.length > 0 || attachments.length > 0) && (
                                            <TouchableOpacity
                                                style={chatInboxStyles.btnContainer}
                                                onPress={() => handleSubmit()}
                                                disabled={isBlocked}
                                            >
                                                <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                                
                                {isBlocked && (
                                    <View style={chatInboxStyles.blockedBanner}>
                                        <SVGIcons.LockIcon width={16} height={16} />
                                        <Text style={chatInboxStyles.blockedText}>
                                            This conversation has been blocked
                                        </Text>
                                    </View>
                                )}
                                
                                {!isConnected && (
                                    <View style={chatInboxStyles.connectionBanner}>
                                        <Text style={chatInboxStyles.connectionText}>
                                            Connecting to chat server...
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </>
                    )}
                </Formik>
                
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
                
                <CustomImagePickerModal
                    onTakePhoto={takePhotoWithCamera}
                    onPickFromGallery={pickImageFromGallery}
                    handleCancel={handleCancelModal}
                    showImageModal={showImageModal}
                    setShowImageModal={setShowImageModal}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatInboxUi;