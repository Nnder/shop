"use client"
import { user } from "@/src/5_entities/user/user.types";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { Box } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
export default function FormRegister() {

    const {register, handleSubmit, } = useForm<user>({
        mode: 'onChange'
    })

    const {data} = useSession()
    const onSubmit:SubmitHandler<user> = async (data)=>{

        const response = await signIn(
            'credentials',
            {
                redirect: false,
                username: data.email,
                new: "1",
                ...data,
            }
        )

        console.log(data)

        if (response?.error) {
            console.log(response);
        }
    }

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: [200, 250, 350]
    }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Box sx={{m: 1}}>
                <FormInput {...register('email', {required: true,})} type='email' placeholder="Почта"/>
            </Box>

            <Box sx={{m: 1}}>
                <FormInput {...register('password', {required: true,})} type='password' placeholder="Пароль"/>
            </Box>

            <Box sx={{m: 1}}>
                <FormInput type='password' placeholder="Пароль"/>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                m: 1}}>
                    <Button type='submit' sx={{width: ['80%']}}>Регистрация</Button>
            </Box>
        </form>
    </Box>
  );
}





