import { create } from 'zustand'
import { Product } from '../product/product.types'
import { produce } from 'immer'
import { Bid, PreviousBids, ProductCount, StoreBid } from './bid.types'
import { restClient } from '@/src/6_shared/api/api.fetch'
import { useQuery } from '@tanstack/react-query'

export const useBidStore = create<StoreBid>((set,get) => ({
    count: 0,
    products: [],
    sum: 0,
    fio: "",
    phone: "",
    message: "",
    productCount: [],
    previousBids: [],
    setPreviousBids: (bid: PreviousBids[]) => set(produce((state) => {
        state.previousBids = [...state.previousBids, ...bid]
    })),

    addProductCount: (product: Product) => set(produce((state) => {
        state.productCount.map((productEl: ProductCount, i: number)=> 
        productEl.id === product.id && product.count ? ++state.productCount[i].count  : product.count)
        state.sum += product.price ? product.price : 0
    })),

    removeProductCount: (product: Product) => {
        return set(produce((state) => {
            state.productCount.map((productEl: ProductCount, i: number)=> 
            productEl.id === product.id && product.count ? --state.productCount[i].count  : product.count),
            state.sum -= product.price ? product.price: 0
        }
    ))},

    getProductCount: (product: Product) => {
        const productCount = get().productCount
        for(let el in productCount){
            if(productCount[el].id === product.id){
                return productCount[el].count
            }
        }
        return null
    },

    addProduct: (product: Product) => set(produce((state) => { 
        ++state.count,
        state.products.push(product),
        state.productCount.push({id: product.id, count:1}),
        state.sum += product.price ? product.price : 0
    })),
    
    removeProduct: (product: Product) => {
        const count = get().getProductCount(product) || 0
        return set(produce((state) => { 
            --state.count,
            state.products = [...state.products.filter((el: Product)=> el.id !== product.id)],
            state.productCount = [...state.productCount.filter((el: ProductCount)=> el.id !== product.id)]
            state.sum -= product.price ? product.price*count : 0
        }))
    },
    getProductIndex: (product: Product) => {
        const {existInBid, products} = get()
        for(let el in products ){
            if(products[el].id === product.id){
                return el
            }
        }
        return -1;
    },

    existInBid: (product: Product) => {
        const products = get().products
        let isExist = false;
        for(let el in products ){
            if(products[el].id === product.id){
                isExist = true;
                break;
            }
        }
        return isExist;
    },
    checkProductCount: async ()=> {
        const {productCount, getProductIndex, products} = get()
        const newProducts: Product[] = []
        const NotEnough: ProductCount[] = []
        productCount.map( async (product)=>{
            const currentProduct = await restClient.get<{data: Product}>(`/products/${product.id}`, true)
            if(product.count && currentProduct.data.count && product.count > currentProduct.data.count){
                const newProduct: ProductCount = {id: product.id, count: 1}
                const index: number = getProductIndex(product as Product) as number
                if(index >= 0){
                    newProducts[index] = {...currentProduct.data}
                }

                NotEnough.push({...newProduct, title: currentProduct.data.title})
                return {...newProduct}
            }
        })

        set(produce((state)=>{
            state.productCount = [...productCount]
            state.product = [...newProducts]
        }))

        return NotEnough
    },
        
    clear: () => set(produce((state)=>{
        state.previousBids.push({
            status: 'new',
            products: [...state.products],
            counts: [...state.productCount],
            sum: state.sum,
            createdAt: new Date()
        })
        state.count = 0,
        state.sum = 0,
        state.products = [],
        state.productCount = []
    })),
}))



export function GetBidsByEmail(email: string){
    return useQuery({
        queryKey: ['previousBids', email],
        queryFn: context => restClient.get<{data: Bid[]}>(
            `/bids?sort=createdAt:desc&populate[products]=*&filters[users_permissions_user][$eq]=${email}`, false, {
                'Content-Type': 'application/json'
            }),
        enabled: true,
        staleTime: 50000,
        refetchInterval: 60000,
        gcTime: 50000,
    })
    
}