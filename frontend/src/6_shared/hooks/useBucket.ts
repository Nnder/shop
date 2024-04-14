import { useBidStore } from "@/src/5_entities/bid/bid";
import { Product } from "@/src/5_entities/product/product.types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useBucket(product: Product){
    const session = useSession()
    const [inBucket, setInBucket] = useState<Boolean>(false);
    const {count, addProduct, removeProduct, existInBid,} = useBidStore()

    useEffect(()=>{
        setInBucket(existInBid(product))  
    }, [count])

    const handleClick = (): void => {
        if(session.status === "unauthenticated"){
            toast("Пользователь не авторизован")
        } else {
            inBucket ? removeProduct(product) : addProduct(product)
            // toast("Товар добавлен")
        }
    }

    return {inBucket, handleClick}
}

