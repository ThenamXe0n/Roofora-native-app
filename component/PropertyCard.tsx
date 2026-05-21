import { formatPrice } from '@/lib/utils'
import { Property } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function PropertyCard({ property }: { property: Property }) {
    const [isSaved, setIsSaved] = useState(true)

    const handleSavePropertyOnPress = () => {
        setIsSaved((prev) => !prev)
    }

    if (!property) {
        return null
    }
    return (
        <TouchableOpacity className="rounded-2xl my-3 justify-between flex-row">
            <View style={{ width: 100, height: 100 }}>
                <Image
                    source={property.images.length > 0 ? { uri: property?.images?.[0] } : require("@/assets/images/placeholder.webp")}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                    resizeMode='cover'
                />
            </View>
            <View className="flex-col justify-between  flex-1 p-3">
                <View>
                    <Text className="text-lg font-bold capitalize">{property?.title}</Text>
                    <View className='flex-row items-center '>
                        <Ionicons name='location-outline' size={16} color={"grey"} />
                        <Text style={{ color: "grey" }}>{property?.address}</Text>
                    </View>
                </View>
                {property?.is_sold ?
                    (<View className="flex-row items-center justify-start">
                        <Ionicons name="pricetag" size={16} color={"red"} />
                        <Text className="w-fit   text-red-400 p-2 font-bold rounded-2xl">Sold</Text>
                    </View>) :
                    (<View className='flex-row items-center justify-between' >
                        <Text className="text-blue-400" style={{ fontWeight: 600, fontSize: 16 }}>{formatPrice(property?.price)}</Text>
                        <View className="flex-row items-center gap-2">
                            <View className="flex-row items-center justify-center gap-2">
                                <Ionicons name="bed-outline" size={16} color={"grey"} />
                                <Text className="text-gray-400 text-sm">{property?.bedrooms} bd</Text>
                            </View>
                            <View className="flex-row items-center justify-center gap-1">
                                <Ionicons name="expand-outline" size={16} color={"grey"} />
                                <Text className="text-gray-400 text-sm">{property?.area_sqft} ft²</Text>
                            </View>
                        </View>
                    </View>
                    )}
            </View>
            <TouchableOpacity onPress={handleSavePropertyOnPress}>
                <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={isSaved ? "blue" : "#9CA3AF"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}