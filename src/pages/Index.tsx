
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, User, Database, Settings } from "lucide-react"; 
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
            K
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">KOB Hawala Admin Panel</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive cryptocurrency management solution with KYC, transactions, 
            and platform control in one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/admin/login">
            <Button size="lg" className="gap-2">
              <Lock className="h-4 w-4" />
              <span>Admin Login</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <User className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">User Management</h3>
            <p className="text-muted-foreground">
              KYC approvals, wallet monitoring, and transaction limits for all users.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Vault Control</h3>
            <p className="text-muted-foreground">
              Manage hot and cold wallets with secure transfer controls and balance monitoring.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Settings className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Platform Settings</h3>
            <p className="text-muted-foreground">
              Configure exchange rates, fees, news feeds, and API integrations.
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Demo credentials:</p>
          <p>Email: admin@kobpay.com | Password: password | OTP: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
