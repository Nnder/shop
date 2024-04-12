"use client"
import BucketItem from '@/src/4_features/BucketItem/BucketItem'
import FormBid from '@/src/4_features/Forms/Bid/FormBid'
import { useBidStore } from '@/src/5_entities/bid/bid'
import { Product } from '@/src/5_entities/product/product.types'
import Button from '@/src/6_shared/ui/Buttons/Button'
import { Box, Typography } from '@mui/material'
import { PropsWithChildren} from 'react'

export default function BucketList({products, ...props}: PropsWithChildren<{products: Product[]}> ) {

    const {sum} = useBidStore()

  return (
    <>
        <Box>
            {products.length ? products.map((product)=>(
            <BucketItem key={product.id} product={product}/>)) 
            : <Typography>Тут пусто</Typography>}
        </Box>

        <Box sx={{marginTop: 2, display: 'flex', justifyContent:{xs:'center', sm:'space-between'}, flexWrap: 'wrap'}}>
            <Typography sx={{fontSize: 25}}>
                Итого {sum} руб.
            </Typography>
            <FormBid/>
        </Box>
        
        
    </>
  )
}