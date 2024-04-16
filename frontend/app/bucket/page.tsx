'use client'
import BidList from "@/src/3_widget/BidList/BidList";
import BucketList from "@/src/3_widget/BucketList/BucketList";
import { GetBidsByEmail, useBidStore } from "@/src/5_entities/bid/bid";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";


export default function Bucket() {

    const {products, removeProduct} = useBidStore()
    const session = useSession()
    const {isLoading, data} = GetBidsByEmail(session.data?.user?.email || "")
  return (
    <Container sx={{
        pt: 8
       }}>
        <Paper elevation={16} sx={{p: [1,2]}}>
            <Typography textAlign={'center'} variant="h4">
                Корзина
            </Typography>

            <BucketList products={products}/>

            {session.status === "authenticated" && (
                <Box>
                    <Typography textAlign={'center'} variant="h4">
                        Прошлые заказы
                    </Typography>
                    <Box>
                        {isLoading ? <Loader/> : <BidList data={data?.data}/>}
                    </Box>
                </Box> 
            )}
        </Paper>
    </Container>
  )
}
