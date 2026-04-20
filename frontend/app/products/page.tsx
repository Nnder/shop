import CardList from "@/src/3_widget/CardList/CardList";
import { Box, Container, Typography } from "@mui/material";

export default function Products() {
  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: 6 }}>
      <Container>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>Наша продукция</Typography>
          <Typography variant="h6" sx={{ color: 'var(--text-muted)', fontWeight: 400, maxWidth: '600px', mx: 'auto' }}>
            Свежее мясо, деликатесы и полуфабрикаты высшего качества с доставкой до вашей двери.
          </Typography>
          <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto', mt: 3 }} />
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardList/>
        </Box>
      </Container>
    </Box>
  );
}
