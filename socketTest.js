const { io } = require("socket.io-client");

const SERVER_URL = "http://47.254.134.96:3001"; // The server IP and port
const TEST_USER_ID = "8f3d7b1e-2cd4-472a-8dbf-9cbe560e2e75"; // Test user ID

console.log(`🔌 Connecting to Socket.IO server at ${SERVER_URL}`);

// Initialize socket with websocket transport only
const socket = io(SERVER_URL, {
  transports: ["websocket"],
  query: {
    userId: TEST_USER_ID
  }
});

// Connection event
socket.on("connect", () => {
  console.log("✅ Connected to Socket.IO server");
  console.log(`🔑 Socket ID: ${socket.id}`);
  
  // Join a test chat room
  const roomData = {
    jobId: "8f3d7b1e-2cd4-472a-8dbf-9cbe560e2e75",
    userId: TEST_USER_ID,
    receiverId: "some-receiver-id" // Replace with an actual receiver ID
  };
  
  console.log("🚪 Joining chat room:", roomData);
  socket.emit("join_chat_room", roomData);
  
  // Request chat history
  console.log("📚 Requesting chat history");
  socket.emit("get_chat_history", {
    jobId: roomData.jobId,
    userId: roomData.userId,
    receiverId: roomData.receiverId
  });
  
  // Send a test message after 2 seconds
  setTimeout(() => {
    const message = {
      messageId: Date.now().toString(),
      clientTempId: "temp-" + Date.now().toString(),
      jobId: roomData.jobId,
      jobTitle: "Test Job Title",
      userName: "Test User",
      phone: "+11234567890",
      userId: TEST_USER_ID,
      receiverId: roomData.receiverId,
      isOnline: true,
      isBlocked: false,
      ChatDate: new Date().toISOString(),
      messageType: "text",
      messageImages: [],
      audioFile: "",
      textMsg: "Test message from socketTest.js",
      replyToMessageId: null,
      editedAt: null,
      deleted: false,
      isSystemMessage: false,
      attachments: [],
      status: "sending"
    };
    
    console.log("📤 Sending test message:", message.messageId);
    socket.emit("send_message", message);
  }, 2000);
});

// Chat list received
socket.on("chat_list_received", (data) => {
  console.log("📋 Chat list received:", data.length || 0, "chats");
  // Uncomment to log the full data
  // console.log(JSON.stringify(data, null, 2));
});

// Chat history received
socket.on("chat_history_received", (data) => {
  console.log("📂 Chat history received:", data.length || 0, "messages");
  // Uncomment to log the full data
  // console.log(JSON.stringify(data, null, 2));
});

// Message received event
socket.on("receive_message", (data) => {
  console.log("📥 Received message:", data.messageId);
  console.log("From:", data.userName, "(", data.userId, ")");
  console.log("Content:", data.textMsg);
  console.log("Status:", data.status);
  console.log("Timestamp:", data.ChatDate);
  // Uncomment to log the full message
  // console.log(JSON.stringify(data, null, 2));
});

// Error event
socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});

// Disconnect event
socket.on("disconnect", (reason) => {
  console.log("⚠️ Disconnected from server:", reason);
  
  if (reason === "io server disconnect") {
    // The server disconnected the client
    console.log("🔄 Server disconnected the client, attempting to reconnect...");
    socket.connect();
  }
});

// Exit after 15 seconds for test
setTimeout(() => {
  console.log("🕒 Test complete, disconnecting...");
  
  // Leave the room before disconnecting
  socket.emit("leave_chat_room", {
    jobId: "8f3d7b1e-2cd4-472a-8dbf-9cbe560e2e75",
    userId: TEST_USER_ID,
    receiverId: "some-receiver-id"
  });
  
  socket.disconnect();
  process.exit(0);
}, 15000);

console.log("⏳ Waiting for connection and events..."); 