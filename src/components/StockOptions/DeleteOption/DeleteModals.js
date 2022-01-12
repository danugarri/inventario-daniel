import  React,{useState } from 'react';
import Button from '@mui/material/Button';
import { WarningModal } from '../../SellOption/Modal/variants/WarningModal'; 
import { ErrorModal } from '../../SellOption/Modal/variants/ErrorModal';
import { SuccessModal } from '../../SellOption/Modal/variants/SuccessModal';




export  const DeleteModal = ({
 
  productToSell,
  isChecked,
  setIsChecked,
  checkboxSelected,
  productId,
  setProductToSell,
  resetChecked,
  setProductIndex
}) => {

    //API 
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () =>{
        deleteProductOnDataBase();
        setOpen(true);
    } 
    
  
    //const urlDelete = `https://danugarri.000webhostapp.com/proyectos%20web/API_sinag/index.php?id=${idProduct}`;
    const urlDelete = `https://danugarri.000webhostapp.com/proyectos%20web/api-personal/delete-product-api/index.php?id=${productId}`;
    
    const deleteProductOnDataBase = async () => {
        if(productId && isChecked) {
            
            console.log(`id: ${productId}`);
            console.log(urlDelete)
            await fetch(urlDelete,{
                method: 'POST',
                // at first idea i do not need a body, but only the id passed on the url
                //body: JSON.stringify(deleteBody)
            })
            .then(response => {
                setApiSuccess(true);
                console.log(response)
            })
            .catch(error =>{
                setApiError(true);
                console.log(error)
            })
        }
    }
  /*
    const handleClose = () =>{
  
    setOpen(false);
    setIsChecked(false);
    setProductToSell(null);
    for(let x=0;x<checkboxSelected.length;x++){
    checkboxSelected[x].checked= false;
    }
  } 
*/

  const handleClose = () => {
  
    setOpen(false);
    
    setIsChecked(false);
    setProductToSell(null);
    resetChecked();
 
    setProductIndex(null);
    
    for(let x=0;x<checkboxSelected.length;x++){
    checkboxSelected[x].checked= false;
    }
  } 
  // modal conten
  // content for the warnings
  const warnings = {
    content2: ( <p>No has seleccionado un producto</p>),
  }
 
   // content for the Success
  const success= ( <> <p>Has eliminado {productToSell}</p></>
  )
  // content for the ERROR
  const error = (<p>Error en la API</p>)
  


  return (
    <div id ="container">
      
       
      <Button onClick={handleOpen}>Eliminar</Button>
      {
       apiSuccess &&  <>
      <SuccessModal open={open}content= {success} handleClose={handleClose}/>
      </>
      }
      
      {
        !isChecked && <>
          <WarningModal open={open}content= {warnings.content2} handleClose={handleClose}/>
      </>
      }
    
       {
      apiError && isChecked && <>
       <ErrorModal open={open}content= {error} handleClose={handleClose}/>
      </>
       }
    </div>
  );
}
