export const mockMessages: any[] = [
    {
        id: '1',
        text: 'Hey there! How are you doing?',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'delivered',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        id: '2',
        text: "I'm good! Working on that project we discussed.",
        senderId: '102',
        receiverId: '101',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        status: 'read',
        senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: '3',
        text: 'When do you think you can finish?',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        status: 'delivered',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        id: '4',
        text: 'Probably by Friday. I will send you the files then.',
        senderId: '102',
        receiverId: '101',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'read',
        senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: '5',
        text: 'Sounds good! Looking forward to it.',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        status: 'delivered',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        id: '6',
        text: 'Did you check the new design specs I sent?',
        senderId: '102',
        receiverId: '101',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        status: 'read',
        senderImage: 'https://randomuser.me/api/portraits/women/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: '7',
        text: 'Not yet, will review them today and get back to you.',
        senderId: '101',
        receiverId: '102',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        status: 'sent',
        senderImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        receiverImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
];