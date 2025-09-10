import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import {CustomInputProps} from "@/type";
import cn from "clsx";

const CustomInput = ({
    placeholder="Enter Text",
    label,
    onChangeText,
    value,
                         secureTextEntry=false,
    keyboardType="default"
}:CustomInputProps) => {
    const [isFocused, setisFocused] = useState(false);
    return (
        <View className="w-full">
           <Text className="label">{label}</Text>
            <TextInput
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setisFocused(true)}
                onBlur={() => setisFocused(false)}
                placeholder={placeholder}
                placeholderTextColor="#888"
                className={cn('input', isFocused ? 'border-primary':'border-gray-300')}
            />
        </View>
    )
}
export default CustomInput
