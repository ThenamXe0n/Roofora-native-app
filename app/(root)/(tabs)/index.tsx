import FeaturedCard from "@/component/FeaturedCard"
import PropertyCard from "@/component/PropertyCard"
import { supabase } from "@/lib/supabase"
import { Property } from "@/types"
import { useUser } from "@clerk/expo"
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect, useRouter } from "expo-router"
import { useCallback, useState } from "react"
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function HomeScreen() {
    const { user } = useUser()
    const router = useRouter()

    const [featured, setFeatured] = useState<Property[]>([])
    const [recommended, setRecommended] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)


    console.log(featured)

    //fetch properties 
    const fetchProperties = async () => {
        try {
            let { data: featuredData } = await supabase.from("properties").select("*").eq("is_featured", true).order("created_at", { ascending: false })
            let { data: recommendedData } = await supabase.from("properties").select("*").eq("is_featured", false).order("created_at", { ascending: false })
            setFeatured(featuredData ?? [])
            setRecommended(recommendedData ?? [])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            setFeatured([])
            setRecommended([])
        }
    }

    useFocusEffect(useCallback(() => {
        fetchProperties()
    }, [])
    )

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                data={featured}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View>
                    {/* header  */}
                    <View className="flex-row items-center justify-between px-5">
                        <Image
                            source={require("../../../assets/images/Roofora.png")}
                            style={{ width: 90, height: 62 }}
                            resizeMode="contain"
                        />
                        <View className="items-end">
                            <Text>Good Evening sir </Text>
                            <Text className="text-lg font-bold text-gray-800">{user?.firstName}</Text>

                        </View>
                    </View>
                    {/* searchbar  */}
                    <TouchableOpacity
                        onPress={() => router.push("/(root)/(tabs)/search")}
                        className="mx-5 mb-4 mt-3 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.06,
                            shadowRadius: 6,
                            elevation: 2
                        }}
                    >
                        <Ionicons name="search-outline" size={18} color={"grey"} />
                        <Text className="text-gray-400 text-sm flex-1">Search properties, city...</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/(root)/(tabs)/search?openFilters=true")}
                            className="size-8 bg-blue-600 rounded-xl items-center justify-center"
                        >
                            <Ionicons name="options-outline" size={15} color={"white"} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {/* featured section  */}
                    <View className="mb-6">
                        <Text className="font-semibold text-black text-2xl px-5 ">
                            Featured
                        </Text>
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color="blue"
                                className="py-10"
                            />
                        ) : (
                            <FlatList
                                data={featured}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <FeaturedCard property={item} />}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
                            />

                        )}
                    </View>
                    {/* recommended section  */}
                    <View className="mb-6 mx-5">
                        <Text className="text-2xl font-semibold ">Recommended</Text>
                        <FlatList
                            data={recommended}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <PropertyCard property={item} />
                            )}
                        />
                    </View>
                </View>}
                // renderItem={({ item }) => (<View>
                //     <Text>hi</Text>
                // </View>
                // )}
                ListEmptyComponent={
                    !loading ? (
                        <View className="items-center py-10">
                            <Text className="text-gray-500 text-center">No properties found!</Text>
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    )
}