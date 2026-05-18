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
    const {data, ...session} = useSession()
    const {count, sum, products, productCount, getProductCount, clear, checkProductCount} = useBidStore()
    const [open, setOpen] = useState(false);
    const [guestOpen, setGuestOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const queryClient = useQueryClient()

    const {register, handleSubmit, formState: {errors}} = useForm<Bid>({
        mode: 'onChange'
    })

    const {register: registerGuest, handleSubmit: handleSubmitGuest, formState: {errors: guestErrors}} = useForm<{
        email: string;
    }>({
        mode: 'onChange'
    })

    const handleClickOpen = () => {
        if(count>0) {
            if(session.status === "authenticated") {
                setOpen(true)
            } else {
                setGuestOpen(true)
            }
        } else {
            toast('Добавьте товар в корзину')
        }
    }

    const handleClose = () => {
        setOpen(false)
        setGuestOpen(false)
    }

    const handleGuestRegister: SubmitHandler<{email: string}> = async (guestData) => {
        setIsRegistering(true)
        try {
            // Register user with auto-generated password
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: guestData.email }),
            })

            if (!response.ok) {
                toast.error('Ошибка при регистрации')
                setIsRegistering(false)
                return
            }

            const result = await response.json()

            if (result.success) {
                // Auto-authenticate the user
                const authResponse = await signIn('credentials', {
                    redirect: false,
                    email: guestData.email,
                    password: result.password, // We need to return the password from the API
                })

                if (authResponse?.error) {
                    toast.error('Ошибка при автоматическом входе')
                } else {
                    toast.success('Регистрация успешна! Пароль отправлен на вашу почту')
                    setGuestOpen(false)
                    setOpen(true)
                }
            } else {
                toast.error(result.error || 'Ошибка при регистрации')
            }
        } catch (error) {
            toast.error('Ошибка при регистрации')
        } finally {
            setIsRegistering(false)
        }
    }

    const onSubmit:SubmitHandler<Bid> = async (userData)=>{
        const bid= {
            status: "Новая",
            products: [...products.map((el)=>el.id)],
            counts: JSON.stringify([...productCount]),
            sum: sum,
            users_permissions_user: data?.user?.email
        }

        try {
            products.forEach( async (product)=> {
                const count = await getProductCount(product) || 0
                const NotEnough = await checkProductCount()
                if(NotEnough.length){
                    NotEnough.forEach((product)=>{
                        toast(`Количество товара: ${product.title} недостаточно. Всего ${product.count} товара`)
                    })

                    throw new Error("Количество товара недостаточно")
                } else {
                    await UpdateProduct(product, {count: product?.count ? product?.count-count : 0})
                }

            })
            const createdBid : {data: Bid}  = await restClient.post(`/bids`, {data: {...bid, ...userData} }, true)

            if (createdBid?.data?.id) {
                // Send order confirmation email
                await fetch('/api/orders/confirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: data?.user?.email,
                        orderData: createdBid.data,
                        products: products,
                        productCount: productCount,
                    }),
                })

                toast("Заявка создана")
                clear()
                await queryClient.refetchQueries()
                handleClose()
            }
        } catch(e){
            toast("Ошибка при создании заявки")
        }
    }

  return (
    <>
        <Button sx={{width: {xs: 1, sm: 'inherit'}}} onClick={handleClickOpen}>Создать заявку</Button>

        {/* Guest Registration Dialog */}
        <Dialog onClose={handleClose} open={guestOpen} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmitGuest(handleGuestRegister)}>
                <DialogTitle>Регистрация для заказа</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{mb: 2}}>
                        Для оформления заказа необходимо зарегистрироваться. Введите ваш email - пароль будет автоматически сгенерирован и отправлен на почту.
                    </DialogContentText>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            {...registerGuest('email', {required: 'Email обязателен'})}
                            error={!!guestErrors.email}
                            helperText={guestErrors.email?.message}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={isRegistering}>Отмена</Button>
                    <Button type="submit" variant="contained" disabled={isRegistering}>
                        {isRegistering ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

        {/* Order Dialog */}
        <Dialog onClose={handleClose} open={open}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Создание заявки</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        В ближайшее время с вами свяжутся для уточнения информации
                    </DialogContentText>
                    <Box sx={{mt: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
                        <FormInput placeholder="Фио" {...register('fio', {required: true})}/>
                        <FormInput placeholder="Телефон" {...register('phone', {required: true})}/>
                        <FormTextarea placeholder="Сообщение" {...register('message', {required: false})}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button type="submit" onClick={handleClose}>Отправить</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
  )
}