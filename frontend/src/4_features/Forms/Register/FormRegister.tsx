"use client"
import { user } from "@/src/5_entities/user/user.types";
import Button from "@/src/6_shared/ui/Buttons/Button";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { Box } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { checkPassword } from "./checkPassword";
import { useState } from "react";
export default function FormRegister() {
    const {data} = useSession()
    const {register, handleSubmit, } = useForm<user & {secondPassword: string}>({
        mode: 'onChange'
    })

    const [validation, setValidation] = useState({password: "", secondPassword: ""})

    // const debouncedValidation = useDebounce(validation)
    // useEffect(()=>{
    //     checkPassword(debouncedValidation)
    // }, [debouncedValidation])

    const onSubmit:SubmitHandler<user & {secondPassword: string}> = async (data)=>{
        const response = await signIn('credentials',
            {
                redirect: false,
                username: data.email,
                new: "1",
                ...data,
            }
        )

        if (response?.error) {
            toast('Ошибка при регистрации')
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
                <FormInput {...register('password', {required: true,})} 
                onChange={(e)=>setValidation({password: e.target.value, secondPassword: validation.secondPassword})} 
                type='password' placeholder="Пароль"/>
            </Box>

            <Box sx={{m: 1}}>
                <FormInput {...register('secondPassword', {required: true,})} 
                onChange={(e)=>setValidation({password: validation.password, secondPassword: e.target.value})} 
                type='password' placeholder="Повторите пароль"/>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                m: 1}}>
                    <Button type='submit' sx={{width: ['80%']}} onClick={(e)=>{
                        if(!checkPassword(validation))
                            e.preventDefault()
                    }}>Регистрация</Button>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                m: 1}}>
                    <Button sx={{width: ['80%']}} href={'/signin'}>Вход</Button>
            </Box>
        </form>
    </Box>
  );
}





