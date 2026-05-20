import { useUserStore } from "@/store/userStore"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs"
import { Platform } from "react-native"


const IOSTabs = () => {
    const isAdmin = useUserStore(state => state.isAdmin)
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf="house.fill" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="search">
                <Icon sf="magnifyingglass" />
                <Label>Search</Label>
            </NativeTabs.Trigger>
            {isAdmin && <NativeTabs.Trigger name="create">
                <Icon sf="plus.circle.fill" />
                <Label>Add Property</Label>
            </NativeTabs.Trigger>}
            <NativeTabs.Trigger name="save">
                <Icon sf="heart" />
                <Label>Save</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Icon sf="person.fill" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}
const AndroidTab = () => {
    const isAdmin = useUserStore((state) => state.isAdmin);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#000",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />

            {isAdmin && (
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Add Property",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle" size={size} color={color} />
                        ),
                    }}
                />
            )}

            <Tabs.Screen
                name="save"
                options={{
                    title: "Save",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};
// 
export default function TabLayout() {
    return Platform.OS === "ios" ? <IOSTabs /> : <AndroidTab />
}