import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../../../../components/AppHeader/AppHeader'
import { UserNavigationRootProps } from '../../../../types/stacksParams'
import { COLORS } from '../../../../config/themes/theme'
import ChatListUi from './ChatListUi'
import { chatListStyle } from './chatListStyles'
import { useIsFocused } from '@react-navigation/native'
interface UsersChatList {
    profilePicture: string | null;
    jobId: number,
    jobTitle: string;
    userName: string;
    userId: number;
    isOnline: boolean;
    isBlocked: boolean;
    isBlocker: boolean;
    lastChatMessage: string;
    lastChatDate: string;
    isOwner: boolean;
    productId: number;
    newMessageCount: number;
}
const ChatListContainer: React.FC<UserNavigationRootProps<"ChatList">> = (props) => {
    const [chatList, setChatList] = useState<UsersChatList[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const isFocused = useIsFocused()
    // const { userData } = useSelector((state: any) => state?.userInfo)

    // const userInfo = userData
    // const socket: any = useContext(ConversationContext)

    // useEffect(() => {
    //     // const unsubscribe = navigation.addListener('focus', () => {
    //     try {
    //         if (userInfo?.isLoggIn) {
    //             socket.emit(CHAT_EVENT_NAMES.CONNECT_USER_TO_SOCKET, userInfo?.userId, (responseData: any, error: any) => {
    //                 if (error) {
    //                 } else {
    //                 }
    //             });
    //             socket.emit(CHAT_EVENT_NAMES.GET_CHAT_LIST, { senderId: userInfo?.userId }, (responseData: any, error: any) => {
    //                 if (error) {
    //                 } else {
    //                 }
    //             });
    //             setLoading(true);
    //             socket.on(CHAT_EVENT_NAMES.LISTEN_GETCHAT_LIST, (res: any) => {
    //                 if (res) {
    //                     setChatList(JSON.parse(res))
    //                     setLoading(false)
    //                 }
    //                 else {
    //                     setLoading(false)
    //                 }
    //             })
    //         }
    //     } catch (error) {
    //         setLoading(false)
    //     }
    //     // });
    //     // return () => {
    //     //     unsubscribe();
    //     // };
    // }, [navigation]);
    useEffect(() => {
        // Simulate API call with dummy data
        const fetchChatList = () => {
            setLoading(true)
            setTimeout(() => {
                const dummyChatList: UsersChatList[] = [
                    {
                        profilePicture: null,
                        jobId: 1,
                        jobTitle: "Looking for an experience electricision",
                        userName: 'John Doe',
                        userId: 1,
                        isOnline: true,
                        isBlocked: false,
                        isBlocker: false,
                        lastChatMessage: 'Hey, how are you doing?',
                        lastChatDate: '2025-04-29T10:30:00', // Today
                        isOwner: true,
                        productId: 101,
                        newMessageCount: 2
                    },
                    {
                        profilePicture: null,
                        jobId: 2,
                        jobTitle: "Looking for an experience plumber",
                        userName: 'Sarah Smith',
                        userId: 2,
                        isOnline: false,
                        isBlocked: false,
                        isBlocker: false,
                        lastChatMessage: 'The item looks great!',
                        lastChatDate: '2025-04-28T15:45:00', // 1 day ago
                        isOwner: false,
                        productId: 102,
                        newMessageCount: 0
                    },
                    {
                        profilePicture: null,
                        jobId: 3,
                        jobTitle: "Looking for an experience mechanics",
                        userName: 'Mike Johnson',
                        userId: 3,
                        isOnline: true,
                        isBlocked: true,
                        isBlocker: false,
                        lastChatMessage: 'Can we meet tomorrow?',
                        lastChatDate: '2025-04-27T09:20:00', // 2 days ago
                        isOwner: true,
                        productId: 103,
                        newMessageCount: 5
                    },
                    {
                        profilePicture: null,
                        jobId: 4,
                        jobTitle: "Looking for an experience electricision",
                        userName: 'Emily Wilson',
                        userId: 4,
                        isOnline: false,
                        isBlocked: false,
                        isBlocker: true,
                        lastChatMessage: 'Thanks for your help!',
                        lastChatDate: '2025-04-26T18:10:00', // 3 days ago
                        isOwner: false,
                        productId: 104,
                        newMessageCount: 0
                    },
                    {
                        profilePicture: null,
                        jobId: 5,
                        jobTitle: "Looking for an experience Plumber",
                        userName: 'David Brown',
                        userId: 5,
                        isOnline: true,
                        isBlocked: false,
                        isBlocker: false,
                        lastChatMessage: 'The price is negotiable',
                        lastChatDate: '2025-04-25T11:25:00', // 4 days ago
                        isOwner: true,
                        productId: 105,
                        newMessageCount: 1
                    },
                ]

                setChatList(dummyChatList)
                setLoading(false)
            }, 1000)
        }

        if (isFocused) {
            fetchChatList()
        }
    }, [isFocused])

    return (
        <SafeAreaView style={chatListStyle.chatListingMain}>
            <AppHeader
                onMenuPress={() => { }}
                showNotificationBadge={true}
                badgeCount={0}
                isProfile={false}
            />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading chats...</Text>
                </View>
            ) : (
                <FlatList
                    data={chatList}
                    contentContainerStyle={{ paddingTop: 8, flexGrow: 1, }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text>No chats available</Text>
                        </View>
                    )}
                    renderItem={({ item, index }) => (
                        <ChatListUi
                            jobId={item?.jobId}
                            jobTitle={item.jobTitle}
                            userName={item.userName}
                            userId={item.userId}
                            lastMsg={item.lastChatMessage}
                            chatDate={item.lastChatDate}
                            count={item.newMessageCount}
                            isOnline={item.isOnline}
                            isBlocked={item.isBlocked}
                            isBlocker={item.isBlocker}
                            navigation={props.navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </SafeAreaView>
    )
}

export default ChatListContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100
    }
})