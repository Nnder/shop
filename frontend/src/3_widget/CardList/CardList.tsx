"use client"
import ProductCard from "@/src/4_features/Card/Card";
import { Product } from "@/src/5_entities/product/product.types";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import { Box } from "@mui/material";
import Find from "@/src/4_features/Find/Find";
import { ChangeEvent, useState } from "react";
import { GetProducts } from "@/src/5_entities/product/product";
import { useDebounce } from "@/src/6_shared/hooks/useDebounce";

export default function CardList() {
    const [find, setFind] = useState("");
    const debouncedFind = useDebounce<string>(find, 1000);
    const {data, isLoading, isFetching} = GetProducts(debouncedFind)

    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        if(value){
            setFind(value)
        } else {
            setFind("")
        }
    }

  return (
    <>
        <Find onChange={ChangeHandler}/>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: [1,2,3,4]
        }}>

            {isFetching || isLoading ? <Loader/> :
                data?.data.length ? 
                data?.data.map((product: Product)=>( 
                    <ProductCard key={product.id} product={product}/>
                )) : 
                <Box sx={{m:2, fontSize: ["20px", "26px", "28px","30px"], display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Ничего не найдено
                </Box>
            }
        </Box>
    </>
  )
}
