"use client"
import {useBidStore } from "@/src/5_entities/bid/bid";
import { Bid } from "@/src/5_entities/bid/bid.types";
import { GetProduct, UpdateProduct } from "@/src/5_entities/product/product";
import { restClient } from "@/src/6_shared/api/api.fetch";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { FormTextarea } from "@/src/6_shared/ui/Textarea/Textarea";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FormBid() {
    const {data, ...session} = useSession()
    const {count, sum, products, productCount, getProductCount, clear, checkProductCount} = useBidStore()
    const [open, setOpen] = useState(false);
    
    
    const handleClickOpen = () => {
        if(session.status === "unauthenticated")
            toast("Пользователь не авторизован")
        else {
            if(count>0)
                setOpen(true)
            else
                toast('Добавьте товар в корзину')
        }
    }

    const handleClose = () => setOpen(false)
    const {register, handleSubmit, } = useForm<Bid>({
        mode: 'onChange'
    })

    // users_permissions_user: [data?.user?.id],

    const onSubmit:SubmitHandler<Bid> = async (userData)=>{
        const bid= {
            status: "new",
            products: [...products.map((el)=>el.id)],
            counts: JSON.stringify([...productCount]),
            sum: sum
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

            const createdBid : {data: Bid}  = await restClient.post(`/bids`, {data:{...bid, ...userData}}, true, {})

            if (createdBid?.data?.id) {
                // @ts-ignore
                const updatedUser  = await restClient.put(`/users/${data?.user?.id}`, { data: { 
                    // Добавление созданной заявки к списку bids пользователя
                    // @ts-ignore
                    bids: [...(data?.user?.bids || []), createdBid.data.id] 
                } }, true, {})
                console.log(updatedUser)
                toast("Заявка создана")
                clear()
            } 
        } catch(e){
            toast("Ошибка при создании заявки")
        }
    }
    
  return (
    <>
        <Button sx={{width: {xs: 1, sm: 'inherit'}}} onClick={handleClickOpen}>Создать заявку</Button>
        <Dialog onClose={handleClose} open={open}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Создание заявки</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        В ближайшее время с вами свяжутся для уточнения информации
                    </DialogContentText>
                    <Box>
                        <FormInput placeholder="Фио" {...register('fio', {required: true,})}/>
                        <FormInput placeholder="Телефон" {...register('phone', {required: true,})}/>
                        <FormTextarea placeholder="Сообщение" {...register('message', {required: false,})}/>
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