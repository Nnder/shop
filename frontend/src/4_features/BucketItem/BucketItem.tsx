import { useBidStore } from "@/src/5_entities/bid/bid";
import { Product } from "@/src/5_entities/product/product.types";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { Box, Paper, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";

export default function BucketItem({product ,...props}: PropsWithChildren<{product: Product}>) {
    const {removeProduct, productCount, addProductCount, removeProductCount, getProductCount} = useBidStore()
    const [count, setCount] = useState(product.count ? getProductCount(product) : null)

    console.log(count)

    function increase(count: number){
        if(product?.count && count < product.count){
            setCount(++count)
            addProductCount(product)
        }
    }

    function decrease(count: number){
        if(product?.count && count !== 1){
            setCount(--count)
            removeProductCount(product)
        }
    }
  return (
    <Box {...props} sx={{ marginBottom: 1, display: 'flex', justifyContent:'center', alignItems:'center',}}>
        <Paper elevation={16} sx={{width: 1, display: {xs: 'flex', sm:'grid'}, gridTemplateColumns: '1fr 210px', p: 1, flexDirection:'column'}}>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:{xs:'center', sm:'flex-start'}}}>
                <Typography 
                sx={{WebkitLineClamp: {xs:2, sm:1}, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', height: {xs:'50px' ,sm:'25px'}, overflow: 'hidden', fontSize:[16,16,18,20,20]}}>
                    {product.title}
                </Typography>
            </Box>
            
            <Box sx={{
                display: 'flex', justifyContent:{xs:'center', sm:'flex-end'}, flexDirection:{xs:'column', sm:'row'},
                width: {xs: 1, sm: 210}, 
                }}>

                {!!count && count>=0 ? 
                <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', width: 100, marginBottom:{xs:1, sm:0}}}>
                    <Button sx={{minWidth: "10px", px: 2, py: 0.5, fontSize:20}} variant="text" onClick={()=>increase(count)}>+</Button>
                    <Typography>{count}</Typography>
                    <Button sx={{minWidth: "10px", px: 2, py: 0.5, fontSize:20}} variant="text" onClick={()=>decrease(count)}>–</Button>
                </Box> : null
                }
                <Button onClick={()=> removeProduct(product)} sx={{width:{xs: 1, sm: 114}}} >Удалить</Button>
            </Box>
        </Paper>
    </Box>
  )
}
