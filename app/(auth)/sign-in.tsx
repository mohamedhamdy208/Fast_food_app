import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const[form, setForm] = useState({email:"", password:""});
    const submit =async () => {
        const {email, password} = form;
        if(!email || !password) return  Alert.alert('Invalid',"Please enter a valid email & Password");
        setIsSubmitting(true);
        try {

            await signIn({
                    email
                , password});
            router.replace('/')
        }catch(error:any){
            Alert.alert('Error',error.message);
            Sentry.captureException(error);
        }finally{
            setIsSubmitting(false);
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

            <CustomInput
                placeholder="Enter Your Email"
                label="Email"
                onChangeText={(text ) => setForm((prev)=>({
                    ...prev,email:text
                }))}
                value={form.email}
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter Your Password"
                label="Password"
                onChangeText={(text ) => setForm((prev)=>({
                    ...prev,password:text
                }))}
                value={form.password}
                secureTextEntry={true}
            />
            <CustomButton
            title='Sign In'
            isLoading={isSubmitting}
            onPress={submit}
            />
    <View className={'flex gap-2 justify-center mt-5 flex-row'}>
        <Text className='base-regular text-gray-100' >Don't Have an Account ?</Text>
        <Link href='/sign-up' className='base-bold text-primary'>Sign Up</Link>
    </View>
            <Link href={'/(tabs)'}>Home</Link>
        </View>
    )
}
export default SignIn
