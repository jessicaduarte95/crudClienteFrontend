import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  { Grid, Button }  from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const ModalEditar = (props) => {

    const {openEditarCliente, handleCloseEditarCliente} = props;

  return (
    <div>
      <Modal
        open={openEditarCliente}
        onClose={handleCloseEditarCliente}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "#424242", fontFamily: 'Arial', fontWeight: "bold", fontSize: '1.1rem'}}>
            Editar Cliente
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Grid container item sm={12} style={{marginTop: "1rem", justifyContent: "flex-end"}}>
            <Button type="submit" variant="outlined" style={{height: '2.5rem', width: "6.5rem"}} onClick={handleCloseEditarCliente}>Cancelar</Button>
            <Button type="submit" variant="contained" style={{height: '2.5rem', width: "5.5rem", marginLeft: "0.7rem"}}>Salvar</Button>
         </Grid>
        </Box>
      </Modal>
    </div>
  );
}
