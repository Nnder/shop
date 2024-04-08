'use client'
import BucketItem from "@/src/4_features/BucketItem/BucketItem";
import { useBidStore } from "@/src/5_entities/bid/bid";
import { Box, Button, Container, Paper, Typography } from "@mui/material";


export default function page() {

    const {products, removeProduct} = useBidStore()
  return (
    <Container sx={{
        pt: 8
       }}>
        <Paper elevation={16} sx={{p: [1,2]}}>
            <Typography textAlign={'center'} variant="h4">
                Корзина
            </Typography>

            <Box>
                {products.length ? products.map((product)=>(
                <BucketItem key={product.id} product={product}/>)) 
                : <Typography>Тут пусто</Typography>}

            </Box>

            {/* <Box>
                <Typography>
                    Прошлые покупки
                </Typography>
            </Box> */}
        </Paper>
    </Container>
  )
}
