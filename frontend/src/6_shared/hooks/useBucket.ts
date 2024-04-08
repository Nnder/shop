import { useBidStore } from "@/src/5_entities/bid/bid";
import { Product } from "@/src/5_entities/product/product.types";
import { useEffect, useState } from "react";

export function useBucket(product: Product){
    const [inBucket, setInBucket] = useState<Boolean>(false);
    const {products, addProduct, removeProduct, existInBid } = useBidStore()

    useEffect(()=>{
        setInBucket(existInBid(product)(products))
    }, [products.length])

    const handleClick = (): void => {
        inBucket ? removeProduct(product) : addProduct(product)
        return;
    }

    return {inBucket, handleClick}
}

