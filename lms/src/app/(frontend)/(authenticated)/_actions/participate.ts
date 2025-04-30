"use server"
import configPromise from '@payload-config' 
import {getPayload} from "payload"
import { getUser } from './getUsers';
import { Course, Participation } from '@/payload-types';
import { notFound } from 'next/navigation';
export async function participate({courseId}:{courseId:string}){
    const payload=await getPayload({config:configPromise})
    const user= await getUser()
    if (!user){
        throw new Error("User not found")
    }
    try{
        const createdParticipation=await payload.create({
            collection:'participation',
            data:{
                course:courseId,
                customer:user.id,
                progress:0
            },
            overrideAccess:false,
            user:user
        })
        return createdParticipation
    }catch(err){
        console.error(err)
        throw new Error("Error creating participation")
    }
}