import { useBidStore } from "@/src/5_entities/bid/bid";
import { Product } from "@/src/5_entities/product/product.types";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { Box, Paper, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";

export default function BucketItem({product ,...props}: PropsWithChildren<{product: Product}>) {
    const {removeProduct} = useBidStore()
    const [count, setCount] = useState(1)

    function increase(count: number){
        if(product?.count && count < product.count){
            setCount(++count)
        }
    }

    function decrease(count: number){
        if(product?.count && count !== 1){
            setCount(--count)
        }
    }
  return (
    <Box {...props} sx={{ marginBottom: 1, display: 'flex', justifyContent:'center', alignItems:'center',}}>
        <Paper elevation={16} sx={{width: 1, display: 'grid', gridTemplateColumns: '1fr 210px', p: 1}}>
            <Box sx={{display: 'flex', alignItems:'center',}}>
                <Typography 
                sx={{WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', height: '25px', overflow: 'hidden', fontSize:[16,16,18,20,20]}}>
                    {product.title}
                </Typography>
            </Box>
            
            <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', width: 210}}>
                <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', width: 100}}>
                    <Button sx={{minWidth: "10px", px: 2, py: 0.5, fontSize:20}} variant="text" onClick={()=>increase(count)}>+</Button>
                    <Typography>{count}</Typography>
                    <Button sx={{minWidth: "10px", px: 2, py: 0.5, fontSize:20}} variant="text" onClick={()=>decrease(count)}>–</Button>
                </Box>
                <Button onClick={()=> removeProduct(product)}>Удалить</Button>
            </Box>
        </Paper>
    </Box>
  )
}
