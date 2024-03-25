'use client'
import Button from "@/src/6_shared/ui/Buttons/Button";
import Input from "@/src/6_shared/ui/Inputs/Input";
import PasswrodInput from "@/src/6_shared/ui/Inputs/Password/PasswrodInput";
import { Box} from "@mui/material";
import { Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {SubmitHandler, useForm} from 'react-hook-form';

interface user {
    username?: string
    email: string
    password: string
    new?: string
}

export default function FormAuth() {
    const router = useRouter()

    const {register, handleSubmit, } = useForm<user>({
        mode: 'onChange'
    })

    const {data} = useSession()

    const onSubmit:SubmitHandler<user> = async (data)=>{

        const response = await signIn(
            'credentials',
            {
                redirect: false,
                ...data,
            }
        )

        if (response?.error) {
            console.log("error");
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{m: 1}}>
                <input {...register('email', {required: true,})} type='email'/>
                {/* <Input {...register('email', {required: true,})} icon={<Mail/>} type='email' onChange={(e)=>console.log(e.target.value)}/> */}
            </Box>

            <Box sx={{m: 1}}>
                <input {...register('password', {required: true,})} type='password'/>
                {/* <PasswrodInput {...register('password', {required: true,})} type='password' onChange={(e)=>console.log(e.target.value)}/> */}
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                m: 1}}>
                <Button type='submit' sx={{width: ['80%']}}>Вход</Button>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                m: 1}}>
                    <Button href="/signup" sx={{width: ['80%']}}>Регистрация</Button>
            </Box>
        </form>
    </Box>
  );
}





