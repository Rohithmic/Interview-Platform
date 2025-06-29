"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserRoleHandler() {
  const { user, isLoaded } = useUser();
  const syncUser = useMutation(api.users.syncUser);
  const setUserRole = useMutation(api.users.setUserRole);
  const existingUser = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoaded || !user) return;

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

    const handleUserSync = async () => {
      // If user already exists in our database, no need to sync
      if (existingUser !== undefined && existingUser !== null) {
        return;
      }

      setIsProcessing(true);
      try {
        // Sync user without role (role will be handled separately)
        await syncUser({
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          clerkId: user.id,
          image: user.imageUrl,
        });
        
        // Set role separately if we have one
        if (selectedRole) {
          await setUserRole({
            clerkId: user.id,
            role: selectedRole,
          });
        }
        
        // Clear the selected role from localStorage
        localStorage.removeItem("selectedRole");
      } catch (error: any) {
        console.error("Error syncing user:", error);
        // If the error is about duplicate roles, show a user-friendly message
        if (error.message?.includes("already registered")) {
          alert(error.message);
          localStorage.removeItem("selectedRole");
          router.push("/landing");
          return;
        }
        alert("There was an error setting up your account. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    };

    handleUserSync();
  }, [user, isLoaded, existingUser, syncUser, setUserRole, router, searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return null;
} 