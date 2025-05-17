
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  user: AdminUser | null;
  currentEmail: string | null;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin-token");
      const storedUser = localStorage.getItem("admin-user");
      
      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("admin-token");
          localStorage.removeItem("admin-user");
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === "admin@kobpay.com" && password === "password") {
        // Store email for OTP verification
        setCurrentEmail(email);
        toast.success("OTP has been sent to your email");
        setIsLoading(false);
        navigate("/admin/verify-otp");
        return true;
      } else {
        toast.error("Invalid credentials");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock OTP validation - in a real app, this would verify against backend
      if (otp === "123456" && currentEmail) {
        // Create mock user
        const mockUser: AdminUser = {
          id: "admin-1",
          email: currentEmail,
          name: "Admin User",
          role: "Admin",
          avatarUrl: "",
        };
        
        const token = "mock-jwt-token-" + Date.now();
        
        // Store token and user in localStorage
        localStorage.setItem("admin-token", token);
        localStorage.setItem("admin-user", JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        toast.success("Login successful");
        navigate("/admin/dashboard");
        return true;
      } else {
        toast.error("Invalid OTP");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Verification failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin-token");
    localStorage.removeItem("admin-user");
    setUser(null);
    setIsAuthenticated(false);
    setCurrentEmail(null);
    toast.info("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, verifyOtp, logout, user, currentEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
