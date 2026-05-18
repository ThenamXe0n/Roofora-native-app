import { Link } from 'expo-router'
import { View, Text } from 'react-native'

export default function SignIn() {
    return (
        <View className='flex-1 items-center justify-center bg-white '>
            <Text className='text-xl font-bold'>SignInScreen</Text>
            <Link href="/(auth)/sign-up"><Text className='underline text-blue-600 capitalize mt-4'>sign up </Text></Link>
        </View>
    )
}