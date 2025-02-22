import { useNavigate } from "react-router-dom"
export function PageNotFound(){

    const navigate = useNavigate()
    const messagePageNotFound = "Retourner à la page d'accueille"
    return(
        <div className="display justify-center">
            <h1>Page not found</h1>
            <button className="bg-slate-900" onClick={()=>navigate("pageNotFound")}> {messagePageNotFound} </button>
        </div>
        

    )
}