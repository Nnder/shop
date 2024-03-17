import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: '86291010297-h512geljhj89s123llqibpifrhj9qr1i.apps.googleusercontent.com',
            clientSecret: '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'
        })
    ],
    // pages: {
    //     signIn: '/signin'
    // }
}

