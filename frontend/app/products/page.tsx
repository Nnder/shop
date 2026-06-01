import CardList from "@/src/3_widget/CardList/CardList";
import { Box, Container, Typography } from "@mui/material";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/src/6_shared/api/getQueryClient";
import { restClient } from "@/src/6_shared/api/api.fetch";
import { Product } from "@/src/5_entities/product/product.types";

export const dynamic = 'force-dynamic';

export default async function Products() {
  const queryClient = getQueryClient();

  // Prefetch the default (empty-search) product list so it is rendered server-side.
  // Key must match GetProducts(debouncedFind="") in CardList for hydration to hit.
  await queryClient.prefetchQuery({
    queryKey: ['products', ''],
    queryFn: () => restClient.get<{ data: Product[] }>(
      `/products?populate=*&filters[title][$contains]=`, false, {
        'Content-Type': 'application/json'
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: 6 }}>
      <Container>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>Наша продукция</Typography>
          <Typography variant="h6" sx={{ color: 'var(--text-muted)', fontWeight: 400, maxWidth: '600px', mx: 'auto' }}>
            Свежее мясо и колбасные изделия собственного производства. Оптовые и розничные поставки по выгодным ценам.
          </Typography>
          <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto', mt: 3 }} />
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardList/>
        </Box>
      </Container>
    </Box>
    </HydrationBoundary>
  );
}
