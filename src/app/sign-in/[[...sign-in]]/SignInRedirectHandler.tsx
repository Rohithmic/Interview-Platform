"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignInRedirectHandler() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    
    // Check unsafeMetadata first, then publicMetadata as fallback
    const currentRole = user.unsafeMetadata?.role || user.publicMetadata?.role;
    
    if (currentRole === "candidate" || currentRole === "interviewer") {
      // User has a role, redirect to dashboard
      setIsProcessing(true);
      router.replace("/dashboard");
    } else if (!currentRole) {
      // User doesn't have a role, redirect to select-role page
      setIsProcessing(true);
      router.replace("/select-role");
    }
  }, [user, isSignedIn, isLoaded, router]);

  // Show spinner during processing
  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Signing you in...</p>
        </div>
      </div>
    );
  }

  return null;
} 