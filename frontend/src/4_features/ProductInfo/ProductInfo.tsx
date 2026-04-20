"use client"
import { Product } from "@/src/5_entities/product/product.types";
import { Box, Typography, Button, Chip, Grid, Paper, Divider } from "@mui/material";
import { PropsWithChildren } from "react";
import ProductImages from "../ProductImages/ProductImages";
import { useBucket } from "@/src/6_shared/hooks/useBucket";
import toast from "react-hot-toast";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductInfo({data, ...props}: PropsWithChildren<{data: Product}>) {
    const {inBucket, handleClick} = useBucket(data)
    const isOutOfStock = !(data?.count && data.count > 0);

    return (
        <>
            <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                    <Link href="/products" passHref>
                        <Button 
                            startIcon={<ArrowLeft size={18} />}
                            sx={{ 
                                mb: 2, 
                                color: 'var(--text-muted)',
                                '&:hover': { color: 'var(--accent)' }
                            }}
                        >
                            Назад к списку
                        </Button>
                    </Link>
                    {data.images?.length ? (
                        <ProductImages images={data.images} />
                    ) : (
                        <Box sx={{ 
                            width: '100%', 
                            height: 400, 
                            bgcolor: 'var(--bg-cream)', 
                            borderRadius: 'var(--border-radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography color="text.secondary">Нет изображения</Typography>
                        </Box>
                    )}
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box sx={{ pt: { xs: 0, md: 6 } }}>
                    <Typography variant="h3" sx={{ 
                        fontWeight: 800, 
                        mb: 2, 
                        lineHeight: 1.2,
                        fontSize: { xs: '1.75rem', md: '3rem' }
                    }}>
                        {data.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        {data.price && (
                            <Typography variant="h4" sx={{ 
                                fontWeight: 900, 
                                color: 'var(--accent)',
                                fontSize: { xs: '1.5rem', md: '2.125rem' }
                            }}>
                                {data.price} ₽ {data.weigth ? `/ ${data.weigth}г` : ''}
                            </Typography>
                        )}
                        {data.count ? (
                            <Chip 
                                label={`В наличии: ${data.count} шт`} 
                                color="success" 
                                variant="outlined" 
                                sx={{ fontWeight: 600 }}
                            />
                        ) : (
                            <Chip label="Нет в наличии" color="error" />
                        )}
                    </Box>

                    <Button 
                        fullWidth 
                        variant={inBucket ? "outlined" : "contained"}
                        color={inBucket ? "error" : "primary"}
                        size="large"
                        disabled={isOutOfStock && !inBucket}
                        startIcon={inBucket ? <Trash2 size={20} /> : <ShoppingCart size={20} />}
                        onClick={() => {
                            if (!isOutOfStock || inBucket) {
                                handleClick();
                            } else {
                                toast('Этот товар закончился');
                            }
                        }}
                        sx={{
                            py: 2,
                            fontSize: '1.1rem',
                            bgcolor: inBucket ? 'transparent' : 'var(--primary)',
                            '&:hover': {
                                bgcolor: inBucket ? 'rgba(255, 64, 0, 0.05)' : 'rgba(32, 30, 31, 0.9)',
                            }
                        }}
                    >
                        {inBucket ? "Убрать из корзины" : (isOutOfStock ? "Товар закончился" : "Добавить в корзину")}
                    </Button>
                </Box>
            </Grid>
        </Grid>

        {/* Full-width description section */}
        <Box sx={{ mt: 6 }}>
            <Divider sx={{ mb: 4 }} />
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Описание</Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {data.description}
                </Typography>
                {data.text && (
                    <Typography variant="body1" sx={{ mt: 2, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        {data.text}
                    </Typography>
                )}
            </Box>
        </Box>
        </>
    );
}
