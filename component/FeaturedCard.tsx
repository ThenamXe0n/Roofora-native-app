import { Property } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function FeaturedCard({ property }: { property: Property }) {
    const router = useRouter()
    return (
        <TouchableOpacity
            className=' relative mr-2 rounded-3xl overflow-hidden bg-white'
            style={{
                width: 300,
                borderRadius: 25,
                marginRight: 18,
                overflow: 'hidden',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 4,
                opacity: property.is_sold ? 0.5 : 1
            }}
        // onPress={() => router.push(`/(root)/`)}
        >
            <Image
                source={{ uri: property.images[0] }}
                className='w-full h-44'
                resizeMode='cover'
            />
            <View style={{ position: "absolute", top: 7, left: 8, backgroundColor: "white", borderRadius: 100 }} className='px-3 py-1'>
                <Text className='text-xs font-semibold text-blue-400 capitalize px-4'>
                    {property.type}
                </Text>
            </View>
            {property.is_sold && (
                <View style={{ position: "absolute", top: 7, right: 8, backgroundColor: "red", borderRadius: 100 }} className='px-3 py-1'>
                    <Text className='text-xs font-semibold text-blue-400 capitalize px-4'>
                        sold
                    </Text>
                </View>
            )
            }
            <View style={{ paddingLeft: 12, paddingRight: 8, paddingTop: 12, paddingBottom: 12 }}>
                <Text className='text-lg font-semibold text-gray-800 mb-1'>
                    {property.title}
                </Text>
                <View className='flex-row items-center '>
                    <Ionicons name='location-outline' size={16} color={"blue"} />
                    <Text>{property.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}