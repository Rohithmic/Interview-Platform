import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
    const { user, isLoaded } = useUser();

    const userData = useQuery(api.users.getUserByClerkId, {
        clerkId: user?.id || "",
    });

    // Only show loading if Clerk is still loading or if we have a user but Convex data is undefined
    const isLoading = !isLoaded || (user && userData === undefined);

    return {
        isLoading,
        isInterviewer: userData?.role === "interviewer",
        isCandidate: userData?.role === "candidate",
    };
};