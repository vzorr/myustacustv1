import moment from "moment";
import { Platform } from "react-native";
import { v4 as uuidv4 } from "uuid";

export const MergeNewMessage = (
  oldMessage: any[],
  values: any,
  userInfo: any,
  chatData: any,
  fileNamee: any
) => {
  const timestamp = moment().unix();
  const formattedDate = new Date().toISOString();

  const baseMessage = {
    messageId: uuidv4(),
    clientTempId: `temp-${Math.random().toString(36).substr(2, 5)}`,
    jobId: chatData?.jobId || "0",
    jobTitle: chatData?.jobTitle || "",
    userName: userInfo?.firstName || "",
    phone: userInfo?.phone || "",
    userId: userInfo?.userId || "",
    receiverId: chatData?.userId || "",
    isOnline: chatData?.isOnline || false,
    isBlocked: chatData?.isBlocked || false,
    ChatDate: formattedDate,
    messageType: "", // will be filled conditionally
    messageImages: [],
    audioFile: "",
    message: "",
    replyToMessageId: null,
    editedAt: null,
    deleted: false,
    isSystemMessage: false,
    attachments: [],
  };

  let sendNewMessage: any = { ...baseMessage };

  if (values.textMsg) {
    sendNewMessage.messageType = "text";
    sendNewMessage.message = values.textMsg;
  } else if (values.imageFile) {
    const [_, ext] = values.imageFile.mime.split("/");
    const fileName = values.imageFile.modificationDate + "." + ext;

    sendNewMessage.messageType = "image";
    sendNewMessage.messageImages = [
      {
        chatMessageId: null,
        dataBytes: null,
        dataExtension: ext,
        dataFileName: fileName,
        dataPath: values.imageFile.path,
      },
    ];
  } else if (values.audioFile) {
    const random = moment().unix();
    const fileName = `${random}.m4a`;

    sendNewMessage.messageType = "audio";
    sendNewMessage.audioFile = values.audioFile;
    sendNewMessage.attachments = [
      {
        chatMessageId: null,
        dataBytes: null,
        dataExtension: ".m4a",
        dataFileName: fileName,
        dataPath: values.audioFile,
      },
    ];
  } else if (values.videoFile) {
    const fileName = fileNamee || `${moment().unix()}.mp4`;

    sendNewMessage.messageType = "video";
    sendNewMessage.attachments = [
      {
        chatMessageId: null,
        dataBytes: null,
        dataExtension: ".mp4",
        dataFileName: fileName,
        dataPath: values.videoFile.path,
      },
    ];
  }

  return [...oldMessage, sendNewMessage];
};
