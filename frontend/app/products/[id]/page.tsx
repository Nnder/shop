import ProductInfo from "@/src/4_features/ProductInfo/ProductInfo";
import { restClient } from "@/src/6_shared/api/api.fetch";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Product } from "@/src/5_entities/product/product.types";

export const dynamic = 'force-dynamic';

export default async function ProductElement({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    try {
        const response = await restClient.get<{data: Product}>(
            `/products/${id}?populate=*`, false, {
                'Content-Type': 'application/json'
            }
        );

        const product = response?.data;

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
                        {product?.title ? (
                            <ProductInfo data={product} />
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 10 }}>
                                <Typography variant="h4">Товар не найден</Typography>
                            </Box>
                        )}
                    </Paper>
                </Container>
            </Box>
        );
    } catch (error) {
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
                        <Box sx={{ textAlign: 'center', py: 10 }}>
                            <Typography variant="h4">Ошибка загрузки товара</Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        );
    }
}
