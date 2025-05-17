
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
  status: string;
  lastMessage: string;
  lastMessageTime: Date;
}

interface ChatThreadListProps {
  threads: ChatThread[];
  selectedThreadId: string | null;
  onSelectThread: (threadId: string) => void;
}

export default function ChatThreadList({
  threads,
  selectedThreadId,
  onSelectThread
}: ChatThreadListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter threads based on search term
  const filteredThreads = threads.filter(thread => {
    const searchLower = searchTerm.toLowerCase();
    return (
      thread.orderId.toLowerCase().includes(searchLower) ||
      thread.buyer.name.toLowerCase().includes(searchLower) ||
      thread.seller.name.toLowerCase().includes(searchLower) ||
      thread.lastMessage.toLowerCase().includes(searchLower)
    );
  });
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "dispute": return "destructive";
      case "in_progress": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search chats..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredThreads.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No chats found
          </div>
        ) : (
          <div className="divide-y">
            {filteredThreads.map(thread => (
              <Button
                key={thread.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-4 py-3 h-auto rounded-none",
                  selectedThreadId === thread.id && "bg-muted"
                )}
                onClick={() => onSelectThread(thread.id)}
              >
                <div className="flex flex-col w-full gap-1 text-left">
                  <div className="flex justify-between items-start w-full">
                    <div className="font-medium">
                      <span className="text-primary">Order {thread.orderId}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(thread.lastMessageTime, "HH:mm")}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center w-full">
                    <div className="text-sm">
                      {thread.buyer.name} <span className="text-muted-foreground">→</span> {thread.seller.name}
                    </div>
                    <Badge variant={getStatusBadgeVariant(thread.status)}>
                      {thread.status.replace("_", " ")}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground truncate">
                    {thread.lastMessage}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
