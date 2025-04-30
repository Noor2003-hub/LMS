import { Participation } from "@/payload-types"

interface CourseModuleProps{
    module:any
    participation:Participation
    onCompleted:(nextIndex:number) => void
}
export default function CourseModule({module,participation,onCompleted}:CourseModuleProps){
    switch(module.blockType){
        default:return(<div>Unknown module type{module.blockType}</div>)
    }
}