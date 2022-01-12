import  React,{useState} from 'react';
//import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
//import Modal from '@mui/material/Modal';
import {WarningModal} from '../Modal/variants/WarningModal'
import { ErrorModal } from './variants/ErrorModal';
import { SuccessModal } from './variants/SuccessModal';



export  const BasicModal = ({
  amountToSell,
  introducedAmount,
  setIntroducedAmount,
  setAmountToSell,
  resetAmount,
  productToSell,
  isChecked,
  setIsChecked,
  checkboxSelected,
  productIndex,
  setProductToSell,
  resetChecked,
  setProductIndex,
  productId,
  availableAmount,
  setAvailableAmount
}) => {

 
     if(availableAmount) {

    console.log(`el producto seleccionado es: ${productToSell}`)
  }
  const getAmounts = async () => {
    const urlGet="https://danugarri.000webhostapp.com/proyectos%20web/api-personal/api/index.php";
   
    await fetch(urlGet,
        {method:"GET"})
    .then(response => response.json())
    .then(data => {
      //index for the selected product
        console.log("indice del producto seleccionado "+ productIndex)
      let availableAmountArray = [];

        availableAmountArray.push(data[productIndex].cantidad)
        setAvailableAmount(availableAmountArray);
    })
    .catch(error => console.log(error))
}

// if(availableAmount !==null && isChecked)
//  {
// console.log(availableAmount)
//  }

  const [open, setOpen] = useState(false);
  const handleOpen = () =>{
    getAmounts();
    setOpen(true);
  } 
  

    
    
   const urlSellProduct = `https://danugarri.000webhostapp.com/proyectos%20web/api-personal/vender-api/index.php?id=${productId}`;
    let amountToSendByBody;
    if(availableAmount !==null) {
      amountToSendByBody= availableAmount-amountToSell;
    }
    // we only need to send the amount to be updated
     const updateBody = {
        cantidad: amountToSendByBody,
        
    }
   
    const updateDataBase = () => {
      
      console.log(`id: ${productId}`);
      console.log(urlSellProduct);

      fetch(urlSellProduct,{
          method: 'POST',
          body: JSON.stringify(updateBody)
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
      }
      
   
    


  const handleClose = () => {
    setIntroducedAmount(false);
    setAmountToSell(null);
    setOpen(false);
    resetAmount();
    setIsChecked(false);
    setProductToSell(null);
    resetChecked();
    setAvailableAmount(null);
    setProductIndex(null);
     if(amountToSendByBody>=0 && introducedAmount && isChecked){
    updateDataBase();
     }
    for(let x=0;x<checkboxSelected.length;x++){
    checkboxSelected[x].checked= false;
    }
  } 
  // modal conten
  // content for the warnings
  const warnings = {
    content1: ( <><p>No has introducido una cantidad</p>
                  <p> O no has seleccionado un producto</p></>),
    content2: ( <p>No has seleccionado un producto</p>),
    content3: ( <p>No has introducido una cantidad</p>)           
  }
  // content for the error
  const error= (  <><p>!!OJO!!</p>
                   <p>No puedes vender más unidades de las que hay en stock</p>
                  </>
  )
   // content for the Success
  const success= ( <> <p>Has vendido {amountToSell}</p><p>unidad/es de {productToSell}</p></>
  )


  return (
    <div id ="container">
      
       
      <Button onClick={handleOpen}>Vender</Button>
      {
       introducedAmount && isChecked && amountToSendByBody>=0 && <>
      <SuccessModal open={open}content= {success} handleClose={handleClose}/>
      </>
      }
       {
       !introducedAmount  && isChecked && <>
     <WarningModal open={open}content= {warnings.content3} handleClose={handleClose}/>
      </>
      }
      {
       introducedAmount  && !isChecked && <>
          <WarningModal open={open}content= {warnings.content2} handleClose={handleClose}/>
      </>
      }
       {
       !introducedAmount  && !isChecked && <>
          <WarningModal open={open}content= {warnings.content1} handleClose={handleClose}/>
      </>
      }
       {
        introducedAmount && isChecked && amountToSendByBody<0 && <>
       <ErrorModal open={open}content= {error} handleClose={handleClose}/>
      </>
       }
    </div>
  );
}
