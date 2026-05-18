import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import { useAuth, useSignUp } from '@clerk/expo';
import { Link, router } from 'expo-router';

export default function SignUp() {
    const { signUp, errors, fetchStatus } = useSignUp()
    const { isSignedIn } = useAuth()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const isLoading = fetchStatus === "fetching"
    if (signUp.status === "complete" || isSignedIn) {
        return null
    }


    const onSignUpPress = async () => {
        const { error } = await signUp.password({
            emailAddress: email,
            password,
            firstName,
            lastName
        })
        if (error) {
            alert(error.message);
            return
        }
        if (!error) {
            await signUp.verifications.sendEmailCode()
        };
    }

    const onVerifyPress = async () => {
        await signUp.verifications.verifyEmailCode({ code, });
        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any)
                }
            })
        }

    }

    if (signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0) {
        return (<View className='flex-1 justify-center   px-8 py-12'>
            <Image source={require("../../assets/images/Roofora.png")} className='size-28' resizeMode='contain' />
            <Text className='font-bold capitalize text-3xl text-indigo-950'>Verify Email</Text>
            <View className='flex items-center flex-row'>
                <Text className='text-neutral-400'> A verification code is been sent on  {email}</Text>
            </View>
            <View className='flex-row gap-3 my-4'>
                <TextInput
                    className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
                    placeholder='code'
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize='words'
                    value={code}
                    onChangeText={setCode}
                />
            </View>
            <TouchableOpacity
                onPress={onVerifyPress}
                disabled={isLoading}
                className='w-full bg-blue-600 py-4 rounded-xl items-center mb-4'
            >
                {isLoading ? (
                    <ActivityIndicator color={"white"} />
                ) : (
                    <Text className='capitalize text-white font-bold text-base'>verify</Text>
                )}
            </TouchableOpacity>
        </View>)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-white' keyboardShouldPersistTaps="handled">
            <View className='flex-1 justify-center   px-8 py-12'>
                <Image source={require("../../assets/images/Roofora.png")} className='size-28' resizeMode='contain' />
                <Text className='font-bold capitalize text-3xl text-indigo-950'>Create Account</Text>
                <View className='flex items-center flex-row'>
                    <Text className='text-neutral-400'>Where Every Roof Feels Like Home </Text>
                    <Ionicons name="heart" size={10} color="red" />
                </View>
                <View className='flex-row gap-3 my-4'>
                    <TextInput
                        className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
                        placeholder='First Name'
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize='words'
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        className='flex-1 border border-gray-300 rounded-xl px-4 py-3'
                        placeholder='Last Name'
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize='words'
                        value={lastName}
                        onChangeText={setLastName}
                    />

                </View>
                <TextInput
                    className=' border border-gray-300 rounded-xl px-4 py-3 mb-4'
                    placeholder='Email Address'
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize='words'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />
                {errors.fields.emailAddress && (
                    <Text className='text-red-500 mb-4'>{errors.fields.emailAddress.message}</Text>
                )}
                <TextInput
                    className=' border border-gray-300 rounded-xl px-4 py-3 mb-6'
                    placeholder='Password '
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize='words'
                    keyboardType='email-address'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {errors.fields.password && (
                    <Text className='text-red-500 mb-4'>{errors.fields.password.message}</Text>
                )}
                <TouchableOpacity
                    onPress={onSignUpPress}
                    disabled={isLoading}
                    className='w-full bg-blue-600 py-4 rounded-xl items-center mb-4'
                >
                    {isLoading ? (
                        <ActivityIndicator color={"white"} />
                    ) : (
                        <Text className='capitalize text-white font-bold text-base'>Sign up</Text>
                    )}
                </TouchableOpacity>

                <View className='flex-row justify-center mt-3'>
                    <Text>Already have an account ? </Text>
                    <Link className='text-blue-500 underline underline-offset-1 ' href={"/(auth)/sign-in"}>sign in</Link>
                </View>
                <View nativeID='clerk-captcha' />

            </View>

        </ScrollView>
    )
}