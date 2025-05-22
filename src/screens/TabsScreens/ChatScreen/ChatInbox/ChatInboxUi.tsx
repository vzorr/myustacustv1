import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import ChatHeader from '../../../../components/AppHeader/ChatHeader';
import { COLORS } from '../../../../config/themes/theme';
import { SVGIcons } from '../../../../config/constants/svg';
import { chatInboxStyles } from './chatInboxStyles';
import { Message, AttachmentType } from '../../../../types/chat';
import MessageItem from './components/MessageItem';
import AttachmentPicker from './components/AttachmentPicker';
import AudioRecorder from './components/AudioRecorder';

interface ChatInboxUiProps {
  jobId: string;
  jobTitle: string;
  userName: string;
  isOnline: boolean;
  isBlocked: boolean;
  messages: Message[];
  sending: boolean;
  connected: boolean;
  typing: { [userId: string]: boolean };
  onSendMessage: (content: string, replyTo?: string) => void;
  onSendAttachment: (file: any, type: AttachmentType) => void;
  onLoadMore: () => void;
  onTyping: (isTyping: boolean) => void;
  navigation: any;
}

const ChatInboxUi: React.FC<ChatInboxUiProps> = ({
  jobId,
  jobTitle,
  userName,
  isOnline,
  isBlocked,
  messages,
  sending,
  connected,
  typing,
  onSendMessage,
  onSendAttachment,
  onLoadMore,
  onTyping,
  navigation
}) => {
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    if (!inputText.trim() || sending || isBlocked) return;

    const content = inputText.trim();
    const replyTo = replyingTo?.id;

    onSendMessage(content, replyTo);
    setInputText('');
    setReplyingTo(null);
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }, 100);
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    
    // Handle typing indicator
    if (!isBlocked) {
      onTyping(true);
      
      // Clear previous timer
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
      
      // Set new timer to stop typing after 2 seconds
      const timer = setTimeout(() => {
        onTyping(false);
      }, 2000);
      
      setTypingTimer(timer);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleAttachmentSelect = (file: any, type: AttachmentType) => {
    setShowAttachmentPicker(false);
    onSendAttachment(file, type);
  };

  const handleAudioRecord = (audioFile: any) => {
    setIsRecording(false);
    onSendAttachment(audioFile, AttachmentType.AUDIO);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageItem
      message={item}
      onReply={handleReply}
      onProfilePress={() => {/* Handle profile press */}}
    />
  );

  const renderTypingIndicator = () => {
    const isTyping = Object.values(typing).some(Boolean);
    if (!isTyping) return null;

    return (
      <View style={chatInboxStyles.typingIndicator}>
        <Text style={chatInboxStyles.typingText}>
          {userName} is typing...
        </Text>
      </View>
    );
  };

  const renderConnectionStatus = () => {
    if (connected) return null;

    return (
      <View style={chatInboxStyles.connectionBanner}>
        <Text style={chatInboxStyles.connectionText}>
          Connecting...
        </Text>
      </View>
    );
  };

  const renderReplyBar = () => {
    if (!replyingTo) return null;

    return (
      <View style={chatInboxStyles.replyBar}>
        <View style={chatInboxStyles.replyContent}>
          <View style={chatInboxStyles.replyLine} />
          <View style={chatInboxStyles.replyText}>
            <Text style={chatInboxStyles.replyLabel}>
              Replying to {replyingTo.senderId === 'currentUser' ? 'yourself' : userName}
            </Text>
            <Text style={chatInboxStyles.replyMessage} numberOfLines={1}>
              {replyingTo.content}
            </Text>
          </View>
          <TouchableOpacity onPress={handleCancelReply}>
            <SVGIcons.crossIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderInput = () => {
    if (isRecording) {
      return (
        <AudioRecorder
          onFinish={handleAudioRecord}
          onCancel={() => setIsRecording(false)}
        />
      );
    }

    return (
      <View style={chatInboxStyles.inputContainer}>
        <TouchableOpacity 
          onPress={() => setShowAttachmentPicker(true)}
          style={chatInboxStyles.attachmentButton}
        >
          <SVGIcons.fileAttach />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          style={chatInboxStyles.input}
          value={inputText}
          onChangeText={handleInputChange}
          placeholder={replyingTo ? "Reply..." : "Type a message..."}
          placeholderTextColor={COLORS.GreyedOut}
          multiline
          editable={!isBlocked && connected}
        />

        {inputText.trim() ? (
          <TouchableOpacity 
            onPress={handleSend}
            style={chatInboxStyles.sendButton}
            disabled={sending || isBlocked || !connected}
          >
            <SVGIcons.sendIcon stroke={COLORS.white} width={20} height={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => setIsRecording(true)}
            style={chatInboxStyles.voiceButton}
            disabled={isBlocked || !connected}
          >
            <SVGIcons.chatVoice />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={chatInboxStyles.container}>
      <ChatHeader
        jobTitle={jobTitle}
        userName={userName}
        status={connected ? (isOnline ? "Online" : "Offline") : "Connecting..."}
        handleChatMenu={() => {/* Handle menu */}}
        handleJobTitle={() => navigation.navigate("PostedJobDetailScreen", { jobId })}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={chatInboxStyles.chatContainer}
      >
        {renderConnectionStatus()}
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={chatInboxStyles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted={true}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={renderTypingIndicator}
        />

        {renderReplyBar()}
        
        <View style={chatInboxStyles.inputMainContainer}>
          {renderInput()}
          
          {isBlocked && (
            <View style={chatInboxStyles.blockedBanner}>
              <SVGIcons.LockIcon width={16} height={16} />
              <Text style={chatInboxStyles.blockedText}>
                This conversation is blocked
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      <AttachmentPicker
        visible={showAttachmentPicker}
        onSelect={handleAttachmentSelect}
        onClose={() => setShowAttachmentPicker(false)}
      />
    </SafeAreaView>
  );
};

export default ChatInboxUi;