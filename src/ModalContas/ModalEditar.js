import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  { Grid, Button, TextField }  from "@mui/material";
import { useForm } from "react-hook-form";
import Axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export const ModalEditar = (props) => {

    const {handleCloseEditarConta, openEditarConta, rowData, id} = props;
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = () => {
        
    }
    
    useEffect(() => {
        console.log("rowData", rowData);
      }, [rowData])

    return (
        <Modal
        open={openEditarConta}
        onClose={handleCloseEditarConta}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "#424242", fontFamily: 'Arial', fontWeight: "bold", fontSize: '1.1rem',  marginBottom: "1rem"}}>
                Editar Conta
                </Typography>
                <form id="editar" onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                    <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 0.3},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField id="nome" label="Nome" variant="outlined" {...register("nome", { required: true })} disabled style={{width: "100%", marginBottom: "1rem"}}/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 0.3},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField id="cpf" label="CPF" variant="outlined" {...register("cpf", { required: true })} disabled style={{width: "100%", marginBottom: "1rem"}}/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 0.3},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField id="numConta" label="Número da Conta" variant="outlined"  defaultValue={rowData.numConta} {...register("numConta", { required: true })} style={{width: "100%"}}/>
                    </Box>
                </Grid>
                <Grid container item sm={12} style={{marginTop: "1rem", justifyContent: "flex-end"}}>
                    <Button variant="outlined" style={{height: '2.5rem', width: "6.5rem"}} onClick={handleCloseEditarConta}>Cancelar</Button>
                    <Button type="submit" variant="contained" style={{height: '2.5rem', width: "5.5rem", marginLeft: "0.7rem"}}>Salvar</Button>
                </Grid>
                </form>
            </Box>
        </Modal>
    )
}