'use client'
import { useSession } from "next-auth/react";
import { user } from "../5_entities/user/user.types";
import { PropsWithChildren } from "react";

export default function Cache({...props}: PropsWithChildren) {
    const session = useSession()
    const user: Partial<user> = session.data?.user as user

    if(session.status == "authenticated" && localStorage.getItem('token') !== user?.jwt)
        localStorage.setItem('token', user?.jwt || "")

    // tanstack makes caching
    // so i dont need this code
    // useEffect(()=>{
    //     if(!localStorage.getItem('products')){
    //         if(isFetched){
    //             const products = JSON.stringify(data)
    //             localStorage.setItem('products', products)
    //             console.log(localStorage.getItem('products'))
    //         } else {
    //             console.log('getting products')
    //         }
            
    //     } else {
    //         console.log('products was loaded')
    //     }
    // }, [data])

    // useRefreshPage(()=>localStorage.removeItem('products'))    

    return (
        <></>
    )
}
