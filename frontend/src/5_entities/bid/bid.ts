import { create } from 'zustand'
import { Product } from '../product/product.types'
import { produce } from 'immer'

interface ProductCount {
    id: number
    count: number
}

interface Bid{
    count: number
    products: Product[]
    fio: string
    phone: string
    message: string
    productCount: ProductCount[]
    addProductCount: (product: Product)=>void
    removeProductCount: (product: Product)=>void
    addProduct: (product: Product)=>void
    removeProduct: (product: Product)=>void
    existInBid: (product: Product)=>any
    clear: ()=>void
}

export const useBidStore = create<Bid>((set) => ({
    count: 0,
    products: [],
    fio: "",
    phone: "",
    message: "",
    productCount: [],

    addProductCount: (product: Product) => set(produce((state) => {
        state.productCount.map((productEl: ProductCount)=> 
        productEl.id === product.id && product.count ? ++product.count  : product.count)
    })),
    removeProductCount: (product: Product) => set(produce((state) => {
        state.productCount.map((productEl: ProductCount)=> 
        productEl.id === product.id && product.count ? --product.count  : product.count)
    })),


    addProduct: (product: Product) => set(produce((state) => { 
        ++state.count,
        state.products.push(product),
        state.productCount.push({id: product.id, count:0})
    })),
    
    removeProduct: (product: Product) => set(produce((state) => { 
        --state.count,
        state.products = [...state.products.filter((el: Product)=> el.id !== product.id)],
        state.productCount = [...state.productCount.filter((el: ProductCount)=> el.id !== product.id)]
    })),


    existInBid: (product: Product) => (products: Product[])=>{
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