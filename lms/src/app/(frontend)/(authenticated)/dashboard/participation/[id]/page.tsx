import configPromise from '@payload-config' 
import {getPayload} from "payload"
// import { getUser } from '../../../_actions/getUsers';
import { Course, Participation } from '@/payload-types';

import { notFound } from 'next/navigation';
import { getUser } from '../../../_actions/getUsers';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import CourseViwer from './_components/CourseViewer';
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
        <div className='flex flex-col mx-auto w-full max-w-4xl p-4 gap-4'>
            <Link href='/dashboard' className='inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition duration-300 ease-in-out'>
            <HiArrowLeft className='text-lg'/>
            Back to Dashboard
            </Link>
            <CourseViwer participation={participation}/>
            </div>
    )
}
export default CoursePage