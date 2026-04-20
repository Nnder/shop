"use client"
import { Product } from '@/src/5_entities/product/product.types';
import { restClient } from '@/src/6_shared/api/api.fetch';
import { useBucket } from '@/src/6_shared/hooks/useBucket';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import toast from 'react-hot-toast';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function ProductCard({product, ...props}: PropsWithChildren<{product: Product}> ) {
    const router = useRouter()
    const clickHandler = ()=> router.push(`/products/${product.id}`)
    const {inBucket, handleClick} = useBucket(product)
    
    const isOutOfStock = !(product?.count && product.count > 0);

    return (
        <Card sx={{ 
            width: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.333% - 24px)", lg: 320 },
            display: 'flex',
            flexDirection: 'column',
            transition: 'var(--transition)',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 'var(--shadow-lg)',
            },
            position: 'relative',
            overflow: 'visible'
        }}>
            <CardActionArea onClick={clickHandler} sx={{ borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    sx={{ 
                        height: 220, 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                    }}
                    image={product?.images?.length ?
                        restClient.getMediaUrl(product.images[0].url) : "/img/google.svg"
                    }
                    alt={product.title}
                />
                {product.price && (
                    <Box sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'var(--accent)',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '20px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 12px rgba(255, 64, 0, 0.3)'
                    }}>
                        {product.price} ₽ {product.weigth ? `/ ${product.weigth}г` : ''}
                    </Box>
                )}
            </CardActionArea>

            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography variant="h6" sx={{
                    fontWeight: 700,
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    minHeight: '3.2rem',
                    lineHeight: 1.2
                }}>
                    {product.title}
                </Typography>
                
                <Typography variant="body2" sx={{
                    color: 'var(--text-muted)',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    minHeight: '3rem',
                    mb: 2,
                    lineHeight: 1.5
                }}>
                    {product.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    {product.count ? (
                        <Chip 
                            label={`В наличии: ${product.count} шт`} 
                            size="small" 
                            variant="outlined" 
                            sx={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }} 
                        />
                    ) : (
                        <Chip 
                            label="Закончился" 
                            size="small" 
                            color="error" 
                            variant="outlined" 
                            sx={{ fontSize: '0.75rem' }} 
                        />
                    )}
                </Box>
            </CardContent>

            <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                    fullWidth 
                    variant={inBucket ? "outlined" : "contained"}
                    color={inBucket ? "error" : "primary"}
                    size="large"
                    disabled={isOutOfStock && !inBucket}
                    startIcon={inBucket ? <Trash2 size={18} /> : <ShoppingCart size={18} />}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isOutOfStock || inBucket) {
                            handleClick();
                        } else {
                            toast('Этот товар закончился');
                        }
                    }}
                    sx={{
                        py: 1.2,
                        bgcolor: inBucket ? 'transparent' : 'var(--primary)',
                        color: inBucket ? 'var(--accent)' : 'var(--secondary)',
                        borderColor: inBucket ? 'var(--accent)' : 'transparent',
                        '&:hover': {
                            bgcolor: inBucket ? 'rgba(255, 64, 0, 0.05)' : 'rgba(32, 30, 31, 0.9)',
                            borderColor: inBucket ? 'var(--accent)' : 'transparent',
                        }
                    }}
                >
                    {inBucket ? "Убрать" : (isOutOfStock ? "Нет в наличии" : "В корзину")}
                </Button>
            </Box>
        </Card>
    );
}
