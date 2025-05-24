import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import { UserNavigationRootProps } from '../../../../types/stacksParams';
import { COLORS } from '../../../../config/themes/theme';
import AppHeader from '../../../../components/AppHeader/AppHeader';
import { useChatList } from '../../../../hooks/useChatList';
import { ChatRoom } from '../../../../types/chat';
import ChatListCard from './ChatListCard';
import LoadingScreen from '../../../../components/Loader/LoadingScreen';

const ChatListContainer: React.FC<UserNavigationRootProps<"ChatList">> = ({ navigation }) => {
  const { chatRooms, loading, refreshing, refresh } = useChatList();

  const handleChatPress = (room: ChatRoom) => {
    navigation.navigate("ChatInbox", {
      chatData: {
        otherUserId: room.otherUser.id,
        jobId: room.jobId,
        jobTitle: room.jobTitle,
        userName: room.otherUser.name,
        isOnline: room.otherUser.isOnline,
        isBlocked: room.isBlocked,
      }
    });
  };

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <ChatListCard
      room={item}
      onPress={() => handleChatPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No conversations yet</Text>
      <Text style={styles.emptySubText}>
        Start chatting with Ustas by applying to jobs
      </Text>
    </View>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        onMenuPress={() => {/* Handle menu */}}
        showNotificationBadge={true}
        badgeCount={0}
        isProfile={false}
      />

      <FlatList
        data={chatRooms}
        renderItem={renderChatRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Navy,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.Navy200,
    textAlign: 'center',
  },
});

export default ChatListContainer;