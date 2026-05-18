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
    }, [count, existInBid, product])

    const handleClick = (): void => {
        inBucket ? removeProduct(product) : addProduct(product)
    }

    return {inBucket, handleClick}
}

