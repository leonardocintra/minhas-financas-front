import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';

class CadastroUsuario extends React.Component {

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: ''
  }

  cadastrar = () => {
    console.log('Salvar')
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