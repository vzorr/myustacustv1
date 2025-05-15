import React, { useContext, useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { UserNavigationRootProps } from '../../../../types/stacksParams'
import ChatInboxUi from './ChatInboxUi'
import { useSelector } from 'react-redux'
import { ConversationContext } from '../../../../config/context/ConversationContext'
import RNFS from 'react-native-fs';
import moment from 'moment'
import { MergeNewMessage } from './MergeNewMessage'
import Toast from 'react-native-simple-toast';
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import { BASE_CHAT_SCOCKET_URL } from '../../../../apiManager/Client'

const ChatInboxContainer: React.FC<UserNavigationRootProps<"ChatInbox">> = (props) => {
    const chatData = props?.route?.params?.chatData
    const [chatList, setChatList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentIndex, setCurrentIndex] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(0)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [token, setIsToken] = useState<string>("")
    // const [userInfo, setUserInfo] = useState<any>();
    const [videoFile, setVideoFile] = useState<any>();
    const { userData } = useSelector((state: any) => state?.userInfo)
    const { userProfile }: any = useSelector((state: any) => state?.userProfile)
    const userInfo = userData
    console.log("chatData", chatData)
    // const socket: any = useContext(ConversationContext)
    const { route, navigation } = props
    const { otherUserId, jobId, jobTitle, userName, isOnline, isBlocked, isBlocker, chatDate } = route?.params?.chatData;
    const socket = io(BASE_CHAT_SCOCKET_URL, {
        transports: ['websocket'],
        query: { userId: userInfo?.userId }
    });
    console.log('userInfo', socket)
    useEffect(() => {
        if (userInfo && userInfo.token) {
            socket.emit("", userInfo.userId, (responseData: any, error: any) => {
                if (error) {
                } else {
                }
            });
            // socket.emit("", {
            //     senderId: userInfo?.userId,
            //     receiverId: chatData?.userId,
            //     pageSize: 20,
            //     pageNum: 1
            // }, (responseData: any, error: any) => {
            //     if (error) {
            //     } else {
            //     }

            // });
            // socket.on('', (res: any) => {
            //     if (res) {
            //         let response = JSON.parse(res)
            //         setChatList(response?.chatMessages?.reverse())
            //         setCurrentIndex(response?.currentPageIndex)
            //         setPageCount(response?.pageCount)
            //         setLoading(false)
            //     }
            // })
        }
        return () => {
        }
    }, [userInfo])
    const chatHandle = async (values: any) => {
        console.log("valuesssss", values)
        setIsScroll(false)
        let videoFileName
  
        try {
            let sendMessagePayload = {
                messageId: uuidv4(),
                clientTempId: 'temp-' + Math.random().toString(36).substr(2, 5),
                jobId: chatData?.jobId || '', // or use productId if that's equivalent
                jobTitle: chatData?.jobTitle || '',
                userName: userInfo?.firstName || '',
                phone: "+923096222666",
                userId: userInfo?.userId || '',
                receiverId: chatData?.otherUserId || '',
                isOnline: chatData?.isOnline || false,
                isBlocked: chatData?.isBlocked || false,
                ChatDate: new Date().toISOString(),
                messageImages: [],
                audioFile: '',
                message: '',
                replyToMessageId: null,
                editedAt: null,
                deleted: false,
                isSystemMessage: false,
                attachments: [],
                messageType: '',
            };
            if (values.textMsg) {
                sendMessagePayload = {
                    ...sendMessagePayload,
                    message: values.textMsg,
                    messageType: 'text',
                }
            }
            console.log("indexindexindexindex", sendMessagePayload)
            // else if (values.imageFile) {
            //     const imageBinaryData = await RNFS.readFile(values.imageFile.path, 'base64');
            //     let imageType
            //     imageType = values.imageFile.mime.split("/")
            //     imageType = imageType[1]
            //     let fileName = values.imageFile.modificationDate + "." + imageType
            //     let chatMessageData = [{
            //         dataExtension: imageType,
            //         dataFileName: fileName,
            //         dataBytes: imageBinaryData
            //     }]
            //     sendMessagePayload = {
            //         ...sendMessagePayload,
            //         chatMessageData: chatMessageData,
            //         chatMessageTypeId: 3,
            //     }

            // }
            // else if (values.audioFile) {
            //     let random = moment().unix()
            //     const imageBinaryData = await RNFS.readFile(values.audioFile, 'base64');

            //     let fileName = `${random}.m4a`
            //     let chatMessageData = [{
            //         dataExtension: 'm4a',
            //         dataFileName: fileName,
            //         dataBytes: imageBinaryData
            //     }]
            //     sendMessagePayload = {
            //         ...sendMessagePayload,
            //         chatMessageData: chatMessageData,
            //         chatMessageTypeId: 2,
            //     }
            // }

            socket.emit("send_message", sendMessagePayload, (responseData: any, error: any) => {
                console.log("sendMsg", responseData, error)
                if (error) {
                } else {
                }
            });
            // if (values.videoFile?.path) {
            //     try {
            //         const downloadDest = `${RNFS.DocumentDirectoryPath}/${videoFileName}`;
            //         let res = await RNFS.copyFile(values.videoFile?.path, downloadDest)
            //     } catch (error) {
            //         console.error('Error copying file:', error);
            //     }

            // }
            let mergeArray = MergeNewMessage(chatList, values, userInfo, chatData, videoFileName)
            setChatList(mergeArray)
        } catch (error) {
            console.log("errror", error)

        }
    }
    useEffect(() => {
        socket.on('receive_message', (res: any) => {
            if (res) {
                setChatList([...chatList, ...[res]])
                setLoading(false)
            }
        })
    }, [chatList])
    return (
        <ChatInboxUi
            userId={otherUserId}
            jobId={jobId}
            jobTitle={jobTitle}
            userName={userName}
            isOnline={isOnline}
            isBlocked={isBlocked}
            isBlocker={isBlocker}
            chatDate={chatDate}
            navigation={navigation}
            chatHandle={chatHandle}
            messages={chatList}
            loggedInUserId={userInfo?.userId}
            userProfile={userProfile}
        />
    )
}

export default ChatInboxContainer