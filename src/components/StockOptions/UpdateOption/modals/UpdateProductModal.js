import { SuccessModal } from '../../../SellOption/Modal/variants/SuccessModal';
import { ErrorModal } from '../../../SellOption/Modal/variants/ErrorModal';
import { WarningModal } from '../../../SellOption/Modal/variants/WarningModal';

  

export  const UpdateProductModal = ({created,newProductName,NewPrice,NewAmount,open,handleClose,newInputs,apiError}) => {
 //console.log(created)
const warning = ( <p>No has introducido nada</p>);
const succes = ( <>
          <p>Has modificado lo siguiente:</p>
          <p>Nueva cantidad: {NewAmount || 'No modificado'}</p>
          <p>Nuevo nombre: {newProductName || 'No modificado'}</p>
          <p>Nuevo precio: {NewPrice || 'No modificado'}</p>
          </>);
const error= (<p>Se ha producido un error en la API</p>);



  return (
    <div id ="text-container">
        {
        created && newInputs && !apiError &&
        <SuccessModal open={open}content= {succes} handleClose={handleClose}/>
      }
       { newInputs && apiError &&     
        <ErrorModal open={open}content= {error} handleClose={handleClose}/>
        }
     {  !newInputs && open &&
        <WarningModal open={open}content= {warning} handleClose={handleClose}/>
        }
    
    </div>
  );
}
