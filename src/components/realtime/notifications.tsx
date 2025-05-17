
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, AlertCircle, Check, X, Bell, DollarSign, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock real-time notification events for demonstration
const mockNotificationEvents = [
  {
    id: 'deposit_received',
    type: 'deposit',
    title: 'New Deposit Received',
    description: '0.25 BTC has been deposited to your wallet',
    status: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2p_escrow_ready',
    type: 'p2p',
    title: 'P2P Escrow Ready for Release',
    description: 'Transaction #4582 is ready to be released',
    status: 'info',
    createdAt: new Date().toISOString()
  },
  {
    id: 'transaction_failed',
    type: 'transaction',
    title: 'Failed Transaction Alert',
    description: 'Transaction #9876 has failed due to network issues',
    status: 'error',
    createdAt: new Date().toISOString()
  },
  {
    id: 'liquidity_warning',
    type: 'liquidity',
    title: 'Liquidity Below Threshold',
    description: 'BTC/USDT pair liquidity is below the set threshold',
    status: 'warning',
    createdAt: new Date().toISOString()
  },
  {
    id: 'suspicious_activity',
    type: 'security',
    title: 'Suspicious Activity Detected',
    description: 'Multiple login attempts detected from unusual location',
    status: 'error',
    createdAt: new Date().toISOString()
  }
];

// Mock notification sound effects
const NOTIFICATION_SOUNDS = {
  default: new Audio('/notification.mp3'),
  success: new Audio('/success.mp3'),
  error: new Audio('/error.mp3'),
  warning: new Audio('/warning.mp3'),
  info: new Audio('/info.mp3')
};

type NotificationType = 'default' | 'success' | 'error' | 'warning' | 'info';

// Play notification sound function
const playNotificationSound = (type: NotificationType = 'default') => {
  // In a real implementation, this would play actual sounds
  console.log(`Playing ${type} notification sound`);
};

// Status icons for notifications
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'success':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'error':
      return <X className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'info':
      return <Info className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

// Type icon for notifications
const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'deposit':
      return <DollarSign className="h-4 w-4" />;
    case 'p2p':
      return <Bell className="h-4 w-4" />;
    case 'transaction':
      return <AlertCircle className="h-4 w-4" />;
    case 'liquidity':
      return <AlertTriangle className="h-4 w-4" />;
    case 'security':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

// This component handles real-time notifications
const RealtimeNotifications = () => {
  const { toast: showToastUI } = useToast();

  // Mock connection to notification service
  useEffect(() => {
    console.log("Connecting to notification service...");
    
    // Mock real-time events for demonstration
    const intervalId = setInterval(() => {
      const randomEvent = mockNotificationEvents[Math.floor(Math.random() * mockNotificationEvents.length)];
      handleNotificationReceived(randomEvent);
    }, 45000); // Trigger a random event every 45 seconds
    
    // Simulate initial connection event
    setTimeout(() => {
      showToastUI({
        title: "Connected to notification service",
        description: "You'll receive alerts for important events",
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
      console.log("Disconnected from notification service");
    };
  }, [showToastUI]);

  const handleNotificationReceived = (event: any) => {
    // Log the event
    console.log('Notification received:', event);
    
    // Play notification sound based on status
    playNotificationSound(event.status as NotificationType);

    // Show toast notification using sonner
    switch (event.type) {
      case 'deposit':
        toast(event.title, {
          description: event.description,
          icon: <StatusIcon status={event.status} />,
        });
        break;
        
      case 'p2p':
        toast(event.title, {
          description: event.description,
          icon: <StatusIcon status={event.status} />,
          action: {
            label: "View Details",
            onClick: () => console.log("View P2P transaction details")
          }
        });
        break;
        
      case 'transaction':
        toast.error(event.title, {
          description: event.description,
          icon: <StatusIcon status={event.status} />,
          action: {
            label: "Retry",
            onClick: () => console.log("Retry failed transaction")
          }
        });
        break;
        
      case 'liquidity':
        toast.warning(event.title, {
          description: event.description,
          icon: <StatusIcon status={event.status} />,
          action: {
            label: "Take Action",
            onClick: () => console.log("Handle liquidity issue")
          }
        });
        break;
        
      case 'security':
        toast.error(event.title, {
          description: event.description,
          icon: <StatusIcon status={event.status} />,
          action: {
            label: "Investigate",
            onClick: () => console.log("Investigate suspicious activity")
          }
        });
        break;
        
      default:
        toast(event.title, {
          description: event.description,
          icon: <StatusIcon status={event.status} />
        });
    }
    
    // For critical events, also show a UI toast that stays longer
    if (event.status === 'error' || event.status === 'warning') {
      showToastUI({
        title: event.title,
        description: event.description,
        variant: event.status === 'error' ? 'destructive' : 'default',
      });
    }
  };

  // This is a non-visible component that just handles the notifications
  return null;
};

export default RealtimeNotifications;
