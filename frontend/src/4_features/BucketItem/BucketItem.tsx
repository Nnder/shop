import { useBidStore } from "@/src/5_entities/bid/bid";
import { Product } from "@/src/5_entities/product/product.types";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { Box, Paper, Typography, IconButton, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { restClient } from "@/src/6_shared/api/api.fetch";

export default function BucketItem({product ,...props}: PropsWithChildren<{product: Product}>) {
    const {removeProduct, productCount, addProductCount, removeProductCount, getProductCount} = useBidStore()
    const [count, setCount] = useState(product.count ? getProductCount(product) : null)

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

    const totalPrice = count && count >= 0 && product.price ? product.price * count : product.price || 0
    const totalWeight = count && count >= 0 && product.weigth ? product.weigth * count : product.weigth || 0

  return (
    <Paper elevation={2} sx={{mb: 2, borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border-color)'}}>
        <Grid container>
            {/* Product Image */}
            <Grid item xs={12} sm={4} md={3}>
                <Box sx={{height: {xs: 200, sm: '100%'}, bgcolor: 'var(--bg-cream)'}}>
                    <Link href={`products/${product.id}`} passHref>
                        {product?.images?.length ? (
                            <Box
                                component="img"
                                src={restClient.getMediaUrl(product.images[0].url)}
                                alt={product.title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            />
                        ) : (
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)'
                            }}>
                                Нет изображения
                            </Box>
                        )}
                    </Link>
                </Box>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} sm={8} md={9}>
                <CardContent sx={{p: {xs: 2, sm: 3}, height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2}}>
                        <Link href={`products/${product.id}`} passHref style={{textDecoration: 'none', color: 'inherit', flex: 1}}>
                            <Typography variant="h6" sx={{
                                fontWeight: 700,
                                mb: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                lineHeight: 1.3
                            }}>
                                {product.title}
                            </Typography>
                        </Link>
                        <IconButton
                            onClick={() => removeProduct(product)}
                            sx={{color: 'var(--accent)', ml: 1}}
                            size="small"
                        >
                            <Trash2 size={18} />
                        </IconButton>
                    </Box>

                    <Typography variant="body2" sx={{
                        color: 'var(--text-muted)',
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        lineHeight: 1.5
                    }}>
                        {product.description}
                    </Typography>

                    <Box sx={{mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.5}}>
                            <Typography variant="body2" sx={{color: 'var(--text-muted)'}}>
                                Цена: {product.price} ₽/{product.weigth}г
                            </Typography>
                            <Typography variant="h6" sx={{color: 'var(--accent)', fontWeight: 700}}>
                                {totalPrice} ₽
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <IconButton
                                onClick={() => decrease(count || 1)}
                                disabled={!count || count <= 1}
                                sx={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 2,
                                    '&:hover': {bgcolor: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'},
                                    '&:disabled': {opacity: 0.3}
                                }}
                                size="small"
                            >
                                <Minus size={16} />
                            </IconButton>
                            <Typography sx={{minWidth: 40, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem'}}>
                                {count || 1}
                            </Typography>
                            <IconButton
                                onClick={() => increase(count || 1)}
                                disabled={!product.count || (count || 1) >= product.count}
                                sx={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 2,
                                    '&:hover': {bgcolor: 'var(--accent)', color: 'white', borderColor: 'var(--accent)'},
                                    '&:disabled': {opacity: 0.3}
                                }}
                                size="small"
                            >
                                <Plus size={16} />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
            </Grid>
        </Grid>
    </Paper>
  )
}
