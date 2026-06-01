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
                    p: { xs: 3, sm: 6 },
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px dashed var(--border-color)',
                    bgcolor: 'var(--bg-cream)'
                }}>
                    <Box sx={{color: 'var(--text-muted)', mb: { xs: 1, sm: 2 }}}>
                        <ShoppingBag size={ { xs: 48, sm: 64 } } />
                    </Box>
                    <Typography variant="h6" sx={{color: 'var(--text-muted)', mb: { xs: 0.5, sm: 1 }, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                        Корзина пуста
                    </Typography>
                    <Typography variant="body2" sx={{color: 'var(--text-muted)', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        Добавьте товары из каталога для оформления заказа
                    </Typography>
                </Paper>
            )}
        </Box>

        {products.length > 0 && (
            <>
                <Divider sx={{my: { xs: 2, sm: 3 }}} />
                <Paper sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    bgcolor: 'var(--primary)',
                    color: 'var(--secondary)'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        flexWrap: 'wrap',
                        gap: { xs: 1.5, sm: 2 }
                    }}>
                        <Box>
                            <Typography variant="body2" sx={{opacity: 0.8, mb: { xs: 0.25, sm: 0.5 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                Товаров: {count}
                            </Typography>
                            <Typography variant="h4" sx={{fontWeight: 800, fontSize: { xs: '1.3rem', sm: '2.125rem' } }}>
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
