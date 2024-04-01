export interface Product {
    id: number
    title: string
    text: string
    description: string
    price: number | null
    weigth: number | null
    count: number | null
    createdAt: Date
    updatedAt: Date
    date: Date
    images: Image[] | null
}

interface Image {
    id: number
    name: string
    alternativeText: string
    url: string
}
