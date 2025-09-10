import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import {CustomButtonProps} from "@/type";
import cn from "clsx";

const CustomButton = ({
    onPress,
    leftIcon,
    title="Click Me",
    isLoading=false,
    textStyle, style
}:CustomButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} className={cn('custom-btn bg-primary', style)}>
            {leftIcon}
            <View className={'flex-center flex-row'}>
                {isLoading ? (
                    <ActivityIndicator size={'small'} color='white' />
                ):(
                    <Text className={cn('text-white-100 paragraph-semibold')}>{title}</Text>
                )
                }
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
