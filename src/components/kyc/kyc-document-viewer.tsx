
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "lucide-react";
import { KycDocument } from "@/types/kyc-types";

interface KycDocumentViewerProps {
  documents: KycDocument[];
}

export default function KycDocumentViewer({ documents }: KycDocumentViewerProps) {
  const [activeDocumentId, setActiveDocumentId] = useState<string>(documents[0]?.id || "");
  
  if (documents.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-md">
        <p className="text-muted-foreground">No documents uploaded</p>
      </div>
    );
  }

  const activeDocument = documents.find(doc => doc.id === activeDocumentId) || documents[0];

  return (
    <div className="space-y-4">
      <Tabs value={activeDocumentId} onValueChange={setActiveDocumentId} className="w-full">
        <TabsList className="flex overflow-x-auto">
          {documents.map((doc) => (
            <TabsTrigger key={doc.id} value={doc.id} className="flex items-center min-w-max">
              <Camera className="mr-2 h-4 w-4" />
              {doc.type}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeDocumentId} className="pt-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={activeDocument.imageUrl}
                  alt={activeDocument.type}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium">{activeDocument.type}</h4>
                <p className="text-sm text-muted-foreground">{activeDocument.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
