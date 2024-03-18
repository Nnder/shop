"use client"
import { useTheme } from "@emotion/react";
import {Typography, Button} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react"

export default function SignButton() {
    const theme = useTheme()
    const sessin = useSession()
    const user = sessin.data?.user;
  
  
    return (
        <>
        {sessin.status !== 'authenticated' ? 
        (<Link href={'api/auth/signin'} passHref>
            <Button >
                <Typography sx={{
                    color: (theme)=>`${theme.palette.secondary.main}`
                }}>Вход</Typography>
            </Button>
        </Link>) : (
        <Button onClick={()=> signOut()}>
            <Typography sx={{
                color: (theme)=>`${theme.palette.secondary.main}`
            }}>Выход</Typography>
        </Button>
        )}
        </>
    );
  }
  

