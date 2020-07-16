import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'

import Home from '../views/home'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamento from '../views/lancamentos/consultaLancamentos'

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/cadastro-usuarios" component={CadastroUsuario} />
        <Route path="/consulta-lancamento" component={ConsultaLancamento} />
      </Switch>
    </HashRouter>
  )
}

export default Rotas