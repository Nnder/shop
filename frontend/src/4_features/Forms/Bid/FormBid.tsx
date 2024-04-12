"use client"
import { Bid, useBidStore } from "@/src/5_entities/bid/bid";
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
    const {data} = useSession()
    const {clear, products, productCount} = useBidStore()
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const {register, handleSubmit, } = useForm<Bid>({
        mode: 'onChange'
    })

    const onSubmit:SubmitHandler<Bid> = async (userData)=>{
        const bid= {
            status: "new",
            products: [...products.map((el)=>el.id)],
            users_permissions_user: data?.user?.email,
            counts: JSON.stringify([...productCount])
        }
           
        const createdBid : {data: Bid}  = await restClient.post(`/bids`, {data:{...bid, ...userData}}, false, {})

        if (createdBid?.data?.id) {
            toast("Заявка создана")
            clear()
        } else {
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