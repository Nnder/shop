"use client"
import { Product } from '@/src/5_entities/product/product.types';
import { restClient } from '@/src/6_shared/api/api.fetch';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button} from '@mui/material';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function ProductCard({product, ...props}: PropsWithChildren<{product: Product}> ) {
    const router = useRouter()
    const clickHandler = ()=> router.push(`/products/${product.id}`)
    
    return (
        <Card sx={{ width: ["90%", "45%", "30%", 330 ,330], border: 1, borderColor: '#4664' }} elevation={8}>
            <CardActionArea onClick={clickHandler} sx={{position: 'relative'}}>
                <CardMedia
                    sx={{ height: 140, weight: 140}}
                    image={product?.images?.length ?
                        restClient.getMediaUrl(product.images[0].url) : "/img/google.svg"
                    }
                    title={"text"}
                />
                { product.price && product.weigth ? 
                (<Typography sx={{
                    position: 'absolute', 
                    bottom:0, 
                    right:0,
                    width: 120,
                    textAlign: 'right',
                    px:1,
                    backgroundColor: 'white'
                    }}>
                        {product.price} руб./{product.weigth} г
                    </Typography>) : (<div></div>)
                }
            </CardActionArea>
            <CardContent sx={{p:0.5}}>
                <Typography gutterBottom variant="h5" component="div" sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    fontSize: [20,18,20,22],
                    p:[0.5,1],
                    height: [50,60,70,75],
                    }}>
                {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                    fontSize: [14,14,14,18],
                    p:[0.5,1],
                    height: [75,70,70,90]
                }}>
                {product.description}
                </Typography>
                {product.count ?
                    <Typography sx={{p:[0.5,1], fontSize: [14,16]}}>В наличии {product.count} шт</Typography> :
                    <Typography sx={{p:["15px", "20px"]}}></Typography>
                }
                
            </CardContent>
            <CardActions>
                <Button sx={{width: "100%"}} size="large">Добавить в корзину</Button>
            </CardActions>
        </Card>
  );
}