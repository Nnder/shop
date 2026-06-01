import { Box, Container, Typography, Divider, Paper } from '@mui/material';

export default function PublicOfferPage() {
  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, textAlign: 'center', color: 'var(--text-primary)' }}>
            Публичная оферта
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontWeight: 700 }}>
            Внимательно ознакомьтесь с текстом данной публичной оферты. Если вы не согласны с каким-либо пунктом, мы предлагаем вам отказаться от покупки товаров в нашем магазине.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            1. Предмет договора
          </Typography>
          <Typography variant="body1" paragraph>
            Продавец («УПК МЯСО») осуществляет продажу мясной продукции через интернет-сайт. Покупатель оплачивает и принимает товар в соответствии с условиями настоящей Оферты.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            2. Оформление заказа
          </Typography>
          <Typography variant="body1" paragraph>
            Заказ оформляется Покупателем самостоятельно через корзину на сайте. После оформления менеджер связывается с Покупателем по указанному номеру телефона для подтверждения. Заказ считается принятым только после телефонного подтверждения.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            3. Цена и оплата
          </Typography>
          <Typography variant="body1" paragraph>
            Цены на сайте указаны в рублях. Оплата производится наличными или банковской картой курьеру при получении товара (если иное не согласовано при подтверждении заказа).
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            4. Доставка
          </Typography>
          <Typography variant="body1" paragraph>
            Доставка осуществляется в черте города Нижний Тагил. Сроки и стоимость доставки зависят от района и уточняются менеджером. Продавец обязуется соблюдать температурный режим при транспортировке мясной продукции.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            5. Возврат товара
          </Typography>
          <Typography variant="body1" paragraph>
            Согласно Постановлению Правительства РФ от 31.12.2020 № 2463, продовольственные товары надлежащего качества возврату и обмену не подлежат. В случае обнаружения некачественного товара (порча, несоответствие весу), Покупатель вправе потребовать замену или возврат денег в момент приемки товара у курьера.
          </Typography>

          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            Реквизиты продавца указаны в разделе «Контакты».
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
