"use client";
import { SignUp } from "@clerk/nextjs";
import { Code2 } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SetClerkRoleOnSignUp from "@/components/SetClerkRoleOnSignUp";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "candidate" || role === "interviewer") {
      localStorage.setItem("selectedRole", role);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4 sm:p-8 md:p-12">
      <SetClerkRoleOnSignUp />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.07)_1px,transparent_0)] bg-[length:20px_20px]" />
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CodeVu
            </h1>
          </div>
          <p className="text-muted-foreground">
            Create your account to get started
          </p>
        </div>
        {/* Sign Up Form */}
        <div className="bg-card border rounded-xl shadow-xl p-0 flex flex-col overflow-hidden w-full max-w-md mx-auto">
          <SignUp
            appearance={{
              variables: {
                colorPrimary: "#10b981", // emerald-500
                colorText: "#fff",
                colorBackground: "#18181b", // zinc-900
                colorInputBackground: "#27272a", // zinc-800
                colorInputText: "#fff",
                colorDanger: "#ef4444",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                fontFamily: "inherit",
              },
              elements: {
                formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg",
                card: "shadow-none border-0 p-6 bg-transparent w-full max-w-md mx-auto flex flex-col overflow-hidden",
                rootBox: "w-full max-w-md mx-auto flex flex-col overflow-hidden",
                headerTitle: "text-2xl font-bold text-foreground text-center mb-2",
                headerSubtitle: "text-muted-foreground text-center mb-6",
                socialButtonsBlockButton: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-colors",
                socialButtonsBlockButtonText: "text-foreground",
                formFieldLabel: "text-foreground font-medium",
                formFieldInput: "bg-background border border-input text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors",
                formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
                footerActionLink: "text-primary hover:text-primary/80 transition-colors",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground bg-card px-4",
                formResendCodeLink: "text-primary hover:text-primary/80 transition-colors",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-primary hover:text-primary/80 transition-colors",
                formFieldAction: "text-primary hover:text-primary/80 transition-colors",
                footerAction: "text-muted-foreground",
                formHeaderTitle: "text-foreground",
                formHeaderSubtitle: "text-muted-foreground",
                formFieldErrorText: "text-destructive text-sm",
                alertText: "text-foreground",
                alert: "bg-destructive/10 border border-destructive/20 text-destructive",
                verificationCodeFieldInput: "bg-background border border-input text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors",
                formFieldRow: "gap-4",
                formField: "mb-4",
                formFieldLabelRow: "mb-2",
                formFieldInputRow: "relative",
                formFieldHintText: "text-muted-foreground text-sm",
                formFieldSuccessText: "text-green-600 text-sm",
                formFieldWarningText: "text-yellow-600 text-sm",
                formFieldSuccessIcon: "text-green-600",
                formFieldWarningIcon: "text-yellow-600",
                formFieldErrorIcon: "text-destructive",
                formFieldSuccessIconContainer: "bg-green-50 border-green-200",
                formFieldWarningIconContainer: "bg-yellow-50 border-yellow-200",
                formFieldErrorIconContainer: "bg-red-50 border-red-200",
              },
            }}
          />
        </div>
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/sign-in" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 