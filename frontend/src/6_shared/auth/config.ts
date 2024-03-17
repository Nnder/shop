import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import YandexProvider from 'next-auth/providers/yandex';

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: '86291010297-h512geljhj89s123llqibpifrhj9qr1i.apps.googleusercontent.com',
            clientSecret: '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'
        }),
        YandexProvider({
            clientId: '094e11b436584f438a988fb5d6f19d7c',
            clientSecret: '900a1ef3eb304d8ab507eb112398a7ef'
        })

    ],
    // pages: {
    //     signIn: '/signin'
    // }
}

