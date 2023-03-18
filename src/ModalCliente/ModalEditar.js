import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  { Grid, Button, TextField }  from "@mui/material";
import { useForm } from "react-hook-form";

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

    const {openEditarCliente, handleCloseEditarCliente} = props;
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log("Aquiii", data);
    };

  return (
    <Modal
    open={openEditarCliente}
    onClose={handleCloseEditarCliente}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "#424242", fontFamily: 'Arial', fontWeight: "bold", fontSize: '1.1rem',  marginBottom: "1rem"}}>
        Editar Cliente
        </Typography>
        <form id="editar" onSubmit={handleSubmit(onSubmit)}>
        <Grid>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 0.3 }
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="nome" label="Nome" variant="outlined" {...register("nome", { required: true })} style={{width: "100%", marginBottom: "1rem"}}/>

            </Box>
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 0.3},
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="endereco" label="Endereço" variant="outlined" {...register("endereco", { required: true })} style={{width: "100%", marginBottom: "1rem"}}/>
            </Box>
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 0.3},
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="cpf" label="CPF" variant="outlined"  {...register("cpf", { required: true })} style={{width: "100%"}}/>
            </Box>
        </Grid>
        </form>
        <Grid container item sm={12} style={{marginTop: "1rem", justifyContent: "flex-end"}}>
        <Button type="submit" variant="outlined" style={{height: '2.5rem', width: "6.5rem"}} onClick={handleCloseEditarCliente}>Cancelar</Button>
        <Button type="submit" variant="contained" style={{height: '2.5rem', width: "5.5rem", marginLeft: "0.7rem"}}>Salvar</Button>
        </Grid>
    </Box>
    </Modal>
  );
}