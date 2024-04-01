"use client"
import ProductCard from "@/src/4_features/Card/Card";
import { useQuery } from "@tanstack/react-query";
import { restClient } from "@/src/6_shared/api/api.fetch";
import { Product } from "@/src/5_entities/product/product.types";
import Loader from "@/src/6_shared/ui/Loader/Loader";

export default function CardList() {
    const {data, isLoading, isFetching} = useQuery({
        queryKey: ['products'],
        queryFn: context => restClient.get<{data: Product[]}>(
            `/products`, false),
        enabled: true
      })

  return (
    <>
        {isFetching || isLoading ? <Loader/> :
            data?.data.length ? 
            data?.data.map((product: Product)=>( 
                <ProductCard key={product.id} product={product}/>
            )) : <div>Ничего не найдено</div>
        }
    </>
  )
}
