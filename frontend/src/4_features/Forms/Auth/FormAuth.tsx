'use client'
import { user } from "@/src/5_entities/user/user.types";
import { FormInput } from "@/src/6_shared/ui/Inputs/FormInput/FormInput";
import { Box, Button, Typography, Paper, Divider } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from "next/link";

export default function FormAuth() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<user>({
        mode: 'onChange'
    })
    
    const onSubmit: SubmitHandler<user> = async (data) => {
        const response = await signIn(
            'credentials',
            {
                redirect: false,
                ...data,
            }
        )

        if (response?.error) {
            console.log(response.status);
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
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Вход</Typography>
                <Typography variant="body2" color="text.secondary">Добро пожаловать в Мясную Лавку</Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormInput 
                        {...register('email', { required: true })} 
                        type='email' 
                        placeholder="Электронная почта" 
                        defaultValue="test@test.com"
                    />
                    
                    <FormInput 
                        {...register('password', { required: true })} 
                        type='password' 
                        placeholder="Пароль" 
                        defaultValue="test@test.com"
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
                        {isSubmitting ? "Вход..." : "Войти"}
                    </Button>
                </Box>
            </form>

            <Divider sx={{ my: 4 }}>или</Divider>

            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 2 }}>Нет аккаунта?</Typography>
                <Link href="/signup" passHref style={{ width: '100%' }}>
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
                        Зарегистрироваться
                    </Button>
                </Link>
            </Box>
        </Paper>
    );
}
