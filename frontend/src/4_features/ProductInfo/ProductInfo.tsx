"use client"
import { Product } from "@/src/5_entities/product/product.types";
import { restClient } from "@/src/6_shared/api/api.fetch";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { Box, Typography } from "@mui/material";
import Image from "mui-image";
import { PropsWithChildren } from "react";
import ProductImages from "../ProductImages/ProductImages";

export default function ProductInfo({data, ...props}: PropsWithChildren<{data: Product}>) {
    console.log(data.images)
  return (
    <Box>
        <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: 1}}>
            <Box sx={{width: ["95%", "95%", "47%"] ,pr: [0,0,1]}}>
                <Image src={data.images?.length ? restClient.getMediaUrl(data.images[0].url) : "img/card.jpg" } 
                alt={data?.images?.length ? data.images[0].alternativeText : 'alt'} width={"100%"} height={"300px"}/>
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
                    <Button sx={{mx:0, width: 1}}>Добавить в корзину</Button> 
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
