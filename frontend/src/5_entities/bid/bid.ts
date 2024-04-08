import { create } from 'zustand'
import { Product } from '../product/product.types'

interface Bid{
    count: number
    products: Product[]
    fio: string
    phone: string
    message: string
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
    addProduct: (product: Product) => set((state) => ({ 
        count: state.count + 1,
        products: [product, ...state.products],
    })),
    removeProduct: (product: Product) => set((state)=>({ 
        products: [...state.products].filter((el: Product)=> el.id !== product.id)
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