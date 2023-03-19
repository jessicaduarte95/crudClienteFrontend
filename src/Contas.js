
import  { Grid, Typography, TextField, Button }  from "@mui/material";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export const Contas = () => {

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
        height: "100vh"
    }
    
    const adicionarConta = {
        display: "flex", 
        direction: "column", 
        width: "100%",
        // alignItems: "flex-start",
        marginRight: "16rem",
        marginTop: "2.5rem",
        height: "12rem",
        backgroundColor: "white",
        borderRadius: "0.4rem", 
        paddingRight: "1.4rem",
        flexDirection: "column",
    }

    const defaultValues = {
        nome: "",
        numeroConta: "",
    }

    const { register, handleSubmit, reset } = useForm({defaultValues});

    const onSubmit = () => {
        console.log("Dentro do onsubmit");
    }

    return (
        <Grid container style={containerStyle}>
            <Grid item sm={12} style={firstPart}>
                Sistema de Contas
            </Grid>
            <Grid container style={secondPart}>
                <form id="adicionarConta" onSubmit={handleSubmit(onSubmit)} style={adicionarConta}>
                    <Grid container item sm={12} style={{height: "3rem", marginBottom: "0rem", width: "100%"}}>
                        <Typography style={{fontFamily: 'Arial', fontSize: '1.8rem', paddingLeft: "1rem", paddingTop: "1rem", color: "#424242"}}>
                            Cadastro de Conta
                        </Typography>
                    </Grid>
                    <Grid item style={{display: "flex", direction: "column", height: '4.5rem', paddingLeft: "1rem", paddingTop: "0.9rem"}}>
                        <Grid item sm={4} style={{height: '3.3rem', padding: "0rem"}}>
                            <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 0.3 }
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField id="numConta" label="Número da Conta" variant="outlined" {...register("nome", { required: true })} style={{width: "100%"}}/>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item sm={12} style={{marginTop: "1.2rem", paddingLeft: "1rem"}}>
                        <Grid item sm={8}>
                            <Link to='/' style={{height:"0px", textDecoration: "none"}}>
                                <Button type="submit" variant="contained" style={{height: '2.5rem', width: "6.5rem"}}>Cliente</Button>
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
        </Grid>
    )
}