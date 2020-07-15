import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/localStorageService'
import { mensagemErro } from '../components/toastr';

class Login extends React.Component {

  state = {
    email: '',
    senha: '',
    mensagemErro: null
  }

  constructor() {
    super();
    this.usuarioService = new UsuarioService();
  }

  entrar = () => {
    this.usuarioService.autenticar({
      email: this.state.email,
      senha: this.state.senha
    }).then(res => {
      LocalStorageService.setItem('_usuario_logado', res.data)
      this.props.history.push('/home');
    }).catch(err => {
      mensagemErro(err.response.data)
    })
  }

  prepareCadastrar = () => {
    this.props.history.push('/cadastro-usuarios')
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6" style={{
          position: 'relative', left: '300px'
        }} >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Email *" htmlFor="exampleInputEmail">
                        <input type="email"
                          value={this.state.email}
                          onChange={e => this.setState({ email: e.target.value })}
                          className="form-control"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Digite o Email" />
                      </FormGroup>

                      <FormGroup label="Senha *" htmlFor="exampleInputPassword">
                        <input type="password"
                          value={this.state.senha}
                          onChange={e => this.setState({ senha: e.target.value })}
                          className="form-control"
                          id="exampleInputPassword"
                          placeholder="Digite a senha" />
                      </FormGroup>

                      <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                      <button onClick={this.prepareCadastrar} className="btn btn-danger">Cadastrar</button>

                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)