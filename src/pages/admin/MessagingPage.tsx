
import React, { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, User, Flag } from "lucide-react";
import { format } from "date-fns";

interface ChatMessage {
  id: string;
  type: "user" | "system";
  sender: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

interface ChatThread {
  id: string;
  orderId: string;
  buyer: {
    id: string;
    name: string;
    avatar?: string;
  };
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: "active" | "completed" | "disputed";
  lastMessage: string;
  lastMessageTime: Date;
  unread: boolean;
  messages: ChatMessage[];
}

const mockChats: ChatThread[] = [
  {
    id: "chat-001",
    orderId: "P2P-45621",
    buyer: {
      id: "user-123",
      name: "John Smith",
      avatar: "",
    },
    seller: {
      id: "user-456",
      name: "Maria Garcia",
      avatar: "",
    },
    status: "active",
    lastMessage: "I've sent the payment, please check",
    lastMessageTime: new Date("2025-05-16T10:23:45"),
    unread: true,
    messages: [
      {
        id: "msg-001",
        type: "system",
        sender: "System",
        senderId: "system",
        message: "P2P trade started. Order #P2P-45621 created.",
        timestamp: new Date("2025-05-16T10:15:00"),
      },
      {
        id: "msg-002",
        type: "user",
        sender: "John Smith",
        senderId: "user-123",
        message: "Hi, I'll make the payment now",
        timestamp: new Date("2025-05-16T10:17:30"),
      },
      {
        id: "msg-003",
        type: "system",
        sender: "System",
        senderId: "system",
        message: "Escrow activated. Funds locked.",
        timestamp: new Date("2025-05-16T10:18:00"),
      },
      {
        id: "msg-004",
        type: "user",
        sender: "John Smith",
        senderId: "user-123",
        message: "I've sent the payment, please check",
        timestamp: new Date("2025-05-16T10:23:45"),
      },
    ],
  },
  {
    id: "chat-002",
    orderId: "P2P-45598",
    buyer: {
      id: "user-789",
      name: "Emma Wilson",
      avatar: "",
    },
    seller: {
      id: "user-101",
      name: "Carlos Rodriguez",
      avatar: "",
    },
    status: "disputed",
    lastMessage: "I did not receive the correct amount",
    lastMessageTime: new Date("2025-05-16T09:45:12"),
    unread: true,
    messages: [
      {
        id: "msg-101",
        type: "system",
        sender: "System",
        senderId: "system",
        message: "P2P trade started. Order #P2P-45598 created.",
        timestamp: new Date("2025-05-16T09:30:00"),
      },
      {
        id: "msg-102",
        type: "user",
        sender: "Emma Wilson",
        senderId: "user-789",
        message: "Payment sent as requested",
        timestamp: new Date("2025-05-16T09:35:18"),
      },
      {
        id: "msg-103",
        type: "user",
        sender: "Carlos Rodriguez",
        senderId: "user-101",
        message: "I haven't received the full amount",
        timestamp: new Date("2025-05-16T09:42:30"),
      },
      {
        id: "msg-104",
        type: "user",
        sender: "Emma Wilson",
        senderId: "user-789",
        message: "I sent exactly what was agreed",
        timestamp: new Date("2025-05-16T09:44:05"),
      },
      {
        id: "msg-105",
        type: "user",
        sender: "Carlos Rodriguez",
        senderId: "user-101",
        message: "I did not receive the correct amount",
        timestamp: new Date("2025-05-16T09:45:12"),
      },
      {
        id: "msg-106",
        type: "system",
        sender: "System",
        senderId: "system",
        message: "Dispute opened. Transaction on hold.",
        timestamp: new Date("2025-05-16T09:46:00"),
      },
    ],
  },
  {
    id: "chat-003",
    orderId: "P2P-45542",
    buyer: {
      id: "user-222",
      name: "David Chen",
      avatar: "",
    },
    seller: {
      id: "user-333",
      name: "Sarah Johnson",
      avatar: "",
    },
    status: "completed",
    lastMessage: "Thank you for the trade!",
    lastMessageTime: new Date("2025-05-15T16:12:33"),
    unread: false,
    messages: [
      {
        id: "msg-201",
        type: "system",
        sender: "System",
        senderId: "system",
        message: "P2P trade started. Order #P2P-45542 created.",
        timestamp: new Date("2025-05-15T15:50:00"),
      },
      {
        id: "msg-202",
        type: "user",
        sender: "David Chen",
        senderId: "user-222",
        message: "I've completed the bank transfer",
        timestamp: new Date("2025-05-15T15:55:12"),
      },
      {
        id: "msg-203",
        type: "user",
        sender: "Sarah Johnson",
        senderId: "user-333",
        message: "Got it! Let me check my account",
        timestamp: new Date("2025-05-15T16:01:45"),
      },
      {
        id: "msg-204",
        type: "user",
        sender: "Sarah Johnson",
        senderId: "user-333",
        message: "Payment confirmed, releasing coins now",
        timestamp: new Date("2025-05-15T16:10:22"),
      },
      {
        id: "msg-205",
        type: "system",
        sender: "System",
        senderId: "system",
        message: "Funds released. Transaction complete.",
        timestamp: new Date("2025-05-15T16:11:00"),
      },
      {
        id: "msg-206",
        type: "user",
        sender: "David Chen",
        senderId: "user-222",
        message: "Thank you for the trade!",
        timestamp: new Date("2025-05-15T16:12:33"),
      },
    ],
  },
];

export default function MessagingPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);
  
  // Filter chats based on search and status
  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = 
      chat.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      chat.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "disputed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">P2P Messaging</h1>
          <p className="text-muted-foreground">
            Monitor and review P2P trade chats between users
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-220px)]">
          {/* Chat List */}
          <Card className="w-full lg:w-1/3 flex flex-col">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Active Chats</CardTitle>
              <div className="mt-2 space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by order ID or name..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disputed">Disputed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              {filteredChats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <Filter className="h-8 w-8 mb-2" />
                  <p>No chats match your filters</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredChats.map((chat) => (
                    <div 
                      key={chat.id}
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedChatId === chat.id 
                          ? "border-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedChatId(chat.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)}`} />
                          <span className="font-medium">{chat.orderId}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(chat.lastMessageTime, "HH:mm")}
                        </span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <p className="text-sm truncate max-w-[200px]">{chat.lastMessage}</p>
                        {chat.unread && (
                          <Badge variant="default" className="ml-2">New</Badge>
                        )}
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <div>
                          <span>Buyer: {chat.buyer.name}</span>
                        </div>
                        <div>
                          <span>Seller: {chat.seller.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>
          
          {/* Chat View */}
          <Card className="w-full lg:w-2/3 flex flex-col">
            {selectedChat ? (
              <>
                <CardHeader className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedChat.status)}`} />
                        Order {selectedChat.orderId}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedChat.status === "active" && "Trade in progress"}
                        {selectedChat.status === "disputed" && "Dispute in progress"}
                        {selectedChat.status === "completed" && "Trade completed"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Flag conversation
                    </Button>
                  </div>
                </CardHeader>
                
                {/* User Details Panel */}
                <div className="p-3 bg-muted/30 flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedChat.buyer.avatar} />
                      <AvatarFallback>{selectedChat.buyer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{selectedChat.buyer.name}</p>
                      <p className="text-xs text-muted-foreground">Buyer • ID: {selectedChat.buyer.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium text-sm">{selectedChat.seller.name}</p>
                      <p className="text-xs text-muted-foreground">Seller • ID: {selectedChat.seller.id}</p>
                    </div>
                    <Avatar>
                      <AvatarImage src={selectedChat.seller.avatar} />
                      <AvatarFallback>{selectedChat.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedChat.messages.map((message) => (
                      <div key={message.id}>
                        {message.type === "system" ? (
                          <div className="flex justify-center">
                            <div className="bg-muted px-3 py-1 rounded-md text-xs text-center text-muted-foreground">
                              {message.message}
                              <div className="text-[10px] mt-0.5">
                                {format(message.timestamp, "MMM d, h:mm a")}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={`flex ${
                            message.senderId === selectedChat.buyer.id ? "justify-start" : "justify-end"
                          }`}>
                            <div className="flex gap-2 max-w-[80%]">
                              {message.senderId === selectedChat.buyer.id && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={selectedChat.buyer.avatar} />
                                  <AvatarFallback>{selectedChat.buyer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <div className={`px-3 py-2 rounded-lg ${
                                  message.senderId === selectedChat.buyer.id 
                                    ? "bg-muted" 
                                    : "bg-primary text-primary-foreground"
                                }`}>
                                  {message.message}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <span>{message.sender}</span>
                                  <span>•</span>
                                  <span>{format(message.timestamp, "h:mm a")}</span>
                                </div>
                              </div>
                              {message.senderId === selectedChat.seller.id && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={selectedChat.seller.avatar} />
                                  <AvatarFallback>{selectedChat.seller.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Admin input disabled */}
                <CardContent className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Admin messaging disabled in this version" 
                      disabled={true}
                    />
                    <Button disabled={true}>Send</Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Admins can only view conversations in this version. Messaging capability coming soon.
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-muted-foreground">
                <User className="h-16 w-16 mb-4 opacity-20" />
                <h3 className="text-xl font-medium mb-2">No Chat Selected</h3>
                <p className="text-center">
                  Select a chat from the list to view the conversation between users
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
