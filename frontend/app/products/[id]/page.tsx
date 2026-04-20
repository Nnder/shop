"use client"
import ProductInfo from "@/src/4_features/ProductInfo/ProductInfo";
import { GetProduct } from "@/src/5_entities/product/product";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function ProductElement({ params }: { params: { id: number } }) {
    const { data, isLoading } = GetProduct(params.id)

    return (
        <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: { xs: 2, md: 4 } }}>
            <Container>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 2, md: 6 }, 
                        borderRadius: 'var(--border-radius-lg)',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--shadow-md)'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: "400px",
                        justifyContent: isLoading ? 'center' : 'flex-start',
                        alignItems: isLoading ? 'center' : 'stretch',
                    }}> 
                        {isLoading ? (
                            <Loader />
                        ) : data?.data.title ? (
                            <ProductInfo data={data.data} />
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 10 }}>
                                <Typography variant="h4">Товар не найден</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
