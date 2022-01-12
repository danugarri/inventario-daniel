import React, {useState} from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Redirect } from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'rgb(243, 197, 111)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ConfirmModal = ({openTest,handleClose,productToSell,productId,currentPrice,currentAmount}) => {

  const [redirection, setRedirection] = useState(false);
   // modal conten
  // content for the warning
  const warning = (
  <>
    <p>¿Quieres modificar</p>
    <p>{productToSell}?</p>
  </>
  )
    const confirm = () => {
      setRedirection(true);
    }


  return (
    <div>
      <Modal
        open={openTest}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {warning}
          </Typography>
            <button onClick={handleClose}>No</button>
            <button onClick={confirm}>Sí</button>
        </Box>
      </Modal>
      { productToSell && redirection &&
        <Redirect to ={{
           pathname:'/productToUpdate',
           search:`?product=${productToSell}&price=${currentPrice}&amount=${currentAmount}&id=${productId}`,
        }} 
           ></Redirect>
      }
    </div>
  );
}
