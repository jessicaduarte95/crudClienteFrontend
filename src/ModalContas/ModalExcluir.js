import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  { Grid, Button }  from "@mui/material";
import Axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const ModalExcluir = (props) => {

    const {openExcluirConta, handleCloseExcluirConta, id, listarContas, handleClickAlert, handleClickAlertError, handleClickAlertWarn} = props;

    const excluirConta = () => {
      Axios.get(`http://localhost:8080/movimentacao/filtro/${id}`)
        .then((response) => {
          if(response.data.length > 0){
            handleCloseExcluirConta();
            handleClickAlertWarn();
          }else{
            Axios.delete(`http://localhost:8080/conta/${id}`)
            .then(() => {
                listarContas();
                handleCloseExcluirConta();
                handleClickAlert();
            })
            .catch((error) => {
                console.log("Erro: ",error);
                handleClickAlertError();
            })
          }
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <Modal
    open={openExcluirConta}
    onClose={handleCloseExcluirConta}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "#424242", fontFamily: 'Arial', fontWeight: "bold", fontSize: '1.1rem'}} >
        Excluir Conta
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Tem certeza que deseja excluir a conta selecionada?
        </Typography>
        <Grid container item sm={12} style={{marginTop: "1rem", justifyContent: "flex-end"}}>
            <Button type="submit" variant="outlined" style={{height: '2.5rem', width: "6.5rem",  marginBottom: '0.5rem'}} onClick={handleCloseExcluirConta}>Cancelar</Button>
            <Button type="submit" variant="contained" style={{height: '2.5rem', width: "6.5rem", marginLeft: "0.7rem"}}  onClick={excluirConta}>Excluir</Button>
        </Grid>
    </Box>
    </Modal>
  );
}