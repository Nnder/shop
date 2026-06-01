import { Product } from "../product/product.types"

export interface ProductCount {
    id: number
    count: number | null
    title?: string
}

export interface PreviousBids {
    status: string
    products: Product[]
    counts: ProductCount[]
    sum: number
    createdAt: Date
}

export interface Bid{
    id?: number
    count: number
    products: Product[]
    sum: number
    fio: string
    phone: string
    message: string
    status: string
    productCount: ProductCount[]
    previousBids: PreviousBids[]
    createdAt?: Date
    updatedAt?: Date
}

export interface StoreBid extends Omit<Bid, "status">{
    addProductCount: (product: Product)=>void
    removeProductCount: (product: Product)=>void
    getProductCount: (product: Product)=> number | null
    addProduct: (product: Product)=>void
    removeProduct: (product: Product)=>void
    getProductIndex: (product: Product)=>number | string
    existInBid: (product: Product)=>boolean
    clear: ()=>void
    setPreviousBids: (bid: PreviousBids[])=>void
    checkProductCount: ()=> Promise<ProductCount[]>
}