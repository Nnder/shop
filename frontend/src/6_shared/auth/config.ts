import { AuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import YandexProvider from 'next-auth/providers/yandex';
import Credentials from "next-auth/providers/credentials";
import { restClient } from "../api/api.fetch";

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID as string,
            clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
        }),

        Credentials({
            credentials: {
                username: {type: 'text'},
                email: { type: 'text' },
                password: { type: 'password' },
                new: {type: 'text'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null

                if (credentials.new === "1") {
                    try {
                        const data = await restClient.post<{
                            user: User
                            jwt: string
                        }>(`/auth/local/register`, credentials, false, {
                                'Content-Type': 'application/json'
                        })

                        return {
                            id: data.user.id.toString(),
                            email: data.user.email,
                            jwt: data.jwt,
                        } as User
                    } catch (e) {
                        return Promise.reject({
                            message: 'Register error, not valid data!',
                        })
                    }
                }

                try {
                    const data = await restClient.post<{
                        user: User
                        jwt: string
                    }>(`/auth/local`, {
                        identifier: credentials.email,
                        password: credentials.password,
                    } , false, {
                        'Content-Type': 'application/json'
                })

                    

                    return {
                        id: data.user.id.toString(),
                        email: data.user.email,
                        jwt: data.jwt,
                    } as User
                } catch (e) {
                    return Promise.reject({
                        message: 'Login error, not valid data!',
                    })
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, account }: any) {
            return { ...token, ...user }
        },
        session({ session, token, user }: any) {
            session.user = token
            console.log(session)
            return session
        },
    },
    pages: {
        signIn: '/signin'
    }
}

