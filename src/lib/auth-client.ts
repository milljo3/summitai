import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://summitai-seven.vercel.app"
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    sendVerificationEmail,
} = authClient;