'use client'
import BucketList from "@/src/3_widget/BucketList/BucketList";
import { useBidStore } from "@/src/5_entities/bid/bid";
import { Box, Container, Paper, Typography } from "@mui/material";


export default function Bucket() {

    const {products, removeProduct} = useBidStore()
  return (
    <Container sx={{
        pt: 8
       }}>
        <Paper elevation={16} sx={{p: [1,2]}}>
            <Typography textAlign={'center'} variant="h4">
                Корзина
            </Typography>

            <BucketList products={products}/>

            <Box>
                <Typography textAlign={'center'} variant="h4">
                    Прошлые заказы
                </Typography>
            </Box>
        </Paper>
    </Container>
  )
}
