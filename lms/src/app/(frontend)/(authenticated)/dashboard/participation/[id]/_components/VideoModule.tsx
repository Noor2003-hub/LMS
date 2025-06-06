"use client"

import { Participation } from "@/payload-types"
import { useState } from "react"
import NextButton from "./NextButton"
import { markProgress } from "../_actions/markProgress"

interface VideoModuleProps{
    module:any
    participation:Participation
    onCompleted:(nextIndex:number)=>void
}
export default function VideoModule({module,participation,onCompleted}:VideoModuleProps){
    const[loading,setLoading]=useState(false)
    async function handelNextModule(){
        setLoading(true)
        try{
            let updatedParticipation=await markProgress(participation)
            if (updatedParticipation && updatedParticipation.progress){
                onCompleted(updatedParticipation.progress)
            }else{
                console.log('Error updating participation progress')
            }
        }catch(err){
            console.error(err)
        }finally{
            setLoading(false)
        }
    }
    
    return(
        <div className="w-full flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{module.title}</h2>
            <div className="relative w-full aspect-video border border-white overflow-hidden">
            <iframe 
                src={module.playerURL}
                style={{ border: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                allowFullScreen
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <NextButton loading={loading} text="Next" onClick={handelNextModule}/>
        </div>
        
    )
}