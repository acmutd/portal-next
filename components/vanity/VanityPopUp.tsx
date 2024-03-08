import React from 'react';
import { VanityLink } from '@generated/type-graphql';

type vanityPopUpProps = {
    success : boolean; 
    vals : Omit<VanityLink, "id"> | undefined;
    isOpen : boolean; 
    onClose : () => void;
}


const VanityPopUp:React.FC<vanityPopUpProps>  = ({success, vals, isOpen, onClose}) => {
    
    if ( !isOpen ) return null; 


    return (
         <main className='absolute w-full h-full top-0 left-0 flex justify-center items-center bg-slate-800 bg-opacity-50'>
            <section className="bg-slate-500  w-[30vw] h-[30vh] relative rounded-md ">
                {/* Improve the design for the popup -> replace close button with a symbol } */}
                <button 
                    onClick={onClose}
                    className= ' absolute top-0 right-0 m-3 p-2 border-black border-2 rounded-md'
                >
                    Closed Button 
                </button>
                <div className=' text-center text-xl font-semibold mt-20 '>
                    { ( success )
                    ? "Vanity Linked Created Successfully"
                    : "Vanity Linked Failed to Generated!"}
                </div>
                    <div className='text-center text-lg font-semibold mt-5'>
                        { ( success )
                        ? `Vanity Link: https://${vals!.vanityDomain}.acmutd.co/${vals!.slashtag}`
                        : "Please try again"}
                    </div>
                
            </section>
         </main>
    )

}


export default VanityPopUp;