//import  React,{useState} from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'rgb(131, 243, 131)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export  const SuccessModal = ({open,setOpen,content,handleClose}) => {

  return (
    <div id ="container">
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {content}
          </Typography>
            <button onClick={handleClose}>X</button>
         </Box>
      </Modal>
    </div>
  );
}
