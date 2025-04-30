import { ReactElement } from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
export default function SubmitButton({loading,text}:{loading:boolean,text:string}):ReactElement{
    return <button
    type="submit"
    className="bg-white text-black rounded-md p-2 w-full "
    disabled={loading}>
    {text}{" "}
    <AiOutlineLoading3Quarters className={`animate-spin ${loading? "block":"hidden"}`}></AiOutlineLoading3Quarters>
    </button>
}