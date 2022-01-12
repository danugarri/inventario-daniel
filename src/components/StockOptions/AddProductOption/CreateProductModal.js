//import  React,{useEffect} from 'react';
// import Box from '@mui/material/Box';
// //import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import './CreateProductModal.css';
import { SuccessModal } from '../../SellOption/Modal/variants/SuccessModal';
import { WarningModal } from '../../SellOption/Modal/variants/WarningModal';
import { ErrorModal } from '../../SellOption/Modal/variants/ErrorModal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 'fit-content',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export  const CreateProductModal = ({created,productName,price,amount,open,handleClose,allInputs,apiError,unAvailableCategory}) => {
 //console.log(created)
const warning = ( <p>Te falta algún dato por incluir</p>);
const succes = ( <>
          <p>Has añadido:</p>{`${amount} unidad/es de`} 
          <p>{productName}</p>
          <p>con un precio de {price}€</p>
          </>);
const error= (<p>Se ha producido un error en la API</p>);
const categoryWarning = (<p>Esa categoría no existe en el stock</p>)

  return (
    <div id ="text-container">
       {!allInputs &&
            <WarningModal open={open}content= {warning} handleClose={handleClose}/>
          
          }
        {
        created && allInputs && !unAvailableCategory &&
          <SuccessModal open={open}content= {succes} handleClose={handleClose}/>
    
      
      }
       {!created && allInputs && apiError &&
              
              <ErrorModal open={open}content= {error} handleClose={handleClose}/>
          }
      {
        allInputs && unAvailableCategory  &&
         <WarningModal open={open}content= {categoryWarning} handleClose={handleClose}/>
      }
    
    </div>
  );
}
