"use client"
import { Product } from "@/src/5_entities/product/product.types";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { Box, Typography } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";
import ProductImages from "../ProductImages/ProductImages";
import { useBidStore } from "@/src/5_entities/bid/bid";

export default function ProductInfo({data, ...props}: PropsWithChildren<{data: Product}>) {
    console.log(data.images)
    const [inBucket, setInBucket] = useState<Boolean>(false);
    const {products, addProduct, removeProduct, existInBid } = useBidStore()

    useEffect(()=>{
        setInBucket(existInBid(data)(products))
        console.log(inBucket)
        console.log(products)
        console.log(existInBid(data)(products))
    }, [products.length])


    function handleClick(){
        inBucket ? removeProduct(data) : addProduct(data)
    }

  return (
    <Box>
        <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: 1}}>
            <Box sx={{width: ["95%", "95%", "47%"] ,pr: [0,0,1]}}>
                {data.images?.length ? ( <ProductImages images={data.images}/>) : null}
            </Box>
            <Box sx={{width: ["95%", "95%", "50%"], mt:{xs:2, sm:2, md:0}}}>
                <Typography variant="h1" sx={{fontSize: ["20px","25px","30px"], fontWeight: 400, mb:1}} >
                    {data.title}
                </Typography>
                

                <Box sx={{mt:1, display: 'flex', alignItems:'center', flexWrap: 'wrap', justifyContent: {xs:'center',sm:'center',md:'start'}}}>
                    
                    {data.price && data.weigth ? (
                    <Typography variant="h2" sx={{fontSize: ["20px","20px","25px"], fontWeight: 900, mb:1}}>
                        {data.price} руб./ {data.weigth} г
                    </Typography> ): null}
                    <Button sx={{mx:0, width: 1}} onClick={()=>handleClick()}>{inBucket ? "Убрать из корзины" : "Добавить в корзину"}</Button> 
                </Box>

                
            </Box>

            <Box sx={{mt:2, px:[1,2,1,1]}} >
                <Typography variant="h3" sx={{fontSize: ["15px","18px","20px"], mb:1}}>
                    {data.text}
                </Typography>

                <Typography variant="h3" sx={{fontSize: ["15px","18px","20px"]}}>
                    {data.description}
                </Typography>
            </Box>
        </Box>
    </Box> 
  )
}
