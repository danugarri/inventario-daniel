//import React,{useState} from 'react';
import './InputAmount.css';

export const InputAmount = ({sellProduct}) => {
   
    return(
        <form >
            <input id="cantidad" type="number" name ="sold-amount" min="1" onChange={sellProduct} />
           
        </form>
    )

}