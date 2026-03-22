import unauthorizedI from "../../../assets/unauthorizedI.png"

export default function Unauthorized(){
    return(
           <main id="unauthorized-page">
           <h2 className="error">Unauthorized Access,  You do not have permission to access this page!</h2>
           <img src={unauthorizedI}/>
    </main>
    )
}