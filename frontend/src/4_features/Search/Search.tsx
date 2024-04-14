'use client'
import { ChangeEvent, Dispatch, PropsWithChildren, SetStateAction, Suspense, useEffect } from 'react';
import Find from '../Find/Find'
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search({setFind, ...props} : PropsWithChildren< {setFind: (val: any)=>any} >) {
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
    <Suspense>
        <Find onChange={ChangeHandler}/>
    </Suspense>
    
  )
}
