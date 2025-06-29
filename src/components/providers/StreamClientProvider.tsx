"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { streamTokenProvider } from "@/actions/stream.actions";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Check if Stream API key is available
    if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
      console.warn("Stream API key not found, video features will be disabled");
      return;
    }

    try {
      const client = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
        user: {
          id: user?.id,
          name: user?.firstName || "" + " " + user?.lastName || "" || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider: streamTokenProvider,
      });

      setStreamVideoClient(client);
    } catch (err) {
      console.error("Failed to initialize Stream client:", err);
      setError("Failed to initialize video client");
    }
  }, [user, isLoaded]);

  // If there's an error or no Stream client, render children without Stream wrapper
  if (error || !streamVideoClient) {
    return <>{children}</>;
  }

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
