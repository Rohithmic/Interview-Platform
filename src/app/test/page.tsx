"use client";

import { useUser } from "@clerk/nextjs";

export default function TestPage() {
  const { user, isLoaded } = useUser();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Clerk isLoaded:</strong> {isLoaded ? "true" : "false"}
        </div>
        
        <div>
          <strong>User:</strong> {user ? "Logged in" : "Not logged in"}
        </div>
        
        {user && (
          <div>
            <strong>User ID:</strong> {user.id}
          </div>
        )}
        
        <div className="mt-8">
          <a href="/" className="text-blue-500 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 