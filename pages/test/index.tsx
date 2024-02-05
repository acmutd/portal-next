import { useSession } from "next-auth/react"
import { officerResolver } 
export default function test() { 

    const { data: session, status } = useSession({required: true })


    return (
        <>
        <div className="bg-red-500">
            Hello World
       
        </div>
        <button 
            className="bg-blue-500"
            onClick={ officerEligibleProfiles() }    
        >
                Click Me!
        </button>
        </>
    )
}