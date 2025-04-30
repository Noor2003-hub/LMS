import configPromise from '@payload-config' 
import {getPayload} from "payload"
// import { getUser } from '../../../_actions/getUsers';
import { Course, Participation } from '@/payload-types';

import { notFound } from 'next/navigation';
import { getUser } from '../../../_actions/getUsers';
const CoursePage=async ({params}:{params:{participationId:string}})=>{
    const participationId=params.id
    const payload=await getPayload({config:configPromise})
    const user= await getUser();
    let participation:Participation|null=null
    try{
        const res: Participation=  await payload.findByID({
            collection:'participation',
            id:participationId,
            overrideAccess:false,
            user:user
    })
    participation=res
        
    }catch(err){
        console.error(err)
        return notFound();
    }
    if (!participation){
        return notFound()
    }
    return(
        <div>{participation.course.title}</div>
    )
}
export default CoursePage