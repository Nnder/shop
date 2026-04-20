"use client"
import { user } from "@/src/5_entities/user/user.types";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { Box, Button, Typography, Paper, Divider } from "@mui/material";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { checkPassword } from "./checkPassword";
import { useState } from "react";
import Link from "next/link";

export default function FormRegister() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<user & { secondPassword: string }>({
        mode: 'onChange'
    })

    const [validation, setValidation] = useState({ password: "", secondPassword: "" })

    const onSubmit: SubmitHandler<user & { secondPassword: string }> = async (data) => {
        if (!checkPassword(validation)) {
            return;
        }

        const response = await signIn('credentials',
            {
                redirect: false,
                username: data.email,
                new: "1",
                ...data,
            }
        )

        if (response?.error) {
            toast.error('Ошибка при регистрации')
        }
    }

    return (
        <Paper elevation={0} sx={{
            p: { xs: 3, sm: 4 },
            width: '100%',
            maxWidth: '400px',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-md)'
        }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Регистрация</Typography>
                <Typography variant="body2" color="text.secondary">Создайте аккаунт для заказа продукции</Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormInput 
                        {...register('email', { required: true })} 
                        type='email' 
                        placeholder="Электронная почта" 
                    />

                    <FormInput 
                        {...register('password', { required: true })} 
                        onChange={(e) => setValidation({ ...validation, password: e.target.value })}
                        type='password' 
                        placeholder="Пароль" 
                    />

                    <FormInput 
                        {...register('secondPassword', { required: true })} 
                        onChange={(e) => setValidation({ ...validation, secondPassword: e.target.value })}
                        type='password' 
                        placeholder="Повторите пароль" 
                    />

                    <Button 
                        type='submit' 
                        variant="contained" 
                        fullWidth 
                        disabled={isSubmitting}
                        sx={{ 
                            mt: 4, 
                            py: 1.5, 
                            bgcolor: 'var(--primary)',
                            fontSize: '1rem'
                        }}
                    >
                        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
                    </Button>
                </Box>
            </form>

            <Divider sx={{ my: 4 }}>или</Divider>

            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 2 }}>Уже есть аккаунт?</Typography>
                <Link href="/signin" passHref style={{ width: '100%' }}>
                    <Button 
                        variant="outlined" 
                        fullWidth 
                        sx={{ 
                            py: 1.5, 
                            borderColor: 'var(--primary)', 
                            color: 'var(--primary)',
                            '&:hover': { borderColor: 'var(--accent)', color: 'var(--accent)' }
                        }}
                    >
                        Войти в аккаунт
                    </Button>
                </Link>
            </Box>
        </Paper>
    );
}
