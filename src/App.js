import { useEffect } from "react";
import Axios from 'axios';
import  { Grid, TextField, Typography, Button }  from "@mui/material";
import Box from '@mui/material/Box';
import "./App.css";

export const App = () => {

  const containerStyle = {
    flexDirection: "row"
  }

  const firstPart = {
    backgroundImage: "linear-gradient(90deg, #1A237E 0%, #3F51B5 100%)",
    height: "20%",
    padding: "0% 20% 2% 10%",
    display: "flex",
    alignItems:"flex-end",
    fontFamily: 'Arial',
    fontSize: '330%',
    color: 'white'
  }

  const secondPart = {
    display: "flex", 
    direction: "column", 
    paddingLeft: "12%",
    backgroundColor: "#EEEEEE"
  }

  const containerAdicionarCliente ={
    display: "flex", 
    direction: "column", 
    alignItems: "flex-start",
    paddingRight: "2%", 
    marginRight: "12%",
    marginTop: "1.4%",
    height: "28%",
    backgroundColor: "white",
    borderRadius: "3px" 
  }

  useEffect(() => {
    Axios.get("http://localhost:8080/cliente")
    .then((response) => {
        console.log(response.data);
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
        <Grid container item sm={12} spacing={2} style={containerAdicionarCliente}>
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
      </Grid>
    </Grid>
  );
}