
import { useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { Separator } from "@/components/ui/separator";
import { mockChatThreads } from "@/components/messaging/mock-messaging-data";
import ChatThreadList from "@/components/messaging/chat-thread-list";
import ChatViewer from "@/components/messaging/chat-viewer";

export default function MessagingPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  
  // Find the selected thread
  const selectedThread = selectedThreadId
    ? mockChatThreads.find(thread => thread.id === selectedThreadId)
    : null;
  
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">P2P Transaction Chats</h1>
          <p className="text-muted-foreground">
            Monitor and manage communications between buyers and sellers
          </p>
        </div>
        
        <div className="border rounded-md h-[calc(100vh-220px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Thread list (left panel) */}
            <div className="md:col-span-1 border-r h-full">
              <ChatThreadList 
                threads={mockChatThreads}
                selectedThreadId={selectedThreadId}
                onSelectThread={setSelectedThreadId}
              />
            </div>
            
            {/* Chat viewer (right panel) */}
            <div className="md:col-span-2 h-full">
              <ChatViewer thread={selectedThread} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
