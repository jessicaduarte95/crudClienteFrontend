import React, { useEffect, useState } from "react";
import Axios from 'axios';
import  { Grid, TextField, Typography, Button }  from "@mui/material";
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

export const App = () => {

  const containerStyle = {
    flexDirection: "row"
  }

  const firstPart = {
    backgroundImage: "linear-gradient(90deg, #1A237E 0%, #5C6BC0 100%)",
    height: "24%",
    padding: "0% 20% 2% 11%",
    display: "flex",
    alignItems:"flex-end",
    fontFamily: 'Arial',
    fontSize: '310%',
    color: 'white'
  }

  const secondPart = {
    display: "flex", 
    direction: "column", 
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
    { id: 'nome', label: 'Nome', minWidth: 170 },
    {
      id: 'endereco',
      label: 'Endereço',
      minWidth: 170,
      align: 'left'
    },
    {
      id: 'cpf',
      label: 'CPF',
      minWidth: 170,
      align: 'left'
    },
  ];

  const [dataCliente, setDataCliente] = useState([])  
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Teste", data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
       <Grid item style={{ height: "50%", padding: "0%", marginRight: "2%"}}>
        <Paper sx={{ width: '90%', overflow: 'hidden', height: "100%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataCliente
                  .map((row) => {
                    return (
                      <TableRow role="checkbox" tabIndex={-1} key={row.nome}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
       </Grid>
      </Grid>
    </Grid>
  );
}