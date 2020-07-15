import React from 'react';

import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/localStorageService';

class Home extends React.Component {

  state = {
    saldo: 0,
    nomeUsuario: ''
  }

  constructor() {
    super();
    this.usuarioService = new UsuarioService();
  }

  componentDidMount() {

    const usuarioLogado = LocalStorageService.getItem('_usuario_logado');
    this.setState({ nomeUsuario: usuarioLogado.nome })

    this.usuarioService
      .obterSaldoPorUsuario(usuarioLogado.id)
      .then(res => {
        this.setState({ saldo: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1> <h3>{this.state.nomeUsuario}</h3>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
        <hr className="my-4" />
        <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
          <a className="btn btn-danger btn-lg" href="https://bootswatch.com/flatly/#" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
        </p>
      </div>
    )
  }
}

export default Home