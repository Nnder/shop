import { useBidStore } from "@/src/5_entities/bid/bid";
import { Product } from "@/src/5_entities/product/product.types";
import { useEffect, useState } from "react";

export function useBucket(product: Product){
    const [inBucket, setInBucket] = useState<Boolean>(false);
    const {products, addProduct, removeProduct, existInBid, count, productCount } = useBidStore()

    useEffect(()=>{
        setInBucket(existInBid(product)(products))
        console.log("-----------")
        console.log(count)
        console.log(inBucket)
        console.log(products)
        console.log(existInBid(product)(products))
        console.log(productCount)
        
        
    }, [count])

    const handleClick = (): void => {
        inBucket ? removeProduct(product) : addProduct(product)
        return;
    }

    return {inBucket, handleClick}
}

