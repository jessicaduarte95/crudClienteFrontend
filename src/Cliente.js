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
import TablePagination from '@mui/material/TablePagination';
import { ModalExcluir } from "./ModalCliente/ModalExcluir";
import { ModalEditar } from "./ModalCliente/ModalEditar";
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "./Alert";

export const Cliente = () => {

  const containerStyle = {
    flexDirection: "row"
  }

  const firstPart = {
    backgroundImage: "linear-gradient(90deg, #1A237E 0%, #5C6BC0 100%)",
    height: "13rem",
    padding: "0% 8rem 2rem 11%",
    display: "flex",
    alignItems:"flex-end",
    fontFamily: 'Arial',
    fontSize: '310%',
    color: 'white'
  }

  const secondPart = {
    paddingLeft: "12.15%",
    backgroundColor: "#E0E0E0"
  }

  const containerAdicionarCliente ={
    display: "flex", 
    direction: "column", 
    alignItems: "flex-start",
    marginRight: "15%",
    marginTop: "2.5rem",
    height: "12rem",
    backgroundColor: "white",
    borderRadius: "0.4rem", 
    paddingRight: "1.4rem"
  }

  const columns = [
    { 
      id: 'nome', 
      label: 'Nome',  
      align: 'left', 
      width: "35%"
    },
    {
      id: 'endereco',
      label: 'Endereço',
      align: 'left',
      width: "35%"
    },
    {
      id: 'cpf',
      label: 'CPF',
      align: 'left',
      width: "18%"
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

  const defaultValues = {
    nome: "",
    endereco: "",
    cpf: ""
  }

  const [dataCliente, setDataCliente] = useState([])  
  const { register, handleSubmit, reset } = useForm({defaultValues});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openExcluirCliente, setOpenExcluirCliente] = useState(false);
  const handleOpenExcluirCliente = () => setOpenExcluirCliente(true);
  const handleCloseExcluirCliente = () => setOpenExcluirCliente(false);
  const [openEditarCliente, setOpenEditarCliente] = useState(false);
  const handleOpenEditarCliente = () => setOpenEditarCliente(true);
  const handleCloseEditarCliente = () => setOpenEditarCliente(false);
  const [id, setId] = useState("");
  const [rowData, setRowData] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertErro, setOpenAlertErro] = useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const allData = () => {
    Axios.get("http://localhost:8080/cliente")
    .then((response) => {
        setDataCliente(response.data)
    })
    .catch((error) => {
        console.log(error);
    })
  }

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

  const onSubmit = async (data, e) => {

    await Axios.post("http://localhost:8080/cliente", {
      nome: data.nome,
      endereco: data.endereco,
      cpf: data.cpf
    }
        ).then((response) => {
          console.log(response.data)
          handleClickAlert()
      }).catch((error) => {
          console.log(error)
          handleClickAlertError()
      })
      reset();
      allData();
  }

  useEffect(() => {
    allData()
  }, [])

  return (
    <Grid container  style={containerStyle}>
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
      <Grid container item sm={12} spacing={2} style={secondPart}>
        <Grid container item sm={12} style={containerAdicionarCliente}>
          <form id="adicionar" onSubmit={handleSubmit(onSubmit)} style={{ width: "inherit"}}>
            <Grid item sm={12} style={{height: "3rem", marginBottom: "0.2rem"}}>
              <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "0.1rem", color: "#424242"}}>
                Cadastro de Cliente
              </Typography>
            </Grid>
            <Grid item style={{display: "flex", direction: "column", height: '4.5rem'}}>
              <Grid item sm={4} style={{height: '3.3rem', padding: "0rem"}}>
                <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 0.3 }
                }}
                noValidate
                autoComplete="off"
                >
                  <TextField id="nome" label="Nome" variant="outlined" {...register("nome", { required: true })} style={{width: "100%"}}/>

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
                  <TextField id="endereco" label="Endereço" variant="outlined" {...register("endereco", { required: true })} style={{width: "100%"}}/>
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
                  <InputMask id="cpf" label="CPF" maskChar={null} alwaysShowMask={false} mask="999.999.999-99" style={{height: "3rem", width: "100%"}} {...register("cpf", { required: true })}>
                    {inputPropsMask => <TextField {...inputPropsMask} />}
                  </InputMask>
                </Box>
              </Grid>
            </Grid>
            <Grid container item sm={12}>
              <Grid item sm={8}>
                <Link to='/contas' style={{height:"0px", textDecoration: "none"}}>
                  <Button type="submit" variant="contained" style={{height: '2.5rem', width: "6.5rem"}}>Contas</Button>
                </Link>
                <Link to='/movimentacao' style={{height:"0px", textDecoration: "none"}}>
                  <Button type="submit" variant="contained" style={{height: '2.5rem', width: "8.5rem", marginLeft: "0.5rem"}}>Movimentação</Button>
                </Link>
              </Grid>
              <Grid item sm={4} style={{height: '2.5rem', display: "flex", justifyContent: "flex-end"}}>
                <Button type="submit" variant="contained" style={{height: '2.5rem', width: "7.5rem"}}>Adicionar</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
       <Grid item style={{ padding: "0rem", marginTop: "2.5rem", display: "flex", height: "35rem", width: "100%", marginRight: "15%"}}>
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
                {dataCliente 
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.cpf}
                    role="checkbox" tabIndex={-1}
                  >
                    <TableCell align="left">{row.nome}</TableCell>
                    <TableCell align="left">{row.endereco}</TableCell>
                    <TableCell align="left">{row.cpf}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => {handleOpenEditarCliente(); setRowData(row); setId(row.idCliente)}}>
                        <EditIcon fontSize="small" sx={{ color: "#1B5E20" }}/>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => {handleOpenExcluirCliente(); setId(row.idCliente)}}>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: "#B71C1C" }}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{width: "100%"}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataCliente.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
       </Grid>
      </Grid>
      <ModalExcluir openExcluirCliente={openExcluirCliente} handleCloseExcluirCliente={handleCloseExcluirCliente} id={id} allData={allData} handleClickAlert={handleClickAlert} handleClickAlertError={handleClickAlertError}/>
      <ModalEditar openEditarCliente={openEditarCliente} handleCloseEditarCliente={handleCloseEditarCliente} idCliente={id} rowData={rowData} allData={allData} handleClickAlert={handleClickAlert} handleClickAlertError={handleClickAlertError}/>
    </Grid>
  );
}