import { create } from 'zustand'
import { Product } from '../product/product.types'
import { produce } from 'immer'

interface ProductCount {
    id: number
    count: number | null
}

interface PreviousBids {
    status: string
    product: Product[]
    counts: ProductCount[]
    createdAt: Date
}

interface Bid{
    count: number
    products: Product[]
    fio: string
    phone: string
    message: string
    productCount: ProductCount[]
    previousBids: PreviousBids[]
    addProductCount: (product: Product)=>void
    removeProductCount: (product: Product)=>void
    getProductCount: (product: Product)=> number | null
    addProduct: (product: Product)=>void
    removeProduct: (product: Product)=>void
    existInBid: (product: Product)=>any
    clear: ()=>void
    setPreviousBuds: (bid: PreviousBids[])=>void
}

export const useBidStore = create<Bid>((set,get) => ({
    count: 0,
    products: [],
    fio: "",
    phone: "",
    message: "",
    productCount: [],
    previousBids: [],
    setPreviousBuds: (bid: PreviousBids[]) => set(produce((state) => {
        state.previousBids = [...state.previousBids, ...bid]
    })),

    addProductCount: (product: Product) => set(produce((state) => {
        state.productCount.map((productEl: ProductCount, i: number)=> 
        productEl.id === product.id && product.count ? ++state.productCount[i].count  : product.count)
    })),
    removeProductCount: (product: Product) => set(produce((state) => {
        state.productCount.map((productEl: ProductCount, i: number)=> 
        productEl.id === product.id && product.count ? --state.productCount[i].count  : product.count)
    })),

    getProductCount: (product: Product) => {
        const productCount = get().productCount

        for(let el in productCount){
            if(productCount[el].id === product.id){
                return productCount[el].count
                break;
            }
        }

        return null
    },


    


    addProduct: (product: Product) => set(produce((state) => { 
        ++state.count,
        state.products.push(product),
        state.productCount.push({id: product.id, count:1})
    })),
    
    removeProduct: (product: Product) => set(produce((state) => { 
        --state.count,
        state.products = [...state.products.filter((el: Product)=> el.id !== product.id)],
        state.productCount = [...state.productCount.filter((el: ProductCount)=> el.id !== product.id)]
    })),


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
    clear: () => set({}, true),
}))