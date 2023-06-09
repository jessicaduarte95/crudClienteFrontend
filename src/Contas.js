import React, {useEffect, useState} from 'react';
import  { Grid, Typography, TextField, Button, IconButton }  from "@mui/material";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TablePagination from '@mui/material/TablePagination';
import { ModalExcluir } from './ModalContas/ModalExcluir';
import { ModalEditar } from './ModalContas/ModalEditar';
import InputMask from 'react-input-mask';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "./Alert";

export const Contas = () => {

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
    
    const adicionarConta = {
        display: "flex", 
        direction: "column", 
        width: "100%",
        marginTop: "2.5rem",
        height: "28%",
        backgroundColor: "white",
        borderRadius: "0.4rem", 
        paddingRight: "1.4rem",
        flexDirection: "column"
    }

    const columns = [
        { 
            id: 'nome', 
            label: 'Nome',  
            align: 'left', 
            width: "35%"
        },
        {
            id: 'cpf',
            label: 'CPF',
            align: 'left',
            width: "22%"
          },
        {
            id: 'numConta',
            label: 'Número da Conta',
            align: 'left',
            width: "22%"
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
    ]

    const defaultValues = {
        numConta: "",
    }

    const { register, handleSubmit, reset } = useForm({defaultValues});
    const [optionsNomeCPF, setOptionsNomeCPF] = useState({NomeCPF: []});
    const [changeOption, setChangeOption] = useState('');
    const [dadosConta, setDadosContas] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openExcluirConta, setOpenExcluirConta] = useState(false);
    const handleOpenExcluirConta = () => setOpenExcluirConta(true);
    const handleCloseExcluirConta = () => setOpenExcluirConta(false);
    const [openEditarConta, setOpenEditarConta] = useState(false);
    const handleOpenEditarConta = () => setOpenEditarConta(true);
    const handleCloseEditarConta = () => setOpenEditarConta(false);
    const [idConta, setIdConta] = useState('');
    const [rowData, setRowData] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertErro, setOpenAlertErro] = useState(false);
    const [openAlertWarn, setOpenAlertWarn] = useState(false);
    const handleChangeOption = (event) => {
        setChangeOption(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

    const handleClickAlert = () => {
        setOpenAlert(true);
    };
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };
    
    const handleClickAlertError = () => {
        setOpenAlertErro(true);
    };
    
    const handleCloseAlertError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertErro(false);
    };

    const handleClickAlertWarn = () => {
        setOpenAlertWarn(true);
    };
    
    const handleCloseAlertWarn = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertWarn(false);
    };

    const onSubmit = async (data) => {
      
        await Axios.post("http://localhost:8080/conta", {
            cliente: {idCliente: changeOption},
            numConta: data.numConta,
            }
            ).then(() => {
                handleClickAlert()
            }).catch((error) => {
                console.log(error)
                handleClickAlertError()
            })
        reset();
        setChangeOption('');
        listarContas();
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

    const listarContas = () => {
        Axios.get("http://localhost:8080/conta")
        .then((response) => {
            setDadosContas(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        nomeCPF()
        listarContas()
      }, [])

    return (
        <Grid container style={containerStyle}>
            <Grid item sm={12} style={firstPart}>
                Sistema de Contas
            </Grid>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Ação realizada com sucesso!
                </Alert>
                </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openAlertErro} autoHideDuration={6000} onClose={handleCloseAlertError}>
                <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
                    Erro ao realizar a ação!
                </Alert>
                </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openAlertWarn} autoHideDuration={6000} onClose={handleCloseAlertWarn}>
                <Alert onClose={handleCloseAlertWarn} severity="warning" sx={{ width: '100%' }}>
                    Conta não pode ser excluída, pois existem movimentações nesta conta!
                </Alert>
                </Snackbar>
            </Stack>
            <Grid container style={secondPart}>
                <form id="adicionarConta" onSubmit={handleSubmit(onSubmit)} style={adicionarConta}>
                    <Grid container item sm={12} style={{height: "3rem", marginBottom: "0rem", width: "100%"}}>
                        <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "1rem", paddingTop: "0.7rem", color: "#424242"}}>
                            Cadastro de Conta
                        </Typography>
                    </Grid>
                    <Grid item style={{display: "flex", direction: "column", height: '4.5rem', paddingLeft: "1rem", paddingTop: "0.9rem", alignItems: "center", marginBottom: "0.6rem"}}>
                        <Grid item sm={6} style={{paddingRight: "1rem"}}>
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
                        <Grid item sm={6} style={{height: '3.85rem', padding: "0rem"}}>
                            <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 0.3 }
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <InputMask id="numConta" label="Número da Conta" maskChar={null} alwaysShowMask={false} mask="9999.9999.9999.9999" variant="outlined" {...register("numConta", { required: true })} style={{width: "100%"}}>
                                {inputPropsMask => <TextField {...inputPropsMask} />}
                            </InputMask>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item sm={12} style={{marginTop: "0.1rem", paddingLeft: "1rem"}}>
                        <Grid item sm={8} style={{marginBottom: "0.7rem"}}>
                            <Link to='/' style={{height:"0px", textDecoration: "none"}}>
                                <Button variant="contained" style={{height: '2.5rem', width: "6.5rem"}}>Cliente</Button>
                            </Link>
                            <Link to='/movimentacao' style={{height:"0px", textDecoration: "none"}}>
                                <Button variant="contained" style={{height: '2.5rem', width: "8.5rem", marginLeft: "0.5rem"}}>Movimentação</Button>
                            </Link>
                        </Grid>
                        <Grid item sm={4} style={{height: '2.5rem', display: "flex", justifyContent: "flex-end", marginBottom: "1rem"}}>
                            <Button type="submit" variant="contained" style={{height: '2.5rem', width: "7.5rem"}}>Adicionar</Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid item style={{ padding: "0rem", marginTop: "2.5rem", display: "flex", height: "35rem", width: "100%"}}>
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
                                    {dadosConta !== undefined ? dadosConta
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                        <TableRow key={row.idConta} role="checkbox" tabIndex={-1}>
                                             <TableCell align="left">{row.cliente.nome}</TableCell>
                                            <TableCell align="left">{row.cliente.cpf}</TableCell>
                                            <TableCell align="left">{row.numConta}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => {handleOpenEditarConta(); setRowData(row); setIdConta(row.idConta)}}>
                                                    <EditIcon fontSize="small" sx={{ color: "#1B5E20" }}/>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => {handleOpenExcluirConta(); setIdConta(row.idConta);}}>
                                                    <DeleteOutlineIcon fontSize="small" sx={{ color: "#B71C1C" }}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )): ""}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            style={{width: "100%"}}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={dadosConta.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <ModalExcluir openExcluirConta={openExcluirConta} handleCloseExcluirConta={handleCloseExcluirConta} id={idConta} listarContas={listarContas} handleClickAlert={handleClickAlert} handleClickAlertError={handleClickAlertError} handleClickAlertWarn={handleClickAlertWarn}/>
            <ModalEditar openEditarConta={openEditarConta} handleCloseEditarConta={handleCloseEditarConta} idConta={idConta} rowData={rowData} listarContas={listarContas} handleClickAlert={handleClickAlert} handleClickAlertError={handleClickAlertError}/>
        </Grid>
    )
}