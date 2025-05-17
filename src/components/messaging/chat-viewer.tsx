
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Flag, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  type: "text" | "event";
  content: string;
  timestamp: Date;
  status: string;
}

interface ChatThread {
  id: string;
  orderId: string;
  buyer: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  seller: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  amount: number;
  currency: string;
  fiatAmount: number;
  fiatCurrency: string;
  status: string;
  messages: Message[];
}

interface ChatViewerProps {
  thread: ChatThread | null;
}

export default function ChatViewer({ thread }: ChatViewerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [thread?.messages]);
  
  if (!thread) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center text-muted-foreground">
          <p>Select a chat to view messages</p>
        </div>
      </div>
    );
  }
  
  // Format status for display
  const formatStatus = (status: string) => {
    return status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  };
  
  // Get background color based on message sender
  const getMessageStyle = (senderId: string) => {
    if (senderId === "system") {
      return "bg-muted/50 text-center mx-auto max-w-[85%]";
    } else if (senderId === thread.buyer.id) {
      return "bg-primary/10 ml-auto";
    } else {
      return "bg-secondary mr-auto";
    }
  };
  
  // Get initial for avatar
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  // Flag the chat (not implemented)
  const handleFlagChat = () => {
    console.log("Chat flagged for review");
    // Implementation would go here
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat header with transaction details */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Order {thread.orderId}</h3>
            <p className="text-sm text-muted-foreground">
              {thread.amount} {thread.currency} (≈ {thread.fiatCurrency} {thread.fiatAmount.toLocaleString()})
            </p>
          </div>
          
          <Badge variant={
            thread.status === "completed" ? "outline" :
            thread.status === "dispute" ? "destructive" : "default"
          }>
            {formatStatus(thread.status)}
          </Badge>
        </div>
      </div>
      
      {/* User details panel */}
      <Card className="mx-4 my-2 p-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Buyer</p>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{getInitial(thread.buyer.name)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{thread.buyer.name}</span>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground">Seller</p>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{getInitial(thread.seller.name)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{thread.seller.name}</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {thread.messages.map(message => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-[70%] ${getMessageStyle(message.senderId)}`}
            >
              {message.type === "text" ? (
                <>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <span>{message.senderId === thread.buyer.id ? "Buyer" : "Seller"}: {message.senderName}</span>
                  </div>
                  <p>{message.content}</p>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">{message.content}</p>
              )}
              <div className="text-right text-xs text-muted-foreground mt-1">
                {format(message.timestamp, "HH:mm")}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Admin actions */}
      <div className="border-t p-3 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleFlagChat}>
          <Flag className="h-4 w-4 mr-1" />
          Flag this chat
        </Button>
        
        {thread.status === "dispute" && (
          <Button variant="destructive" size="sm">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Review dispute
          </Button>
        )}
      </div>
    </div>
  );
}
