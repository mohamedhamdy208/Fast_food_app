import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const[form, setForm] = useState({name:"",email:"", password:""});
    const submit =async () => {
        const{name, email, password} = form;
        if(!name || !email || !password) return Alert.alert('Invalid',"Please enter a valid email & Password");
        setIsSubmitting(true);
        try {
            await createUser({
                email,
                password,
                name,

            });

            router.replace('/')
        }catch(error:any){
            Alert.alert('Error',error.message);
        }finally{
            setIsSubmitting(false);
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

            <CustomInput
                placeholder="Enter Your User Name"
                label="Full Name"
                onChangeText={(text ) => setForm((prev)=>({
                    ...prev,name:text
                }))}
                value={form.name}

            />
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
                title='Sign Up'
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className={'flex gap-2 justify-center mt-5 flex-row'}>
                <Text className='base-regular text-gray-100' >Already Have an Account ?</Text>
                <Link href='/sign-in' className='base-bold text-primary'>Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
