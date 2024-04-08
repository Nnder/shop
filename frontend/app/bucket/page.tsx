'use client'
import { useBidStore } from "@/src/5_entities/bid/bid";
import { Box, Button, Container, Paper, Typography } from "@mui/material";


export default function page() {

    const {products, removeProduct} = useBidStore()
  return (
    <Container sx={{
        pt: 8
       }}>
        <Paper elevation={16} sx={{p: [1,2]}}>
            <Typography>
                Корзина
            </Typography>

            <Box>
                {products.length ? products.map((product)=>(
                    <Box key={product.id}>
                        <div>{product.title}</div>
                        <div>count <Button>Удалить</Button></div>
                    </Box>
                )) : <Typography>Тут пусто</Typography>}

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
