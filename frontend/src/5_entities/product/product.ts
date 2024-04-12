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
        enabled: true
      })
}

export function GetProduct(id: number){
    return useQuery({
        queryKey: ['product', id],
        queryFn: context => restClient.get<{data: Product}>(
            `/products/${id}?populate=*`, false, {
                'Content-Type': 'application/json'
            }),
        enabled: true
      })
}

export async function UpdateProduct(product: Product, newProduct: Partial<Product>){
    return await restClient.put<Product>(`/products/${product.id}`, false, {data:{...newProduct}})
}