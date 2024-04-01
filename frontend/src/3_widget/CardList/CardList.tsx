"use client"
import ProductCard from "@/src/4_features/Card/Card";
import { useQuery } from "@tanstack/react-query";
import { restClient } from "@/src/6_shared/api/api.fetch";
import { Product } from "@/src/5_entities/product/product.types";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import { Box } from "@mui/material";

export default function CardList() {
    const {data, isLoading, isFetching} = useQuery({
        queryKey: ['products'],
        queryFn: context => restClient.get<{data: Product[]}>(
            `/products?populate=*`, false),
        enabled: true
      })

  return (
    <>
        {isFetching || isLoading ? <Loader/> :
            data?.data.length ? 
            data?.data.map((product: Product)=>( 
                <ProductCard key={product.id} product={product}/>
            )) : 
            <Box sx={{m:2, fontSize: ["20px", "26px", "28px","30px"], display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Ничего не найдено
            </Box>
        }
    </>
  )
}
