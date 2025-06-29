import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Clerk } from "@clerk/clerk-sdk-node";

// Initialize Clerk with secret key
const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) {
      // If user already has a role, don't change it
      if (existingUser.role === "candidate" || existingUser.role === "interviewer") {
        // Only update non-role fields
        return await ctx.db.patch(existingUser._id, {
          name: args.name,
          email: args.email,
          image: args.image,
        });
      }
      
      // If user doesn't have a role, fetch from Clerk
      let role: "candidate" | "interviewer" = "candidate";
      try {
        const clerkUser = await clerk.users.getUser(args.clerkId);
        if (
          clerkUser.unsafeMetadata &&
          (clerkUser.unsafeMetadata.role === "candidate" || clerkUser.unsafeMetadata.role === "interviewer")
        ) {
          role = clerkUser.unsafeMetadata.role;
        } else if (
          clerkUser.publicMetadata &&
          (clerkUser.publicMetadata.role === "candidate" || clerkUser.publicMetadata.role === "interviewer")
        ) {
          role = clerkUser.publicMetadata.role;
        }
      } catch (e) {
        // fallback to candidate if Clerk API fails
        role = "candidate";
      }

      // Update existing user with role
      return await ctx.db.patch(existingUser._id, {
        role,
        name: args.name,
        email: args.email,
        image: args.image,
      });
    }

    // Fetch Clerk user and get role from unsafeMetadata, then publicMetadata
    let role: "candidate" | "interviewer" = "candidate";
    try {
      const clerkUser = await clerk.users.getUser(args.clerkId);
      if (
        clerkUser.unsafeMetadata &&
        (clerkUser.unsafeMetadata.role === "candidate" || clerkUser.unsafeMetadata.role === "interviewer")
      ) {
        role = clerkUser.unsafeMetadata.role;
      } else if (
        clerkUser.publicMetadata &&
        (clerkUser.publicMetadata.role === "candidate" || clerkUser.publicMetadata.role === "interviewer")
      ) {
        role = clerkUser.publicMetadata.role;
      }
    } catch (e) {
      // fallback to candidate if Clerk API fails
      role = "candidate";
    }

    // Check if email is already used by another user with a different role
    const existingEmailUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingEmailUser && existingEmailUser.role !== role) {
      throw new Error(`This email is already registered as a ${existingEmailUser.role}. You cannot have multiple roles.`);
    }

    // Create new user
    return await ctx.db.insert("users", {
      ...args,
      role,
    });
  },
});

export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is not authenticated");

    const users = await ctx.db.query("users").collect();

    return users;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    // Don't query if clerkId is empty
    if (!args.clerkId) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    return user;
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    return user;
  },
});

export const setUserRole = mutation({
  args: {
    clerkId: v.string(),
    role: v.union(v.literal("candidate"), v.literal("interviewer")),
  },
  handler: async (ctx, args) => {
    // Get the current user from Clerk
    let currentRole: "candidate" | "interviewer" | null = null;
    try {
      const clerkUser = await clerk.users.getUser(args.clerkId);
      const unsafeRole = clerkUser.unsafeMetadata?.role;
      const publicRole = clerkUser.publicMetadata?.role;
      
      // Type-safe role checking
      if (unsafeRole === "candidate" || unsafeRole === "interviewer") {
        currentRole = unsafeRole;
      } else if (publicRole === "candidate" || publicRole === "interviewer") {
        currentRole = publicRole;
      }
    } catch (e) {
      // If we can't fetch from Clerk, check the database
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
        .first();
      
      if (existingUser) {
        currentRole = existingUser.role;
      }
    }

    // If user already has a role, prevent role change
    if (currentRole === "candidate" || currentRole === "interviewer") {
      throw new Error("Role cannot be changed once set. Please contact support if you need assistance.");
    }

    // Check if user exists in database
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    
    if (user) {
      // Update existing user's role
      await ctx.db.patch(user._id, { role: args.role });
      return { success: true };
    } else {
      // Create new user with role
      await ctx.db.insert("users", {
        clerkId: args.clerkId,
        role: args.role,
        name: "", // Will be updated by syncUser
        email: "", // Will be updated by syncUser
      });
      return { success: true };
    }
  },
});