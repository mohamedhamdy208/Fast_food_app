import {FlatList, Text, View, Image, Pressable, TouchableOpacity, Button} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images, offers} from "@/constants";
import {Fragment} from "react";
import  cn from 'clsx'
import CartButton from "@/components/CartButton";
import * as Sentry from '@sentry/react-native'
import useAuthStore from "@/store/auth.store";
export default function Index() {
    const {user} = useAuthStore()

  return (
    <SafeAreaView className="flex-1 bg-white">

          <FlatList
              showsVerticalScrollIndicator={false}
          data={offers}
          renderItem={({item,index})=>{
              const isEven=index %2 ==0;
              return(

                  <Pressable className={cn("offer-card" ,isEven ? 'flex-row-reverse' : 'flex-row')}
                             android_ripple={{color:"#fffff22"}}
                             style={{backgroundColor:item.color}}>
                      {({pressed})=>(
                          <Fragment>
                              <View className={"w-1/2 h-full"}>
                                    <Image source={item.image} className={"size-full"} resizeMode={"contain"}/>
                              </View>
                              <View className={cn("offer-card__info",isEven ? "pl-10" :"pr-10")}>
                                  <Text className={"h1-bold text-white leading-tight"}>
                                      {item.title}
                                  </Text>
                                  <Image source={images.arrowRight}
                                  className={"size-10"}
                                         resizeMode={"contain"}
                                         tintColor={"#ffffff"}
                                  />
                              </View>
                          </Fragment>
                      )}
                  </Pressable>
              )

          }}
          contentContainerClassName="pb-28 px-5"
          ListHeaderComponent={()=>(
              <View className="flex-between flex-row w-full my-5 px-5">
                  <View className="flex-start ">
                      <Text className="small-bold text-primary">Deliver To </Text>
                      <TouchableOpacity className={"flex-center flex-row gap-x-1 mt-0.5"}>
                          <Text className={"paragraph-bold text-dark-100 "}>Egypt</Text>
                          <Image source={images.arrowDown} resizeMode="contain" className={"size-3"}/>

                      </TouchableOpacity>
                  </View>
                  <CartButton/>
              </View>
          )}

          />

    </SafeAreaView>
  );
}
