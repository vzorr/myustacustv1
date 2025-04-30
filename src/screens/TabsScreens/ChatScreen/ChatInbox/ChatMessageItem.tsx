// ChatMessageItem.tsx
import React from 'react';
import SelfMessage from './SelfMessage';
import OtherMessage from './OtherMessage';

interface ChatMessageItemProps {
    message: {
        id: string;
        text: string;
        senderId: string;
        timestamp: string;
        senderImage: string;
        receiverImage: string;
    };
    currentUserId: string;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, currentUserId }) => {
    const isCurrentUser = message.senderId === currentUserId;

    return isCurrentUser ? (
        <SelfMessage
            message={{
                id: message.id,
                text: message.text,
                timestamp: message.timestamp,
                senderImage: message.senderImage,
            }}
        />
    ) : (
        <OtherMessage
            message={{
                id: message.id,
                text: message.text,
                timestamp: message.timestamp,
                receiverImage: message.receiverImage,
            }}
        />
    );
};

export default ChatMessageItem;