import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get("clerkId");
    const email = searchParams.get("email");

    if (!clerkId && !email) {
      return NextResponse.json({ error: "Missing clerkId or email parameter" }, { status: 400 });
    }

    let user = null;

    if (clerkId) {
      user = await convex.query(api.users.getUserByClerkId, { clerkId });
    } else if (email) {
      user = await convex.query(api.users.getUserByEmail, { email });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error checking user role:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 