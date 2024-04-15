import {HeadersInit} from "undici-types";

class FetchClient {
    private API_URL = process.env.API_URL as string
    private BACK_URL = process.env.BACK_URL as string

    constructor(private defaultHeaders: Record<string, string> = {}) {}
    
    async get<T>(
        path: string,
        isAuth: boolean = false,
        headers?: Record<string, string>
    ):Promise<T>{
        return this.fetch<T>(path, 'GET', isAuth, undefined ,headers)
    }

    async post<T>(
        path: string,
        body?: Record<string, any>,
        isAuth: boolean = false,
        headers?: Record<string, string>
    ):Promise<T>{
        return this.fetch<T>(path, 'POST', isAuth, body, headers)
    }

    async put<T>(
        path: string,
        body?: Record<string, any>,
        isAuth: boolean = false,
        headers?: Record<string, string>
    ):Promise<T>{
        return this.fetch<T>(path, 'PUT', isAuth, body , headers)
    }

    async delete<T>(
        path: string,
        isAuth: boolean = false,
        headers?: Record<string, string>
    ):Promise<T>{
        return this.fetch<T>(path, 'PUT', isAuth, undefined, headers)
    }

    async patch<T>(
        path: string,
        isAuth: boolean = false,
        body?: Record<string, any>,
        headers?: Record<string, string>
    ):Promise<T>{
        return this.fetch<T>(path, 'PATCH', isAuth, body, headers)
    }

    getMediaUrl(path: string){
        return `${this.BACK_URL}${path}`;
    }

    getBackendUrl(){
        return `${this.BACK_URL}`;
    }

    private async fetch<T>(
        path: string,
        method: string,
        isAuth: boolean,
        body?: Record<string, any>,
        headers?: Record<string, string>
    ): Promise<any>{

        const url = `${this.API_URL}${path}`

        const authorizationHeader: HeadersInit = isAuth ?
            {Authorization: `Bearer ${localStorage.getItem('token')}`} :
            {}

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...this.defaultHeaders,
                    ...authorizationHeader,
                    ...headers
                },
                body: JSON.stringify(body)
            });

            const data = await response.json()
            if(!response.ok){
                throw new Error('Fetch error ' + JSON.stringify(data))
            }

            return data
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

export const restClient = new FetchClient()