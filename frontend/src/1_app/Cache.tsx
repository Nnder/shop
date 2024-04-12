'use client'
import { useSession } from "next-auth/react";
import { user } from "../5_entities/user/user.types";
import { PropsWithChildren } from "react";

export default function Cache({...props}: PropsWithChildren) {
    const session = useSession()
    const user: Partial<user> = session.data?.user as user

    if(session.status == "authenticated" && localStorage.getItem('token') !== user?.jwt)
        localStorage.setItem('token', user?.jwt || "")

    return (
        <></>
    )
}
