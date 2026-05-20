import { useAuth, useSignIn } from '@clerk/expo';
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignIn() {
    const { signIn, errors, fetchStatus } = useSignIn()
    const { isSignedIn } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const isLoading = fetchStatus === "fetching"
    if (signIn.status === "complete" || isSignedIn) {
        return null
    }


    const onSignInPress = async () => {
        const { error } = await signIn.password({
            emailAddress: email,
            password,
        })
        if (error) {
            alert(error.message);
            return
        }
        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask)
                        return
                    }
                    const url = decorateUrl("/");
                    router.replace(url as any)
                }
            })
        } else if (signIn.status === "needs_second_factor") {
            await signIn.mfa.sendPhoneCode()
        } else if (signIn.status === "needs_client_trust") {
            const emailCodeFactore = signIn.supportedSecondFactors.find(factor => factor.strategy === "email_code")
            if (emailCodeFactore) {
                await signIn.mfa.sendEmailCode()
            }
        } else {
            console.log("signin attempt not completed", signIn)
        }

    }

    const onVerifyPress = async () => {
        await signIn.mfa.verifyEmailCode({ code, });
        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask)
                        return
                    }
                    const url = decorateUrl("/");
                    router.replace(url as any)
                }
            })
        }

    }

    if (signIn.status === "needs_client_trust") {
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
                <Text className='font-bold capitalize text-3xl text-indigo-950'>Welcome Back</Text>
                <View className='flex items-center flex-row'>
                    <Text className='text-neutral-400'>Sign in to your account</Text>
                    <Ionicons name="heart" size={10} color="red" />
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
                {errors.fields.identifier && (
                    <Text className='text-red-500 mb-4'>{errors.fields.identifier.message}</Text>
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
                    onPress={onSignInPress}
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
                    <Text>don&apos;t have an account ? </Text>
                    <Link className='text-blue-500 underline underline-offset-1 ' href={"/sign-up"}>sign up</Link>
                </View>
                <View nativeID='clerk-captcha' />

            </View>

        </ScrollView>
    )
}