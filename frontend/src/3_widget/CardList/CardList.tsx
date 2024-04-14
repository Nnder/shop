'use client'
import ProductCard from "@/src/4_features/Card/Card";
import { Product } from "@/src/5_entities/product/product.types";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import { Box } from "@mui/material";
import { Suspense, useState } from "react";
import { GetProducts } from "@/src/5_entities/product/product";
import { useDebounce } from "@/src/6_shared/hooks/useDebounce";
import Search from "@/src/4_features/Search/Search";

export default function CardList() {
    const [find, setFind] = useState("");
    const debouncedFind = useDebounce<string>(find, 1000);
    let {data, isLoading, isFetching, } = GetProducts(debouncedFind)

  return (
    <>
    <Suspense>
        <Search setFind={setFind}/>
    </Suspense>
        
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: [1,2,3,4],
            width: 1,
        }}>

            {isLoading ? <Loader/> :
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
