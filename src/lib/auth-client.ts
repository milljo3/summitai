import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_LOCAL || "https://summitai-seven.vercel.app"
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    sendVerificationEmail,
} = authClient;