
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

// Template types
type EmailTemplateType = 'registration' | 'login_alert' | 'password_change' | 'p2p_transaction' | 'deposit_alert' | 'withdrawal_alert';

interface EmailTemplate {
  id: string;
  type: EmailTemplateType;
  name: string;
  subject: string;
  html: string;
  lastUpdated: string;
  variables: string[];
}

// Mock data for email templates
const mockEmailTemplates: EmailTemplate[] = [
  {
    id: "template_1",
    type: "registration",
    name: "New User Registration",
    subject: "Welcome to KOB HAWALA!",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Welcome</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Welcome to KOB HAWALA!</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>Your account has been successfully created. We're excited to have you on board!</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Registered On:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
      </div>
      <p>Get started by securing your account:</p>
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      <div class="security-tip">
        <strong>Security Tip:</strong> Enable Two-Factor Authentication (2FA) to protect your account.
      </div>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For security tips and to manage your email preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,
    lastUpdated: "2025-05-15T14:33:29Z",
    variables: ["username", "timestamp", "ip", "location", "secureAccountUrl", "currentYear"]
  },
  {
    id: "template_2",
    type: "login_alert",
    name: "Login Notification",
    subject: "Did You Login From a New Device or Location?",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Security Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Did You Login From a New Device or Location?</h1>
      <p>We noticed your KOB HAWALA account <strong>{{username}}</strong> was accessed from a new IP address.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">When:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Device:</div>
          <div class="info-value">{{device}}</div>
        </div>
      </div>
      
      <p>If this was you, no further action is required.</p>
      
      <div class="security-tip">
        <strong>Security Tip:</strong> Enable Two-Factor Authentication (2FA) for additional account security.
      </div>
      
      <p>Don't recognize this activity? Please secure your account immediately:</p>
      
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      
      <p>Or follow these steps manually:</p>
      <ol style="margin-left: 20px; margin-bottom: 20px;">
        <li>Change your password immediately</li>
        <li>Enable Two-Factor Authentication (2FA)</li>
        <li>Review your recent account activity</li>
        <li>Contact customer support if needed</li>
      </ol>
      
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For security tips and to manage your email preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,
    lastUpdated: "2025-05-15T15:30:10Z",
    variables: ["username", "timestamp", "ip", "location", "device", "secureAccountUrl", "currentYear"]
  },
  {
    id: "template_3",
    type: "password_change",
    name: "Password Change Notification",
    subject: "Your Password Has Been Changed",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Security Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Your Password Has Been Changed</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>We wanted to let you know that your KOB HAWALA account password was successfully changed.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">When:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
      </div>
      <p>If this was you, no further action is required.</p>
      <div class="security-tip">
        <strong>Security Tip:</strong> Keep your password secure and enable Two-Factor Authentication (2FA) for added protection.
      </div>
      <p>If you didn't initiate this change, please secure your account immediately:</p>
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For security tips and to manage your email preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,
    lastUpdated: "2025-05-15T16:45:22Z",
    variables: ["username", "timestamp", "ip", "location", "secureAccountUrl", "currentYear"]
  },
  {
    id: "template_4",
    type: "p2p_transaction",
    name: "P2P Transaction Alert",
    subject: "P2P Transaction Update",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Transaction Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 120px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>{{transactionStatus}} P2P Transaction</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>Your P2P transaction has been {{transactionAction}}.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Transaction ID:</div>
          <div class="info-value">{{transactionId}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Amount:</div>
          <div class="info-value">{{amount}} {{currency}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Status:</div>
          <div class="info-value">{{transactionStatus}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Timestamp:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Counterparty:</div>
          <div class="info-value">{{counterparty}}</div>
        </div>
      </div>
      
      <a href="{{transactionDetailsUrl}}" class="btn">View Transaction Details</a>
      
      <div class="security-tip">
        <strong>Security Tip:</strong> Never share your transaction details with unknown parties.
      </div>
      
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For transaction history and to manage your notification preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,
    lastUpdated: "2025-05-16T10:15:45Z",
    variables: ["username", "transactionStatus", "transactionAction", "transactionId", "amount", "currency", "timestamp", "counterparty", "transactionDetailsUrl", "currentYear"]
  }
];

const AdminEmailTemplates: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<EmailTemplate> | null>(null);
  
  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };
  
  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate({...template});
    setIsEditOpen(true);
  };
  
  const handleSaveTemplate = () => {
    if (!editingTemplate || !editingTemplate.id) return;
    
    setTemplates(prev => prev.map(t => 
      t.id === editingTemplate.id 
        ? {...t, ...editingTemplate, lastUpdated: new Date().toISOString()} 
        : t
    ));
    
    setIsEditOpen(false);
    toast({
      title: "Template Updated",
      description: "Email template has been successfully updated.",
    });
  };
  
  const handleTestEmail = (templateId: string) => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to your address.",
    });
  };

  // Use Dialog on desktop, Drawer on mobile
  const PreviewComponent = isMobile ? Drawer : Dialog;
  const PreviewContent = isMobile ? DrawerContent : DialogContent;
  const PreviewHeader = isMobile ? DrawerHeader : DialogHeader;
  const PreviewTitle = isMobile ? DrawerTitle : DialogTitle;
  const PreviewDescription = isMobile ? DrawerDescription : DialogDescription;
  const PreviewFooter = isMobile ? DrawerFooter : DialogFooter;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Email Templates</h3>
        <Button variant="outline">Add New Template</Button>
      </div>
      
      <Alert>
        <AlertDescription>
          Email templates use variables enclosed in double curly braces <code>&#123;&#123;variableName&#125;&#125;</code> that will be replaced with actual data when emails are sent.
        </AlertDescription>
      </Alert>
      
      <Accordion type="single" collapsible className="w-full">
        {templates.map((template) => (
          <AccordionItem key={template.id} value={template.id}>
            <AccordionTrigger className="hover:bg-muted/50 px-4">
              <div className="flex flex-col items-start text-left">
                <div className="font-medium">{template.name}</div>
                <div className="text-sm text-muted-foreground">{template.subject}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {template.variables.map(variable => (
                    <Badge key={variable} variant="secondary">&#123;&#123;{variable}&#125;&#125;</Badge>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date(template.lastUpdated).toLocaleString()}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(template)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTestEmail(template.id)}>
                    Send Test
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {/* Template Preview */}
      <PreviewComponent open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <PreviewContent className="sm:max-w-[700px] max-h-[90vh]">
          <PreviewHeader>
            <PreviewTitle>{selectedTemplate?.name}</PreviewTitle>
            <PreviewDescription>
              Subject: {selectedTemplate?.subject}
            </PreviewDescription>
          </PreviewHeader>
          
          <div className="mt-4 border rounded-md overflow-hidden max-h-[60vh] overflow-y-auto">
            {selectedTemplate && (
              <iframe
                title="Email Template Preview"
                srcDoc={selectedTemplate.html}
                style={{ width: '100%', height: '600px', border: 'none' }}
              />
            )}
          </div>
          
          <PreviewFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
          </PreviewFooter>
        </PreviewContent>
      </PreviewComponent>
      
      {/* Template Editor */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Template: {editingTemplate?.name}</DialogTitle>
            <DialogDescription>
              Make changes to the email template. Use variables in the format &#123;&#123;variableName&#125;&#125;.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
            <div>
              <label className="text-sm font-medium">Template Name</label>
              <Input 
                value={editingTemplate?.name || ''} 
                onChange={(e) => setEditingTemplate(prev => ({ ...prev!, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email Subject</label>
              <Input 
                value={editingTemplate?.subject || ''} 
                onChange={(e) => setEditingTemplate(prev => ({ ...prev!, subject: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">HTML Content</label>
              <Textarea 
                className="h-80 font-mono text-xs"
                value={editingTemplate?.html || ''}
                onChange={(e) => setEditingTemplate(prev => ({ ...prev!, html: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Template Variables (comma separated)</label>
              <Input 
                value={editingTemplate?.variables.join(', ') || ''}
                onChange={(e) => setEditingTemplate(prev => ({ 
                  ...prev!, 
                  variables: e.target.value.split(',').map(v => v.trim()).filter(Boolean)
                }))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmailTemplates;
