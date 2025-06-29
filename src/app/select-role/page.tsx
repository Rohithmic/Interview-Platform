"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Code2, Users, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function SelectRolePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const setUserRole = useMutation(api.users.setUserRole);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    
    // Check if user already has a role set
    const currentRole = user.unsafeMetadata?.role || user.publicMetadata?.role;
    
    if (currentRole === "candidate" || currentRole === "interviewer") {
      // User already has a role, redirect to dashboard immediately
      router.replace("/dashboard");
      return;
    }
    
    // User doesn't have a role, allow access to select-role page
    setIsCheckingRole(false);
  }, [isLoaded, isSignedIn, user, router]);

  // Additional protection: if somehow we get here with a role, redirect immediately
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const currentRole = user.unsafeMetadata?.role || user.publicMetadata?.role;
      if (currentRole === "candidate" || currentRole === "interviewer") {
        router.replace("/dashboard");
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleSelectRole = async (role: "candidate" | "interviewer") => {
    if (!user) return;
    setIsProcessing(true);
    try {
      // Update in Convex DB
      await setUserRole({ clerkId: user.id, role });
      // Update Clerk metadata
      await user.update({ unsafeMetadata: { role } });
      // Redirect to dashboard
      router.replace("/dashboard");
    } catch (err) {
      console.error("Failed to set role:", err);
      alert("Failed to set role. Please try again.");
      setIsProcessing(false);
    }
  };

  // Show loading spinner while checking role
  if (!isLoaded || !isSignedIn || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Setting your role...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-card border rounded-xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Your Role</h1>
        <p className="text-muted-foreground mb-4 text-center">
          Please choose your role to continue. This helps us personalize your experience.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 w-full">
          <p className="text-amber-800 text-sm text-center">
            ⚠️ <strong>Important:</strong> This is a one-time decision. Your role cannot be changed after selection.
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 text-lg py-6"
            onClick={() => handleSelectRole("candidate")}
            disabled={isProcessing}
          >
            <Users className="h-6 w-6" />
            I'm a Candidate
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 text-lg py-6"
            onClick={() => handleSelectRole("interviewer")}
            disabled={isProcessing}
          >
            <Code2 className="h-6 w-6" />
            I'm an Interviewer
          </Button>
        </div>
      </div>
    </div>
  );
} 