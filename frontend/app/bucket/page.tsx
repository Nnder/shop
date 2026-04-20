'use client'
import BidList from "@/src/3_widget/BidList/BidList";
import BucketList from "@/src/3_widget/BucketList/BucketList";
import { GetBidsByEmail, useBidStore } from "@/src/5_entities/bid/bid";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import { Box, Container, Paper, Typography, Divider } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Bucket() {
    const { products } = useBidStore()
    const session = useSession()
    const { isLoading, data } = GetBidsByEmail(session.data?.user?.email || "")

    return (
        <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: 6 }}>
            <Container>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>Корзина</Typography>
                    <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto' }} />
                </Box>

                <Paper elevation={0} sx={{ 
                    p: { xs: 2, md: 4 }, 
                    borderRadius: 'var(--border-radius-lg)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-md)',
                    mb: 6
                }}>
                    <BucketList products={products}/>
                </Paper>

                {session.status === "authenticated" && (
                    <Box sx={{ mt: 8 }}>
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>История заказов</Typography>
                            <Box sx={{ width: '40px', height: '3px', bgcolor: 'var(--accent)', mx: 'auto' }} />
                        </Box>
                        
                        <Paper elevation={0} sx={{ 
                            p: { xs: 2, md: 4 }, 
                            borderRadius: 'var(--border-radius-lg)',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            {isLoading ? <Loader/> : <BidList data={data?.data}/>}
                        </Paper>
                    </Box> 
                )}
            </Container>
        </Box>
    )
}
