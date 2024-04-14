'use client'
import { ChangeEvent, useEffect } from 'react';
import Find from '../Find/Find'
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search(setFind: any) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(()=>{
        setFind(searchParams.get('search') || "")
    }, [])

    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        const params = new URLSearchParams(searchParams);
        if(value){
            setFind(value)
            params.set('search', value)
        } else {
            setFind("")
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`);
    }
  return (
    <Find onChange={ChangeHandler}/>
  )
}
