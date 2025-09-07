import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";

const CartButton = () => {
    const totalItems=7;
    return (
        <TouchableOpacity className={"cart-btn"} onPress={()=>{}}>
            <Image source={images.bag} resizeMode="contain" className={"size-5"} />
            {
                totalItems > 0 && (
                    <View className="cart-badge">
                        <Text className={"small-bold text-white"}>{totalItems}</Text>
                    </View>
                )
            }

        </TouchableOpacity>
    )
}
export default CartButton
