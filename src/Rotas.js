import { Route, Routes } from 'react-router-dom';
import { Contas } from './Contas'
import { Cliente } from './Cliente';
import { Movimentacao } from './Movimentacao';

export const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Cliente/>}/>
            <Route path="/contas" element={<Contas/>}/>
            <Route path="/movimentacao" element={<Movimentacao/>}/>
        </Routes>
    )
}