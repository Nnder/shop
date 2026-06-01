import { Bid } from "@/src/5_entities/bid/bid.types";
import { Product } from "@/src/5_entities/product/product.types";
import { Paper, Typography, Box, Divider, Chip, Grid } from "@mui/material";
import dayjs from "dayjs";
import { PropsWithChildren } from "react";
import { restClient } from "@/src/6_shared/api/api.fetch";
import { Clock, Package, CheckCircle2, AlertCircle, Weight } from "lucide-react";
import Link from "next/link";

export default function BidList({data, ...props}: PropsWithChildren<{data:any}>) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Оплачено': return 'success';
      case 'Новая': return 'warning';
      case 'Закрыта': return 'default';
      default: return 'primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Оплачено': return <CheckCircle2 size={16} />;
      case 'Новая': return <Clock size={16} />;
      case 'Закрыта': return <AlertCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {data?.map((el: Bid & {counts: any}, i: number) => {
            let totalOrderWeight = 0;

            return (
                <Paper 
                    key={el.id || i} 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 2, sm: 3 }, 
                        borderRadius: 'var(--border-radius-lg)',
                        border: '1px solid var(--border-color)',
                        bgcolor: '#fff',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            boxShadow: 'var(--shadow-md)',
                            borderColor: 'var(--accent-light)'
                        }
                    }}
                >
                    {/* Header: Status and Date */}
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between', 
                        alignItems: { xs: 'flex-start', sm: 'center' }, 
                        mb: { xs: 1.5, sm: 2 } 
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: { xs: 1, sm: 0 } }}>
                            <Chip 
                                icon={getStatusIcon(el.status)}
                                label={el.status} 
                                color={getStatusColor(el.status) as any}
                                size="small"
                                sx={{ fontWeight: 600, borderRadius: '6px' }}
                            />
                            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                Заказ #{el.id} от {dayjs(el.createdAt).format('DD.MM.YYYY HH:mm')}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--accent)', lineHeight: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                                {el.sum} ₽
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: { xs: 1.5, sm: 2 }, borderStyle: 'dashed' }} />

                    {/* Products List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                            {el.products.map((product: Product) => {
                                let count = 0;
                                try {
                                    const countsArray = typeof el.counts === 'string' ? JSON.parse(el.counts) : el.counts;
                                    const countObj = Array.isArray(countsArray) ? countsArray.find((item: any) => product.id === item.id) : null;
                                    count = countObj?.count || 0;

                                    if (product.weigth) {
                                        totalOrderWeight += product.weigth * count;
                                    }
                                } catch (e) {
                                    console.error('Error parsing counts for bid:', el.id, e);
                                }

                                return (
                                    <Box 
                                        key={product.id} 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: { xs: 1, sm: 2 },
                                            p: { xs: 1, sm: 1.5 },
                                            borderRadius: '12px',
                                            bgcolor: 'var(--bg-cream)',
                                            border: '1px solid transparent',
                                            '&:hover': { bgcolor: '#fff', borderColor: 'var(--border-color)' }
                                        }}
                                    >
                                        {/* Mini Thumbnail */}
                                        <Link href={`/products/${product.id}`} passHref>
                                            <Box sx={{ 
                                                width: { xs: 50, sm: 60 }, 
                                                height: { xs: 50, sm: 60 }, 
                                                borderRadius: '8px', 
                                                overflow: 'hidden', 
                                                flexShrink: 0,
                                                bgcolor: '#fff',
                                                border: '1px solid var(--border-color)',
                                                cursor: 'pointer'
                                            }}>
                                                {product.images?.[0]?.url ? (
                                                    <Box 
                                                        component="img" 
                                                        src={restClient.getMediaUrl(product.images[0].url)} 
                                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                                                        <Package size={20} />
                                                    </Box>
                                                )}
                                            </Box>
                                        </Link>

                                        {/* Info */}
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Link href={`/products/${product.id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant="subtitle2" sx={{ 
                                                    fontWeight: 700, 
                                                    lineHeight: 1.2,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'pointer',
                                                    '&:hover': { color: 'var(--accent)' },
                                                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                                }}>
                                                    {product.title}
                                                </Typography>
                                            </Link>
                                            <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', mt: { xs: 0.25, sm: 0.5 }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                                {product.price} ₽ × {count} шт.
                                            </Typography>
                                        </Box>

                                        {/* Price for this position */}
                                        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                                {(product.price || 0) * count} ₽
                                            </Typography>
                                            {product.weigth && (
                                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                                    Итого: {(product.weigth || 0) * count} г.
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>

                        {/* Order Total Weight Footer */}
                        {totalOrderWeight > 0 && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: 1.5, sm: 2 }, pt: { xs: 0.75, sm: 1 }, borderTop: '1px solid var(--border-color)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--text-muted)' }}>
                                    <Weight size={16} />
                                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                        Общий вес заказа: {totalOrderWeight >= 1000 ? `${(totalOrderWeight / 1000).toFixed(2)} кг.` : `${totalOrderWeight} г.`}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>            );
        })}
    </Box>
  );
}
