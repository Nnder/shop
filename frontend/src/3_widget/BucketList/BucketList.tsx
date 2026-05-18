"use client"
import BucketItem from '@/src/4_features/BucketItem/BucketItem'
import FormBid from '@/src/4_features/Forms/Bid/FormBid'
import { useBidStore } from '@/src/5_entities/bid/bid'
import { Product } from '@/src/5_entities/product/product.types'
import { Box, Typography, Paper, Divider } from '@mui/material'
import { PropsWithChildren} from 'react'
import { ShoppingBag } from 'lucide-react'

export default function BucketList({products, ...props}: PropsWithChildren<{products: Product[]}> ) {

    const {sum, count} = useBidStore()

  return (
    <>
        <Box>
            {products.length ? (
                products.map((product)=>(
                    <BucketItem key={product.id} product={product}/>
                ))
            ) : (
                <Paper sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px dashed var(--border-color)',
                    bgcolor: 'var(--bg-cream)'
                }}>
                    <Box sx={{color: 'var(--text-muted)', mb: 2}}>
                        <ShoppingBag size={64} />
                    </Box>
                    <Typography variant="h6" sx={{color: 'var(--text-muted)', mb: 1}}>
                        Корзина пуста
                    </Typography>
                    <Typography variant="body2" sx={{color: 'var(--text-muted)'}}>
                        Добавьте товары из каталога для оформления заказа
                    </Typography>
                </Paper>
            )}
        </Box>

        {products.length > 0 && (
            <>
                <Divider sx={{my: 3}} />
                <Paper sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'var(--primary)',
                    color: 'var(--secondary)'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box>
                            <Typography variant="body2" sx={{opacity: 0.8, mb: 0.5}}>
                                Товаров: {count}
                            </Typography>
                            <Typography variant="h4" sx={{fontWeight: 800}}>
                                Итого: {sum} ₽
                            </Typography>
                        </Box>
                        <FormBid/>
                    </Box>
                </Paper>
            </>
        )}
    </>
  )
}
