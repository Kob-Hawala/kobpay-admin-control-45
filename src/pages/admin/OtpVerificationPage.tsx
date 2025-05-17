
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { checkIcon, arrowLeft } from "lucide-react";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpVerificationPage() {
  const { verifyOtp, currentEmail, isLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: OtpFormValues) {
    setError("");
    const success = await verifyOtp(data.otp);
    if (!success) {
      setError("Invalid OTP code");
    }
  }

  const goBack = () => {
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with theme toggle */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side (form) */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                K
              </div>
              <h2 className="mt-6 text-3xl font-bold">Verify OTP</h2>
              <p className="mt-2 text-muted-foreground">
                Enter the one-time password sent to
                <br />
                <span className="font-medium">{currentEmail || "your email"}</span>
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          className="text-center text-lg tracking-widest"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <checkIcon className="h-4 w-4" />
                        <span>Verify OTP</span>
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-2">
                      <arrowLeft className="h-4 w-4" />
                      <span>Back to Login</span>
                    </div>
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  <p>
                    For demo purposes, use OTP: <strong>123456</strong>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Right side (graphic) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-galaxy-blue to-galaxy-purple items-center justify-center">
          <div className="max-w-md p-6 text-white">
            <h2 className="text-3xl font-bold mb-6">Two-Factor Authentication</h2>
            <p className="text-lg mb-8">
              We've sent a one-time password to your email or phone. This adds an extra
              layer of security to protect your admin account.
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-medium text-xl mb-4">Why we use OTP?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                    1
                  </div>
                  <p className="opacity-90">Prevents unauthorized access even if your password is compromised</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                    2
                  </div>
                  <p className="opacity-90">Ensures only authorized personnel can access admin controls</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                    3
                  </div>
                  <p className="opacity-90">Maintains audit trail of every admin session for security compliance</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
