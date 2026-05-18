import { useAuth } from '@clerk/expo'
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native'


export default function Profile() {
  const { signOut } = useAuth()
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in")

    } catch (error) {
      console.log("Error singing out : ", error)
    }
  }
  return (
    <View className='flex-1 items-center justify-center'>
      <TouchableOpacity onPress={handleSignOut} className='p-2 rounded-lg px-8 py-1 bg-red-600 '>
        <Text className='text-center capitalize text-white'>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}