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
    paddingLeft: "12%",
    backgroundColor: "#E0E0E0"
  }

  const containerAdicionarCliente ={
    display: "flex", 
    direction: "column", 
    alignItems: "flex-start",
    paddingRight: "2%", 
    marginRight: "12%",
    marginTop: "2.6%",
    height: "28%",
    backgroundColor: "white",
    borderRadius: "3px" 
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
          <Grid item sm={12} style={{height: "20%", padding: "0%", marginBottom: "0.5%"}}>
            <Typography style={{fontFamily: 'Arial', fontSize: '150%', paddingLeft: "0.1%", color: "#424242"}}>
              Cliente
            </Typography>
          </Grid>
          <Grid item sm={4} style={{spacing: "1%", height: '32%', padding: "0%"}}>
            <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0.3 },
            }}
            noValidate
            autoComplete="off"
            >
              <TextField id="nome" label="Nome" variant="outlined" />

            </Box>
          </Grid>
          <Grid item sm={4} style={{spacing: "3%", height: '32%', marginLeft: "2.8%", padding: "0%"}}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 0.3},
              }}
              noValidate
              autoComplete="off"
              >
              <TextField id="endereco" label="Endereço" variant="outlined" />
            </Box>
          </Grid>
          <Grid item sm={3} style={{spacing: "3%", height: '32%', marginLeft: "2.8%", padding: "0%"}}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 0.3},
              }}
              noValidate
              autoComplete="off"
              >
              <TextField id="cpf" label="CPF" variant="outlined" />
            </Box>
          </Grid>
          <Grid item sm={12} style={{height: '20%', padding: "0%", display: "flex", justifyContent: "flex-end", marginTop:"1.3%", marginBottom:"1.3%"}}>
            <Button variant="contained" style={{height: '110%', width: "15%", marginRight: "0.7%"}}>Adicionar</Button>
          </Grid>
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