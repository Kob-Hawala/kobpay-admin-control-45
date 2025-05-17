
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface EmailTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    name: string;
    subject: string;
    html: string;
    variables: string[];
  } | null;
  onSave: (template: any) => void;
}

export function EmailTemplateEditor({
  isOpen,
  onClose,
  template,
  onSave,
}: EmailTemplateEditorProps) {
  const [editedTemplate, setEditedTemplate] = useState<any>(template);
  const [newVariable, setNewVariable] = useState("");

  // Reset form when template changes
  React.useEffect(() => {
    setEditedTemplate(template);
  }, [template]);

  if (!template) {
    return null;
  }

  const handleChange = (field: string, value: string) => {
    setEditedTemplate({
      ...editedTemplate,
      [field]: value,
    });
  };

  const handleAddVariable = () => {
    if (!newVariable.trim()) return;
    
    // Check if variable already exists
    if (!editedTemplate.variables.includes(newVariable.trim())) {
      setEditedTemplate({
        ...editedTemplate,
        variables: [...editedTemplate.variables, newVariable.trim()],
      });
    }
    setNewVariable("");
  };

  const handleRemoveVariable = (variable: string) => {
    setEditedTemplate({
      ...editedTemplate,
      variables: editedTemplate.variables.filter((v: string) => v !== variable),
    });
  };

  const handleSaveTemplate = () => {
    onSave(editedTemplate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Template: {template.name}</DialogTitle>
          <DialogDescription>
            Make changes to the email template. Use variables in the format &#123;&#123;variableName&#125;&#125;.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
          <div>
            <label className="text-sm font-medium">Template Name</label>
            <Input 
              value={editedTemplate?.name || ''} 
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Email Subject</label>
            <Input 
              value={editedTemplate?.subject || ''} 
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">HTML Content</label>
            <Textarea 
              className="h-80 font-mono text-xs"
              value={editedTemplate?.html || ''}
              onChange={(e) => handleChange("html", e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Template Variables</label>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {editedTemplate?.variables?.map((variable: string) => (
                <Badge key={variable} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  &#123;&#123;{variable}&#125;&#125;
                  <button 
                    type="button" 
                    onClick={() => handleRemoveVariable(variable)}
                    className="ml-1 hover:bg-muted rounded-full"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Add variable name"
                value={newVariable} 
                onChange={(e) => setNewVariable(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddVariable()}
              />
              <Button type="button" onClick={handleAddVariable} variant="outline">
                Add
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveTemplate}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
