"use client"
import {useBidStore } from "@/src/5_entities/bid/bid";
import { Bid } from "@/src/5_entities/bid/bid.types";
import { UpdateProduct } from "@/src/5_entities/product/product";
import { restClient } from "@/src/6_shared/api/api.fetch";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { FormTextarea } from "@/src/6_shared/ui/Textarea/Textarea";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FormBid() {
    const {data: sessionData, status} = useSession()
    const {count, sum, products, productCount, getProductCount, clear, checkProductCount} = useBidStore()
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Bid & {email?: string}>({
        mode: 'onChange'
    })

    const handleClickOpen = () => {
        if(count > 0) {
            setOpen(true)
        } else {
            toast('Добавьте товар в корзину')
        }
    }

    const handleClose = () => {
        setOpen(false)
        setIsSubmitting(false)
        reset()
    }

    const onSubmit: SubmitHandler<Bid & {email?: string}> = async (formData) => {
        setIsSubmitting(true)
        try {
            let userEmail = sessionData?.user?.email

            // 1. If not authenticated, register the user first
            if (status !== "authenticated") {
                if (!formData.email) {
                    toast.error("Email обязателен")
                    setIsSubmitting(false)
                    return
                }

                const regResponse = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email }),
                })

                if (!regResponse.ok) {
                    const errorData = await regResponse.json()
                    // If user already exists, we might want to just proceed or ask for login
                    // But for now, let's assume registration is needed or handle "already exists"
                    if (errorData.error?.includes("already taken") || errorData.error?.includes("exists")) {
                         userEmail = formData.email
                    } else {
                        toast.error(errorData.error || 'Ошибка при регистрации')
                        setIsSubmitting(false)
                        return
                    }
                } else {
                    const regResult = await regResponse.json()
                    userEmail = formData.email

                    // Auto-authenticate
                    await signIn('credentials', {
                        redirect: false,
                        email: formData.email,
                        password: regResult.password,
                    })

                    toast.success('Регистрация успешна! Пароль отправлен на почту')
                }
            }

            // 2. Check product availability
            const NotEnough = await checkProductCount()
            if (NotEnough.length) {
                NotEnough.forEach((product) => {
                    toast(`Количество товара: ${product.title} недостаточно. Всего ${product.count} товара`)
                })
                setIsSubmitting(false)
                return
            }

            // 3. Update product counts in Strapi
            for (const product of products) {
                const countInBid = getProductCount(product) || 0
                await UpdateProduct(product, { count: product?.count ? product?.count - countInBid : 0 })
            }

            // 4. Create the bid
            const bidData = {
                status: "Новая",
                products: products.map((el) => el.id),
                counts: JSON.stringify(productCount),
                sum: sum,
                users_permissions_user: userEmail,
                fio: formData.fio,
                phone: formData.phone,
                message: formData.message || ""
            }

            const createdBid: { data: Bid } = await restClient.post(`/bids`, { data: bidData }, true)

            if (createdBid?.data?.id) {
                // 5. Send order confirmation email
                await fetch('/api/orders/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: userEmail,
                        orderData: createdBid.data,
                        products: products,
                        productCount: productCount,
                    }),
                })

                toast.success("Заявка успешно создана")
                clear()
                await queryClient.refetchQueries()
                handleClose()
            }
        } catch (e) {
            console.error(e)
            toast.error("Ошибка при создании заявки")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Button sx={{ width: { xs: 1, sm: 'inherit' } }} onClick={handleClickOpen}>Оформить заказ</Button>

            <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Оформление заказа</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: 2 }}>
                            {status === "authenticated" 
                                ? "Проверьте ваши данные и подтвердите заказ" 
                                : "Для оформления заказа укажите ваши контактные данные. Если вы не зарегистрированы, аккаунт будет создан автоматически."}
                        </DialogContentText>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {status !== "authenticated" && (
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    {...register('email', { required: 'Email обязателен' })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                            <FormInput 
                                placeholder="ФИО" 
                                {...register('fio', { required: 'ФИО обязательно' })}
                                error={!!errors.fio}
                            />
                            <FormInput 
                                placeholder="Телефон" 
                                {...register('phone', { required: 'Телефон обязателен' })}
                                error={!!errors.phone}
                            />
                            <FormTextarea 
                                placeholder="Комментарий к заказу (необязательно)" 
                                {...register('message')}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} disabled={isSubmitting}>Отмена</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}