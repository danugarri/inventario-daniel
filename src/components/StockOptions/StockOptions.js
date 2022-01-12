//import React, {useState} from 'react';
import './StockOptions.css';

import { NavLink } from 'react-router-dom';

export const StockOptions = () => {
  
   
    
    return(
        <div>
            <main>
                <button><NavLink to = 'stocklist'>Ver Stock</NavLink></button>
                <button><NavLink to = 'addproduct'>Añadir producto</NavLink></button>
                <button><NavLink to = 'updateOption'>Modificar producto</NavLink></button>
                <button><NavLink to = 'deleteOption'>Eliminar producto</NavLink></button>
                <button><NavLink to = './'>Volver</NavLink></button>
            </main>
        </div>
    )
}