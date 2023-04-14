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
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import moment from 'moment';

export const Movimentacao = () => {

    const containerStyle = {
        flexDirection: "row"
    }

    const firstPart = {
        backgroundImage: "linear-gradient(90deg, #1A237E 0%, #5C6BC0 100%)",
        height: "12rem",
        padding: "1rem 8rem 1rem 11%",
        display: "flex",
        alignItems:"flex-end",
        fontFamily: 'Arial',
        fontSize: '3rem',
        color: 'white'
    }

    const secondPart = {
        paddingLeft: "11%",
        paddingRight: "12.15%",
        backgroundColor: "#E0E0E0",
        height: "100%"
    }

    const adicionarMovimentacao = {
        display: "flex", 
        direction: "column", 
        width: "100%",
        marginTop: "2.5rem",
        height: "initial",
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
    const [optionsNomeCPFPesquisa, setOptionsNomeCPFPesquisa] = useState({NomeCPF: []});
    const [changeOption, setChangeOption] = useState('');
    const [changeOptionNomePesquisa, setChangeOptionNomePesquisa] = useState('');
    const [changeOptionNumConta, setChangeOptionNumConta] = useState('');
    const [changeOptionContaPesquisa, setChangeOptionContaPesquisa] = useState('');
    const [depositarRetirar, setDepositarRetirar] = useState('');
    const [optionsNumConta, setOptionsNumConta] = useState({numConta: []});
    const [optionsNumContaPesquisa, setOptionsNumContaPesquisa] = useState({numConta: []});
    const [disabled, setDisabled] = useState(true);
    const [disabledPesquisar, setDisabledPesquisar] = useState(true);
    const [extrato, setExtrato] = useState([]);

    const handleChangeDepositarRetirar = (event) => {
        setDepositarRetirar(event.target.value);
    };
    const handleChangeOption = (event) => {
        setChangeOption(event.target.value);
    };

    const handleChangeOptionNumConta = (event) => {
        setChangeOptionNumConta(event.target.value);
    };

    const handleChangeOptionNomePesquisa = (event) => {
        setChangeOptionNomePesquisa(event.target.value);
    };

    const handleChangeOptionContaPesquisa = (event) => {
        setChangeOptionContaPesquisa(event.target.value);
    };

    const onSubmit = async (data) => {
        const dataTime = moment().format('DD/MM/YYYY HH:mm');
        const idConta = changeOptionNumConta;

        await Axios.post("http://localhost:8080/movimentacao", {
            conta: {idConta: idConta},
            dataTime: dataTime,
            valor: depositarRetirar === 'Retirar' ? data.valor.replace(/-/, "") * (-1) : Math.abs(data.valor)

        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

        setDisabled(true);
        setDepositarRetirar('');
        setChangeOption('');
        setChangeOptionNumConta('');
        reset();
    }

    const nomeCPF = () => {
        Axios.get("http://localhost:8080/cliente")
        .then((response) => {
            let allOptions ={
                NomeCPF: []
            }
            allOptions.NomeCPF = [{value: "", label: <em></em>}, ...response.data.map(e => { return { value: e.idCliente, label: e.nome + " - " + e.cpf}})];
            setOptionsNomeCPF(allOptions)
            setOptionsNomeCPFPesquisa(allOptions)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const pesquisar = () => {
        console.log("changeOptionNumConta: ", changeOptionContaPesquisa);
        Axios.get(`http://localhost:8080/movimentacao/filtro/${changeOptionContaPesquisa}`)
        .then((response) => {
            setExtrato(response.data)
        }).catch((error) => {
            console.log(error)
        })
        setChangeOptionContaPesquisa('')
        setChangeOptionNomePesquisa('')
    }

    useEffect(() => {  
        nomeCPF()
        if((changeOption !== "" && changeOption !== undefined && changeOption !== null) || (changeOptionNomePesquisa !== "" && changeOptionNomePesquisa !== undefined && changeOptionNomePesquisa !== null)){
            if(changeOption !== "" && changeOption !== undefined && changeOption !== null){
                setDisabled(false);
            }else if(changeOptionNomePesquisa !== "" && changeOptionNomePesquisa !== undefined && changeOptionNomePesquisa !== null){
                setDisabledPesquisar(false)
            }
            let idCliente = (changeOption !== "" && changeOption !== undefined && changeOption !== null) ?changeOption : changeOptionNomePesquisa;
            Axios.get(`http://localhost:8080/conta/filtro/${idCliente}`)
            .then((response) => {
                let allOptions = {
                    numConta: []
                }
                allOptions.numConta = [{value: "", label: <em></em>}, ...response.data.map(e => {return {value: e.idConta, label: e.numConta}})];
                setOptionsNumConta(allOptions)
                setOptionsNumContaPesquisa(allOptions)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        console.log("extrato: ", extrato);
      }, [changeOption, changeOptionNomePesquisa])

    return (
        <Grid container style={containerStyle}>
            <Grid item sm={12} style={firstPart}>
                Sistema de Contas
            </Grid>
            <Grid container style={secondPart}>
                <form id="movimentacao" onSubmit={handleSubmit(onSubmit)} style={adicionarMovimentacao}>
                    <Grid container item sm={12} style={{height: "6rem", marginBottom: "0rem", width: "100%"}}>
                        <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "1rem", paddingTop: "1rem", color: "#424242"}}>
                            Cadastro de Movimentação
                        </Typography>
                    </Grid>
                    <Grid container item sm={12} style={{display: "flex", direction: "column", height: '16.5rem', paddingLeft: "1rem", paddingTop: "0.9rem"}}>
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
                                    value={changeOptionNumConta}
                                    label="Número da Conta"
                                    onChange={handleChangeOptionNumConta}
                                    disabled={disabled}
                                    >
                                    {
                                     optionsNumConta.numConta.map((e,i) => <MenuItem key={i} value={e.value}>{e.label}</MenuItem>)
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item sm={2} style={{height: '3.4rem', padding: "0rem",  marginTop: "0.2rem", paddingRight: "1rem"}}>
                            <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            >
                            <TextField inputProps={{step: 1, min: 0, type: 'number'}} id="valor" label="Valor" variant="outlined" {...register("valor", { required: true })} style={{width: "100%"}}/>
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
                                        <MenuItem value={"Depositar"}>Depositar</MenuItem>
                                        <MenuItem value={"Retirar"}>Retirar</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item sm={12} style={{marginTop: "1rem", paddingLeft: "1rem", marginBottom: "1rem"}}>
                        <Grid item sm={8} style={{ marginBottom: "0.7rem"}}>
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
                <Grid item style={{ height: '3rem', marginTop: "2.5rem", width: "100%", paddingLeft: "0.5rem"}}>
                    <Typography style={{fontFamily: 'Arial', fontSize: '1.5rem', color: "Black", display: "flex", alignItems: "center", height: "100%"}}>
                        Extrato de Conta
                    </Typography>
                </Grid>
                <Grid container direction="row" style={{height: "100%"}}>
                    <Grid container item style={{ height: '17%', backgroundColor:"white", width: "100%", marginBottom: "0.05rem", borderRadius: "4px", alignItems: "center", paddingBottom: "1rem", paddingTop: "1rem"}}>
                        <Grid item sm={4} style={{paddingRight: "1rem", paddingLeft: "1rem"}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Nome e CPF</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={changeOptionNomePesquisa}
                                    label="Nome e CPF"
                                    onChange={handleChangeOptionNomePesquisa}
                                    >
                                    {
                                     optionsNomeCPFPesquisa.NomeCPF.map((e,i) => <MenuItem key={i} value={e.value}>{e.label}</MenuItem>)
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item sm={3} style={{paddingRight: "0rem"}}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Número da Conta</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={changeOptionContaPesquisa}
                                    label="Número da Conta"
                                    onChange={handleChangeOptionContaPesquisa}
                                    disabled={disabledPesquisar}
                                    >
                                    {
                                     optionsNumContaPesquisa.numConta.map((e,i) => <MenuItem key={i} value={e.value}>{e.label}</MenuItem>)
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item sm={4.8} style={{height: '3rem', display: "flex", justifyContent: "flex-end", marginLeft: "1rem", paddingRight: "1.2rem", paddingTop: "0.5rem"}}>
                            <Button type="submit" variant="contained" style={{height: '2.5rem', width: "7.5rem"}} onClick={pesquisar}>Pesquizar</Button>
                        </Grid>
                    </Grid>
                    <Grid item style={{ padding: "0rem", display: "flex", height: "35rem", width: "100%"}}>
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
                                    <TableBody>
                                        {extrato !== undefined ? extrato
                                            .map((row) => (
                                            <TableRow key={row.idMovimentacao} role="checkbox" tabIndex={-1}>
                                                <TableCell align="left">{row.dataTime}</TableCell>
                                                <TableCell align="left">{row.valor}</TableCell>
                                            </TableRow>
                                        )):""}
                                    </TableBody>
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