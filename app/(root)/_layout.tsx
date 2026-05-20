import { useUserSync } from "@/hooks/useUserSync";
import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth()

    useUserSync();

    if (!isLoaded) return null
    if (!isSignedIn) return <Redirect href="/sign-in" />

    return <Slot />
}