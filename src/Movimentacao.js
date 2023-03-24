import {useEffect, useState} from 'react';
import  { Grid, Typography, TextField, Button }  from "@mui/material";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

export const Movimentacao = () => {

    const containerStyle = {
        flexDirection: "row"
    }

    const firstPart = {
        backgroundImage: "linear-gradient(90deg, #1A237E 0%, #5C6BC0 100%)",
        height: "12rem",
        padding: "0rem 8rem 1rem 13rem",
        display: "flex",
        alignItems:"flex-end",
        fontFamily: 'Arial',
        fontSize: '310%',
        color: 'white'
    }

    const secondPart = {
        paddingLeft: "13rem",
        backgroundColor: "#E0E0E0",
        height: "100%"
    }

    const adicionarConta = {
        display: "flex", 
        direction: "column", 
        width: "100%",
        marginRight: "16rem",
        marginTop: "2.5rem",
        height: "12rem",
        backgroundColor: "white",
        borderRadius: "0.4rem", 
        paddingRight: "1.4rem",
        flexDirection: "column"
    }

    const columns = [
        { 
            id: 'data', 
            label: 'Data',  
            align: 'left', 
            width: "35%"
        },
        {
            id: 'valor',
            label: 'Valor',
            align: 'left',
            width: "22%"
        },
    ]

    const { register, handleSubmit, reset } = useForm();
    const [optionsNomeCPF, setOptionsNomeCPF] = useState({NomeCPF: []});
    const [changeOption, setChangeOption] = useState('');
    const [depositarRetirar, setDepositarRetirar] = useState('');
    const handleChangeDepositarRetirar = (event) => {
        setDepositarRetirar(event.target.value);
    };
    const handleChangeOption = (event) => {
        setChangeOption(event.target.value);
    };

    const onSubmit = () => {
        console.log("Teste");
        reset()
    }

    const nomeCPF = () => {
        Axios.get("http://localhost:8080/cliente")
        .then((response) => {
            let allOptions ={
                NomeCPF: []
            }
            allOptions.NomeCPF = [{value: "", label: <em></em>}, ...response.data.map(e => { return { value: e.idCliente, label: e.nome + " - " + e.cpf}})];
            setOptionsNomeCPF(allOptions)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        nomeCPF()
      }, [])

    return (
        <Grid container style={containerStyle}>
            <Grid item sm={12} style={firstPart}>
                Sistema de Contas
            </Grid>
            <Grid container style={secondPart}>
                <form id="movimentacao" onSubmit={handleSubmit(onSubmit)} style={adicionarConta}>
                    <Grid container item sm={12} style={{height: "3rem", marginBottom: "0rem", width: "100%"}}>
                        <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "1rem", paddingTop: "1rem", color: "#424242"}}>
                            Cadastro de Movimentação
                        </Typography>
                    </Grid>
                    <Grid container item sm={12} style={{display: "flex", direction: "column", height: '4.5rem', paddingLeft: "1rem", paddingTop: "0.9rem"}}>
                        <Grid item sm={4} style={{paddingRight: "1rem", marginTop: "0.2rem"}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Nome e CPF</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={changeOption}
                                    label="Nome e CPF"
                                    onChange={handleChangeOption}
                                    >
                                    {
                                     optionsNomeCPF.NomeCPF.map((e,i) => <MenuItem key={i} value={e.value}>{e.label}</MenuItem>)
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item sm={3} style={{paddingRight: "1rem", marginTop: "0.2rem"}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Número da Conta</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={changeOption}
                                    label="Número da Conta"
                                    onChange={handleChangeOption}
                                    >
                                    {
                                     optionsNomeCPF.NomeCPF.map((e,i) => <MenuItem key={i} value={e.value}>{e.label}</MenuItem>)
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item sm={2} style={{height: '3.3rem', padding: "0rem",  marginTop: "0.1rem", paddingRight: "1rem"}}>
                            <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 0.3 }
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField id="valor" label="Valor" variant="outlined" {...register("valor", { required: true })} style={{width: "100%"}}/>
                            </Box>
                        </Grid>
                        <Grid item sm={3} style={{ marginTop: "0.2rem"}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Depositar/Retirar</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={depositarRetirar}
                                    label="Depositar/Retirar"
                                    onChange={handleChangeDepositarRetirar}
                                    >
                                        <MenuItem value={10}>Depositar</MenuItem>
                                        <MenuItem value={20}>Retirar</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item sm={12} style={{marginTop: "1rem", paddingLeft: "1rem"}}>
                        <Grid item sm={8}>
                            <Link to='/' style={{height:"0px", textDecoration: "none"}}>
                                <Button variant="contained" style={{height: '2.5rem', width: "6.5rem"}}>Cliente</Button>
                            </Link>
                            <Link to='/contas' style={{height:"0px", textDecoration: "none"}}>
                                <Button variant="contained" style={{height: '2.5rem', width: "8.5rem", marginLeft: "0.5rem"}}>Contas</Button>
                            </Link>
                        </Grid>
                        <Grid item sm={4} style={{height: '2.5rem', display: "flex", justifyContent: "flex-end"}}>
                            <Button type="submit" variant="contained" style={{height: '2.5rem', width: "7.5rem"}}>Adicionar</Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid container direction="row" style={{flexDirection: "column"}}>
                    <Grid item style={{ height: '5rem', marginTop: "2.5rem", backgroundColor:"#9E9E9E", width: "30%"}}>
                        <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "1rem", color: "Black", display: "flex", alignItems: "center", height: "100%"}}>
                            Extrato
                        </Typography>
                    </Grid>
                    <Grid item style={{ padding: "0rem", display: "flex", height: "35rem", width: "30%", marginRight: "16rem"}}>
                        <Paper sx={{overflow: 'hidden', height: "28rem", width: "100%" }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={{  fontWeight: 'bold', paddingRight: column.paddingRight, width: column.width }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    </TableHead>
                                    <caption>Saldo: R$</caption>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}