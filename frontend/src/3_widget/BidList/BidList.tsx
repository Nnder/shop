import { Bid } from "@/src/5_entities/bid/bid.types";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { PropsWithChildren } from "react";

export default function BidList({data, ...props}: PropsWithChildren<{data:any}>) {
  return (
    <Box sx={{marginTop: 2}}>
        {data.map((el: Bid, i: number)=><Box key={i}>
            <Box>

            </Box>
            <Typography>Дата: {dayjs(el.createdAt).format('YYYY.MM.DD')} </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <Typography>
                    Статус: {el.status}.
                </Typography>
                <Typography>
                    Итог: {el.sum} руб.
                </Typography>
            </Box>
            
            </Box>)}
    </Box>
  )
}
