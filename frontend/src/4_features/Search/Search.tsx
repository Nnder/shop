import { ChangeEvent, PropsWithChildren, useEffect } from 'react';
import Find from '../Find/Find'
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search({setFind, ...props} : PropsWithChildren< {setFind: (val: any)=>any} >) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(()=>{
        const initialValue = searchParams.get('search') || ""
        setFind(initialValue)
    }, [searchParams, setFind])

    const value = searchParams.get('search') || ""

    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        const newValue = e.target.value
        const params = new URLSearchParams(searchParams);
        if(newValue){
            setFind(newValue)
            params.set('search', newValue)
        } else {
            setFind("")
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`);
    }
  return (
        <Find onChange={ChangeHandler} value={value} />
  )
}
