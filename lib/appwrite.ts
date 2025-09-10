import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";



export const appwriteConfig={
    endPoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform:"com.jsm.foodordering",
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:'68be0bb00032ca0e4b52',
    userId:'68be891b000269ae36e1'

}
export const client =new Client()
client.setEndpoint(appwriteConfig.endPoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform)

export  const  account =new Account(client)
export const databases =new Databases(client)
const avatars =new Avatars(client)

export const createUser =async({email,password,name}:CreateUserParams)=> {
    try {
        const newAccount =await account.create(ID.unique(),email,password,name)
        if(!newAccount)throw Error;
        await signIn({email,password})
        const avatarUrl =avatars.getInitialsURL(name)
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userId,
            ID.unique(),
            {
                accountid:newAccount.$id,
                email,name,avatar:avatarUrl
            }
        )

    } catch (e) {

    throw new Error(e as string)
}
}
export const signIn =async({email,password}:SignInParams)=>{
    try {
        const session = await account.createEmailPasswordSession(email,password)
    }catch(e){
        throw new Error(e as string)
    }
}

export const getCurrentUser =async()=>{
    try{
        const currentAccount=await  account.get()
        if(!currentAccount)throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userId,
            [Query.equal('accountid',currentAccount.$id)]
        )
        if(!currentAccount)throw Error;
        return currentUser.documents[0]
    }catch(e){
        throw new Error(e as string)
    }
}