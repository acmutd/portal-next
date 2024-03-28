import React, { Fragment } from 'react';
import { VanityLink } from '@generated/type-graphql';
import { Dialog } from "@headlessui/react";
import { motion } from 'framer-motion';
import styled from 'styled-components';
import CloseIcon from 'icons/CloseIcon';



type VanityPopUpProps = {
    success : boolean; 
    vals : Omit<VanityLink, "id"> | undefined;
    errMsg : string | undefined;
    isOpen : boolean; 
    onClose : () => void;
}


const PopupBorder = styled(motion.button)`
  border: solid 2px transparent;
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(120deg, #be185d, #7e22ce);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: white;
  box-shadow: 2px 1000px 1px rgb(24 24 27) inset;
`;


const VanityPopUp:React.FC<VanityPopUpProps>  = ({success, vals, errMsg, isOpen, onClose}) => {
    
    return (

            <Dialog open={ isOpen } onClose={ onClose }>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
                
                <div className="fixed inset-0 flex justify-center items-center z-50 text-black text-center" aria-hidden="true">
                    <PopupBorder className="relative w-2/4 h-1/4 lg:h-2/5 justify-center items-center flex flex-col text-lg md:text-2xl lg:text-4xl rounded-lg shadow-md  " >
                        
                        <Dialog.Panel className="w-full h-full mt-14">

                        <Dialog.Description className= {`font-bold mb-12 ${ success ? 'text-green-600' : 'text-red-600' } `} >
                            { ( success )
                                ? "Vanity Linked Created Successfully"
                                : "Vanity Linked Failed to Generated!"}
                        </Dialog.Description >
                        <Dialog.Description className="text-sm lg:text-2xl select-text">
                            { ( success )
                                ? `Vanity Link: https://${vals!.vanityDomain}.acmutd.co/${vals!.slashtag}`
                                : `Reason: ${errMsg}`}
                        </Dialog.Description>

                        
                        </Dialog.Panel>
                        <div className="absolute top-0 right-0 m-2" onClick={onClose}>
                            <CloseIcon />
                        </div>

                    </PopupBorder>
                    
                </div>
            </Dialog>

    )

}


export default VanityPopUp;