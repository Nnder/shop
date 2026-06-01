import { Box, Container, Typography, Divider } from '@mui/material';

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, textAlign: 'center', color: 'var(--text-primary)' }}>
            Политика конфиденциальности
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 4, color: 'var(--text-muted)' }}>
            Редакция от 25 мая 2026 г.
          </Typography>

          <Typography variant="body1" paragraph>
            Настоящая Политика конфиденциальности действует в отношении всей информации, которую сайт мясной лавки «УПК МЯСО» (далее — Магазин), расположенный на домене [ваш-домен.рф], может получить о Пользователе во время использования сайта, программ и продуктов Магазина.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            1. Определения терминов
          </Typography>
          <Typography variant="body1" paragraph>
            В настоящей Политике конфиденциальности используются следующие термины:
            <ul>
              <li><strong>«Администрация сайта»</strong> – уполномоченные сотрудники на управление сайтом, которые организуют и осуществляют обработку персональных данных.</li>
              <li><strong>«Персональные данные»</strong> — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            2. Какую информацию мы собираем
          </Typography>
          <Typography variant="body1" paragraph>
            Мы собираем данные, необходимые для выполнения ваших заказов и обеспечения работы личного кабинета:
            <ul>
              <li><strong>Данные при регистрации:</strong> Email (используется как логин) и пароль.</li>
              <li><strong>Данные при заказе (Заявка):</strong> ФИО, номер телефона, адрес электронной почты, адрес доставки (если указан в комментарии) и текст комментария.</li>
              <li><strong>Технические данные:</strong> Файлы cookie (технические, функциональные и статистические), IP-адрес, данные о браузере.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            3. Цели сбора информации
          </Typography>
          <Typography variant="body1" paragraph>
            Ваши данные используются исключительно для:
            <ul>
              <li>Идентификации Пользователя для оформления заказа.</li>
              <li>Уведомления Пользователя о состоянии заказа по электронной почте.</li>
              <li>Предоставления доступа к истории заказов в личном кабинете.</li>
              <li>Связи с Пользователем (менеджером Магазина) для уточнения деталей доставки в Нижнем Тагиле.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            4. Передача данных третьим лицам
          </Typography>
          <Typography variant="body1" paragraph>
            Магазин не передает ваши данные сторонним организациям, за исключением случаев, необходимых для работы сервиса:
            <ul>
              <li><strong>Yandex:</strong> Для авторизации (Yandex ID), отображения карт и отправки системных уведомлений через SMTP Yandex.</li>
              <li><strong>Google:</strong> Для авторизации через Google Account.</li>
              <li><strong>Правоохранительные органы:</strong> Только по официальному запросу в соответствии с законодательством РФ.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            5. Хранение и защита
          </Typography>
          <Typography variant="body1" paragraph>
            Данные хранятся в защищенной базе данных CMS Strapi. Мы используем современные методы шифрования (SSL) для защиты передаваемой информации. Пароли хранятся в зашифрованном виде (хэш) и недоступны Администрации сайта.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            6. Права пользователя
          </Typography>
          <Typography variant="body1" paragraph>
            Вы имеете право в любой момент запросить удаление своего аккаунта или изменение персональных данных, написав нам на электронную почту, указанную в контактах. Также вы можете отозвать согласие на использование cookie через настройки баннера внизу страницы.
          </Typography>

          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
            Продолжая использовать сайт, вы соглашаетесь с условиями данной Политики.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
import { Paper } from '@mui/material';
