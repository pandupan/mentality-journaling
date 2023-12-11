import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOption: NextAuthOptions = {
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,
    providers : [
        CredentialsProvider({
            type : "credentials",
            name : "Credentials",
            credentials:{
                email : {label : "Email", type : "email"},
                password : {label : "Password", type : "password"},
            },
            async authorize(credentials : any ){

                const {email, password, fullname} = credentials as {
                    fullname : string;
                    email : string;
                    password : string;
                };
                const user:any = await signIn({email});

                if(user) {
                    const passwordConfirm = await compare(password, user.password);
                    if (passwordConfirm){
                        return user;
                    }
                    return null;
                } else {
                    return null
                }

            }
        })
    ],
    callbacks : {
        async jwt({token,account, user} : any ) {
            if (account?.provider === "credentials") {
                // console.log({token, account, user})
                token.fullname = user.fullname
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        async session({session,token} : any){
            if("email" in token){
                session.user.email = token.email
            }
            if("fullname" in token){
                session.user.fullname = token.fullname
            }
            if("role" in token){
                session.user.role = token.role
            }
            // console.log({session, token})
            return session
        }
    },
    pages : {
        signIn : "/login",
    }
}

const handler = NextAuth(authOption)

export {
    handler as GET, handler as POST
}; 