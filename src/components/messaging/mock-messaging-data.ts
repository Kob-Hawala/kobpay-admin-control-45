// Mock data for P2P transaction messages
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  type: "text" | "event";
  content: string;
  timestamp: Date;
  status: string;
}

export interface ChatThread {
  id: string;
  orderId: string;
  buyer: { id: string; name: string; avatarUrl: string };
  seller: { id: string; name: string; avatarUrl: string };
  amount: number;
  currency: string;
  fiatAmount: number;
  fiatCurrency: string;
  status: string;
  lastMessage: string;
  lastMessageTime: Date;
  messages: Message[];
}

export const mockChatThreads: ChatThread[] = [
  {
    id: "thread-001",
    orderId: "P2P-12345",
    buyer: {
      id: "user-123",
      name: "Alice Johnson",
      avatarUrl: "",
    },
    seller: {
      id: "user-456",
      name: "Bob Smith",
      avatarUrl: "",
    },
    amount: 0.5,
    currency: "BTC",
    fiatAmount: 15000,
    fiatCurrency: "USD",
    status: "in_progress",
    lastMessage: "I've sent the bank transfer. Please confirm receipt.",
    lastMessageTime: new Date("2025-05-16T14:35:22"),
    messages: [
      {
        id: "msg-001",
        senderId: "user-123",
        senderName: "Alice Johnson",
        type: "text",
        content: "Hello, I'd like to buy 0.5 BTC",
        timestamp: new Date("2025-05-16T14:20:00"),
        status: "delivered",
      },
      {
        id: "msg-002",
        senderId: "user-456",
        senderName: "Bob Smith",
        type: "text",
        content: "Great, please send the payment to my bank account listed in the order details",
        timestamp: new Date("2025-05-16T14:25:45"),
        status: "delivered",
      },
      {
        id: "msg-003",
        senderId: "system",
        senderName: "System",
        type: "event",
        content: "Escrow created for 0.5 BTC",
        timestamp: new Date("2025-05-16T14:26:12"),
        status: "delivered",
      },
      {
        id: "msg-004",
        senderId: "user-123",
        senderName: "Alice Johnson",
        type: "text",
        content: "I've sent the bank transfer. Please confirm receipt.",
        timestamp: new Date("2025-05-16T14:35:22"),
        status: "delivered",
      },
    ],
  },
  {
    id: "thread-002",
    orderId: "P2P-12346",
    buyer: {
      id: "user-789",
      name: "Chen Wei",
      avatarUrl: "",
    },
    seller: {
      id: "user-101",
      name: "Darlene Roberts",
      avatarUrl: "",
    },
    amount: 2.0,
    currency: "ETH",
    fiatAmount: 5800,
    fiatCurrency: "USD",
    status: "dispute",
    lastMessage: "I haven't received the ETH yet, opening dispute",
    lastMessageTime: new Date("2025-05-17T10:12:45"),
    messages: [
      {
        id: "msg-101",
        senderId: "user-789",
        senderName: "Chen Wei",
        type: "text",
        content: "Hi, I want to purchase 2 ETH",
        timestamp: new Date("2025-05-17T09:45:00"),
        status: "delivered",
      },
      {
        id: "msg-102",
        senderId: "user-101",
        senderName: "Darlene Roberts",
        type: "text",
        content: "Accepted. Please send $5800 to my bank account.",
        timestamp: new Date("2025-05-17T09:48:20"),
        status: "delivered",
      },
      {
        id: "msg-103",
        senderId: "system",
        senderName: "System",
        type: "event",
        content: "Escrow created for 2.0 ETH",
        timestamp: new Date("2025-05-17T09:50:00"),
        status: "delivered",
      },
      {
        id: "msg-104",
        senderId: "user-789",
        senderName: "Chen Wei",
        type: "text",
        content: "I've sent the payment. Transaction ID: BANK123456",
        timestamp: new Date("2025-05-17T10:05:12"),
        status: "delivered",
      },
      {
        id: "msg-105",
        senderId: "user-101",
        senderName: "Darlene Roberts",
        type: "text",
        content: "I'm checking my bank account, one moment",
        timestamp: new Date("2025-05-17T10:08:30"),
        status: "delivered",
      },
      {
        id: "msg-106",
        senderId: "user-789",
        senderName: "Chen Wei",
        type: "text",
        content: "I haven't received the ETH yet, opening dispute",
        timestamp: new Date("2025-05-17T10:12:45"),
        status: "delivered",
      },
      {
        id: "msg-107",
        senderId: "system",
        senderName: "System",
        type: "event",
        content: "Dispute opened by buyer",
        timestamp: new Date("2025-05-17T10:13:00"),
        status: "delivered",
      },
    ],
  },
  {
    id: "thread-003",
    orderId: "P2P-12347",
    buyer: {
      id: "user-202",
      name: "Eva Martinez",
      avatarUrl: "",
    },
    seller: {
      id: "user-303",
      name: "Frank Wilson",
      avatarUrl: "",
    },
    amount: 1000,
    currency: "USDT",
    fiatAmount: 1000,
    fiatCurrency: "USD",
    status: "completed",
    lastMessage: "Thank you for the smooth transaction!",
    lastMessageTime: new Date("2025-05-16T18:45:10"),
    messages: [
      {
        id: "msg-201",
        senderId: "user-202",
        senderName: "Eva Martinez",
        type: "text",
        content: "Hello, I'd like to purchase 1000 USDT",
        timestamp: new Date("2025-05-16T18:30:00"),
        status: "delivered",
      },
      {
        id: "msg-202",
        senderId: "system",
        senderName: "System",
        type: "event",
        content: "Escrow created for 1000 USDT",
        timestamp: new Date("2025-05-16T18:31:22"),
        status: "delivered",
      },
      {
        id: "msg-203",
        senderId: "user-303",
        senderName: "Frank Wilson",
        type: "text",
        content: "I've received the payment and released the USDT",
        timestamp: new Date("2025-05-16T18:40:45"),
        status: "delivered",
      },
      {
        id: "msg-204",
        senderId: "system",
        senderName: "System",
        type: "event",
        content: "Escrow released, transaction completed",
        timestamp: new Date("2025-05-16T18:41:00"),
        status: "delivered",
      },
      {
        id: "msg-205",
        senderId: "user-202",
        senderName: "Eva Martinez",
        type: "text",
        content: "Thank you for the smooth transaction!",
        timestamp: new Date("2025-05-16T18:45:10"),
        status: "delivered",
      },
    ],
  },
];