import React, { useEffect, useState } from "react";
import Axios from 'axios';
import  { Grid, TextField, Typography, Button, IconButton }  from "@mui/material";
import Box from '@mui/material/Box';
import "./App.css";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const App = () => {

  const containerStyle = {
    flexDirection: "row"
  }

  const firstPart = {
    backgroundImage: "linear-gradient(90deg, #1A237E 0%, #5C6BC0 100%)",
    height: "13rem",
    padding: "0rem 8rem 2rem 13rem",
    display: "flex",
    alignItems:"flex-end",
    fontFamily: 'Arial',
    fontSize: '310%',
    color: 'white'
  }

  const secondPart = {
    paddingLeft: "14rem",
    backgroundColor: "#E0E0E0"
  }

  const containerAdicionarCliente ={
    display: "flex", 
    direction: "column", 
    alignItems: "flex-start",
    paddingRight: "0.5rem", 
    marginRight: "12rem",
    marginTop: "2.5rem",
    height: "12rem",
    backgroundColor: "white",
    borderRadius: "0.4rem" 
  }

  const columns = [
    { 
      id: 'nome', 
      label: 'Nome',  
      align: 'left', 
    },
    {
      id: 'endereco',
      label: 'Endereço',
      paddingRight: "35rem",
      align: 'left'
    },
    {
      id: 'cpf',
      label: 'CPF',
      paddingRight: "7rem",
      align: 'left'
    },
    {
      id: 'editar',
      label: 'Editar',
      align: 'left'
    },
    {
      id: 'excluir',
      label: 'Excluir',
      align: 'left'
    },
  ];

  const [dataCliente, setDataCliente] = useState([])  
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Teste", data.endereco);
    Axios.post("http://localhost:8080/cliente", {
      nome: data.nome,
      endereco: data.endereco,
      cpf: data.cpf
    }
        ).then((response) => {
          console.log(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }

  useEffect(() => {
    Axios.get("http://localhost:8080/cliente")
    .then((response) => {
        console.log(response.data);
        setDataCliente(response.data)
    })
    .catch((error) => {
        console.log(error);
    })
  }, [])

  return (
    <Grid container  style={containerStyle}>
      <Grid item sm={12} style={firstPart}>
          Sistema de Contas
      </Grid>
      <Grid container item sm={12} spacing={2} style={secondPart}>
        <Grid container item sm={12} style={containerAdicionarCliente}>
          <form id="adicionar" onSubmit={handleSubmit(onSubmit)}>
            <Grid item sm={12} style={{height: "3rem", padding: "0rem", marginBottom: "0.2rem"}}>
              <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "0.1rem", color: "#424242"}}>
                Cliente
              </Typography>
            </Grid>
            <Grid item style={{display: "flex", direction: "column", height: '4.5rem'}}>
              <Grid item sm={4} style={{height: '3.3rem', padding: "0rem"}}>
                <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 0.3 },
                }}
                noValidate
                autoComplete="off"
                >
                  <TextField id="nome" label="Nome" variant="outlined" {...register("nome", { required: true })}/>

                </Box>
              </Grid>
              <Grid item sm={4} style={{height: '3.3rem', marginLeft: "2.5rem", padding: "0rem"}}>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 0.3},
                  }}
                  noValidate
                  autoComplete="off"
                  >
                  <TextField id="endereco" label="Endereço" variant="outlined" {...register("endereco", { required: true })}/>
                </Box>
              </Grid>
              <Grid item sm={3} style={{height: '3.3rem', marginLeft: "2.5rem", padding: "0rem"}}>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 0.3},
                  }}
                  noValidate
                  autoComplete="off"
                  >
                  <TextField id="cpf" label="CPF" variant="outlined"  {...register("cpf", { required: true })}/>
                </Box>
              </Grid>
            </Grid>
            <Grid item sm={12} style={{height: '2.5rem', padding: "0rem", display: "flex", justifyContent: "flex-end"}}>
              <Button type="submit" variant="contained" style={{height: '2.5rem', width: "7.5rem", marginRight: "1.4rem"}}>Adicionar</Button>
            </Grid>
          </form>
        </Grid>
       <Grid item style={{ padding: "0rem", marginRight: "12rem", marginTop: "2.5rem", display: "flex", paddingRight:" 0.5rem", height: "35rem"}}>
        <Paper sx={{ width: '94rem', overflow: 'hidden', height: "28rem", marginRight: "11.5rem" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{  fontWeight: 'bold', paddingRight: column.paddingRight }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataCliente.map((row) => (
                  <TableRow
                    key={row.cpf}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.nome}</TableCell>
                    <TableCell align="left">{row.endereco}</TableCell>
                    <TableCell align="left">{row.cpf}</TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon fontSize="small" sx={{ color: "#1B5E20" }}/>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: "#B71C1C" }}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
       </Grid>
      </Grid>
    </Grid>
  );
}