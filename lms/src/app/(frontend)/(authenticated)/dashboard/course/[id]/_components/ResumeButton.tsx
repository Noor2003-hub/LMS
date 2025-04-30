import { Course,Participation } from "@/payload-types";
import Link from "next/link";
import { HiPlay } from "react-icons/hi";

export function ResumeButtom({participation}:{participation:Participation}){
    const course:Course = participation.course as Course
    const courseLength=course.curriculum.length
    const progress=participation.progress??0
    const progressPercentage=Math.round((progress/courseLength)*100)
    return (
        <Link href={`/dashboard/participation/${participation.id}`}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded overflow-hidden transition ease-in-out">
        <div className="flex flex-row items-center justify-between pl-2">
            <p className="text-sm font-semibold">{course.title}</p>
            <div className="flex items-center justify-center  h-12 w-12">
                <HiPlay className="w-6 h-6"></HiPlay>
            </div>
        </div>
        <div className="abolsute bottom-0 left-0 w-full h-1 overflow-hidden">
            <div className="h-full bg-white" style={{width:`${progressPercentage}%`}}></div>

            </div>

        
        </Link>
    )
}