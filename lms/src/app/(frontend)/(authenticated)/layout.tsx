import {redirect} from'next/navigation'
import React,{Children, ReactNode} from 'react'
import {getUser} from './_actions/getUsers';
interface LayoutProps{
    children:ReactNode
}
const Layout: FC<LayoutProps>=async ({children})=>{
    const user=await getUser();
    if (!user){
        redirect('/login')
        return null
    }
    return <>{children}</>
}

export default Layout;