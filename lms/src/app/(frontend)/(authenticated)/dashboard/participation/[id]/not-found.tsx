import Link from "next/link";
import {HiArrowLeft} from 'react-icons/hi'
export default function NotFound(){
    return(
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <h1 className="text-2xl font-bold">Participation not found</h1>
            <p className="text-gray-400">the participation you are looking for does not exist.</p>
            <Link href='/dashboard'
            className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition">
                <HiArrowLeft className="text-lg"/>
                Back to Dashboard
            </Link>
        </div>

    )
}