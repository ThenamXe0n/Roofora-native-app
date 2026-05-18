import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <View className='p-3'>
                <Text>Home screen</Text>
            </View>
        </SafeAreaView>
    )
}