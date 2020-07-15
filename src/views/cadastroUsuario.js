import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr'

import UsuarioService from '../app/service/usuarioService';

class CadastroUsuario extends React.Component {

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: ''
  }

  constructor() {
    super();
    this.usuarioService = new UsuarioService();
  }

  validar() {
    const messages = [];

    if (!this.state.nome) {
      messages.push('O campo nome é obrigatório');
    }

    if (!this.state.email) {
      messages.push('O campo email é obrigatório');
    } else if (!this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      messages.push('O campo email não é valido!');
    }

    if (!this.state.senha) {
      messages.push('O campo senha é obrigatório');
    }

    if (!this.state.senhaRepeticao) {
      messages.push('O campo senha repetição é obrigatório');
    }

    if (this.state.senha != this.state.senhaRepeticao) {
      messages.push('As senhas não batem. Verifique');
    }

    return messages;
  }

  cadastrar = () => {

    const messages = this.validar();

    if (messages && messages.length > 0) {
      messages.forEach((msg, index) => {
        mensagemErro(msg);
      })

      return false;
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    }

    this.usuarioService.salvar(usuario)
      .then(res => {
        mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
        this.props.history.push('/login');
      })
      .catch(err => {
        mensagemErro(err.response.data);
      })
  }

  cancelar = () => {
    this.props.history.push('/login')
  }

  render() {
    return (

      <Card title="Cadastro de Usuários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input type="text" id="inputNome" name="nome"
                  className="form-control" placeholder="Digite o nome"
                  onChange={(e) => this.setState({ nome: e.target.value })} />
              </FormGroup>

              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input type="email" id="inputEmail" name="email"
                  className="form-control" placeholder="Digite o email"
                  onChange={(e) => this.setState({ email: e.target.value })} />
              </FormGroup>

              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input type="password" id="inputSenha" name="senha"
                  className="form-control" placeholder="Digite a senha"
                  onChange={(e) => this.setState({ senha: e.target.value })} />
              </FormGroup>

              <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                <input type="password" id="inputRepitaSenha" name="senha"
                  className="form-control" placeholder="Digite novamente a senha"
                  onChange={(e) => this.setState({ senhaRepeticao: e.target.value })} />
              </FormGroup>

              <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
              <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>

            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(CadastroUsuario)