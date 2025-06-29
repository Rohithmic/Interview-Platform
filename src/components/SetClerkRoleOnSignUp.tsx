"use client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function SetClerkRoleOnSignUp() {
  const { user, isSignedIn, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    
    const currentRole = user.unsafeMetadata?.role || user.publicMetadata?.role;
    if (currentRole === "candidate" || currentRole === "interviewer") {
      // User already has a role, redirect to dashboard
      router.replace("/dashboard");
      return;
    }

    // Check if this is a new sign-up (no role set yet)
    if (!currentRole) {
      setIsProcessing(true);
      
      // Prefer role from query param, fallback to localStorage
      let selectedRole: "candidate" | "interviewer" | null = null;
      const roleFromQuery = searchParams.get("role");
      if (roleFromQuery === "candidate" || roleFromQuery === "interviewer") {
        selectedRole = roleFromQuery;
      } else {
        const roleFromStorage = localStorage.getItem("selectedRole");
        if (roleFromStorage === "candidate" || roleFromStorage === "interviewer") {
          selectedRole = roleFromStorage;
        }
      }

      if (selectedRole) {
        // Set the role in Clerk publicMetadata
        user.update({ unsafeMetadata: { role: selectedRole } })
          .then(() => {
            localStorage.removeItem("selectedRole");
            router.replace("/dashboard");
          })
          .catch((error) => {
            console.error("Failed to set role:", error);
            // If setting role fails, redirect to select-role page
            router.replace("/select-role");
          })
          .finally(() => {
            setIsProcessing(false);
          });
      } else {
        // No role selected, redirect to select-role page
        router.replace("/select-role");
        setIsProcessing(false);
      }
    }
  }, [user, isSignedIn, isLoaded, searchParams, router]);

  // Show spinner during processing
  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return null;
} 