import { Bid } from "@/src/5_entities/bid/bid.types";
import { Product } from "@/src/5_entities/product/product.types";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { PropsWithChildren } from "react";

export default function BidList({data, ...props}: PropsWithChildren<{data:any}>) {
  return (
    <Box sx={{marginTop: 2}}>
        {data.map((el: Bid&{counts: string}, i: number)=>
                <Paper key={i} sx={{p: {xs: 0.5, sm:2}, marginBottom: 1}} elevation={16}>
                    <Typography>Дата: {dayjs(el.createdAt).format('YYYY.MM.DD')} </Typography>
                    <Box>
                        {el.products.map((product: Product)=>{
                            const count = JSON.parse(el.counts).find((item: Record<string, number>, i: number)=> product.id === item.id ).count
                            return (
                            <Box sx={{borderBottom: 1, marginBottom:1}} key={product.id}>
                                <Typography>{product.title}</Typography>
                                <Typography>
                                    Кол-во: {count}
                                </Typography>
                                <Typography>
                                    Цена: {product.price} руб./{product.weigth} г. ({product.price && product.price*count} руб./{product.weigth && product.weigth*count} г.)
                                </Typography>
                            </Box>
                        )})}
                        
                        
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <Typography>
                            Статус: {el.status}.
                        </Typography>
                        <Typography>
                            Итог: {el.sum} руб.
                        </Typography>
                    </Box>
                    
                </Paper>
            )}
    </Box>
  )
}
