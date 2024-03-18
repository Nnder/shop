"use client"
import { useTheme } from "@emotion/react";
import {Button} from "@mui/material";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { usePathname } from 'next/navigation'

interface ISignButton{
    href: string
    active?: boolean
    sx?: Record<string, any>
}

export default function ButtonLink({children, href, sx, active, ...props}: PropsWithChildren<ISignButton>) {
    const theme = useTheme()
    const pathname = usePathname()

    if(!active) active = pathname === href

    return (
        <Link href={href} passHref>
            <Button sx={{
                color: (theme)=> active ? `${theme.palette.info.main}` : `${theme.palette.secondary.main}`,
                ...sx
            }} {...props} >{children}</Button>
        </Link>
    );
  }
  

