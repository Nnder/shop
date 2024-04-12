import { restClient } from "@/src/6_shared/api/api.fetch";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./product.types";

export function GetProducts(find = ""){
    return useQuery({
        queryKey: ['products', find],
        queryFn: context => restClient.get<{data: Product[]}>(
            `/products?populate=*&filters[title][$contains]=${find}`, false, {
                'Content-Type': 'application/json'
            }),
        enabled: true,
        staleTime: 50000,
        refetchInterval: 60000,
        gcTime: 50000,
      })
}

export function GetProduct(id: number){
    return useQuery({
        queryKey: ['product', id],
        queryFn: context => restClient.get<{data: Product}>(
            `/products/${id}?populate=*`, false, {
                'Content-Type': 'application/json'
            }),
        enabled: true,
        staleTime: 800000,
        refetchInterval: 900000,
        gcTime: 100000,
      })
}

export async function UpdateProduct(product: Product, newProduct: Partial<Product>){
    return await restClient.put<Product>(`/products/${product.id}`, true, {data:{...newProduct}})
}