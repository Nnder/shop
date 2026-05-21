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
        
        for (const product of productCount) {
            try {
                const response = await restClient.get<any>(`/products/${product.id}`, false)
                // Handle both transformed and untransformed responses
                const currentProduct = response.data || response;
                
                if (product.count && currentProduct.count !== undefined && product.count > currentProduct.count) {
                    const newProduct: ProductCount = {id: product.id, count: 1}
                    const index: number = getProductIndex(product as any as Product) as number
                    if(index >= 0){
                        newProducts[index] = {...currentProduct}
                    }

                    NotEnough.push({...newProduct, title: currentProduct.title})
                }
            } catch (e) {
                console.error(`Error checking count for product ${product.id}:`, e)
            }
        }

        set(produce((state)=>{
            state.productCount = [...productCount]
            if (newProducts.length > 0) {
                state.products = state.products.map((p, i) => newProducts[i] || p)
            }
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



export function GetBidsForCurrentUser(isAuthenticated: boolean){
    return useQuery({
        queryKey: ['previousBids'],
        queryFn: async () => {
            const response = await fetch(`/api/bids/user`)
            if (!response.ok) {
                throw new Error('Failed to fetch bids')
            }
            return response.json()
        },
        enabled: isAuthenticated,
        staleTime: 50000,
        refetchInterval: 60000,
        gcTime: 50000,
    })

}