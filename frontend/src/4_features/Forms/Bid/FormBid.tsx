"use client"
import { Bid, useBidStore } from "@/src/5_entities/bid/bid";
import { user } from "@/src/5_entities/user/user.types";
import { restClient } from "@/src/6_shared/api/api.fetch";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { FormTextarea } from "@/src/6_shared/ui/Textarea/Textarea";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function FormBid() {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const {clear} = useBidStore()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit, } = useForm<Bid>({
        mode: 'onChange'
    })



    const {data} = useSession()
    const {products, productCount} = useBidStore()

    
    const onSubmit:SubmitHandler<Bid> = async (userData)=>{

        const bid= {
            status: "new",
            products: [...products.map((el)=>el.id)],
            users_permissions_user: data?.user?.email,
            counts: JSON.stringify([...productCount])
        }
           
        const res = await restClient.post(`/bids`, {data:{...bid, ...userData}}, false, {})

        

        // if (res?.error) {
        //     console.log(res.status);
        // }


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
