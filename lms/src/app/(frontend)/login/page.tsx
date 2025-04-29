import { getPayload } from "payload";
import { ReactElement } from "react";
import LoginForm from "./components/LoginForm";


export default async function page():Promise<ReactElement>{
    return <div className="flex items-center min-w-full justify-center min-h-screen">

<LoginForm/></div>
    }