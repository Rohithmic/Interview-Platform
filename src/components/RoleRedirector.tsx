"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RoleRedirector() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    
    // Check unsafeMetadata first, then publicMetadata as fallback
    const role = user.unsafeMetadata?.role || user.publicMetadata?.role;
    
    // If user is on select-role page but already has a role, redirect to dashboard
    if (pathname === "/select-role" && (role === "candidate" || role === "interviewer")) {
      router.replace("/dashboard");
      return;
    }
    
    // If user doesn't have a role and is not on select-role page, redirect to select-role
    if (
      (!role || (role !== "candidate" && role !== "interviewer")) &&
      pathname !== "/select-role"
    ) {
      router.replace("/select-role");
    }
  }, [user, isSignedIn, isLoaded, router, pathname]);
  
  return null;
} 