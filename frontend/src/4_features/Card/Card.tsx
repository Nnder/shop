"use client"
import { Product } from '@/src/5_entities/product/product.types';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button} from '@mui/material';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function ProductCard({product, ...props}: PropsWithChildren<{product: Product}> ) {
    const router = useRouter()
    const clickHandler = ()=> router.push(`/products/${product.id}`)
    return (
        <Card sx={{ width: ["90%", "45%", "30%", 330 ,330], border: 1, borderColor: '#4664' }} elevation={8}>
            <CardActionArea onClick={clickHandler}>
            <CardMedia
                sx={{ height: 140, weight: 140 }}
                image={'/img/google.svg'}
                title={"text"}
            />
            <Typography>{product.weigth}</Typography>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: [14,14,14,18]
                }}>
                {product.description}
                </Typography>
                <Typography>{product.price}</Typography>
                <Typography>{product.count}</Typography>
            </CardContent>
            <CardActions>
                <Button sx={{width: "100%"}} size="large">Добавить в корзину</Button>
            </CardActions>
        </Card>
  );
}