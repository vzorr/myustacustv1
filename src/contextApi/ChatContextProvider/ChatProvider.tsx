import { useSelector } from "react-redux";
import { SCOCKET_BASE_URL } from "../../apiManager/Client";
import { ChatContext } from "../ChatContext/ChatContext";
import { io } from 'socket.io-client';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userData }: any = useSelector((state: any) => state?.userInfo)
    const userId = userData?.userId;
    const socket = io(SCOCKET_BASE_URL, {
        transports: ['websocket'],
        query: { userId }
    });

    return (
        <ChatContext.Provider value={socket}>
            {children}
        </ChatContext.Provider>
    );
};
