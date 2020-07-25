import React from 'react';
import { withRouter } from 'react-router-dom';

import FormGroup from '../../components/form-group';
import Card from '../../components/card';
import SelectMenu from '../../components/selectMenu';
import * as messages from '../../components/toastr';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/localStorageService';

class CadastroLancamentos extends React.Component {

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  state = {
    id: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: new Date().getFullYear(),
    tipo: '',
    status: '',
    usuario: null,
    atualizando: false
  }

  componentDidMount() {
    const params = this.props.match.params;

    if (params.id) {
      this.service.obterPorId(params.id)
        .then(res => {
          this.setState({ ...res.data, atualizando: true });
        })
        .catch(err => {
          messages.mensagemErro("Erro ao buscar esse lançamento. Erro: " + err.response.data)
        })
    }
  }

  handleChanges = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  submit = () => {

    const usuarioLogado = LocalStorageService.getItem('_usuario_logado');

    // maneira mais facil de settar os parametros
    const { descricao, valor, mes, ano, tipo } = this.state;
    const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

    try {
      this.service.validar(lancamento);
    } catch (e) {
      const mensagens = e.mensagens;
      mensagens.forEach(msg => messages.mensagemErro(msg));
      return false;
    }


    this.service
      .salvar(lancamento)
      .then(res => {
        this.props.history.push('/consulta-lancamento');
        messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
      })
      .catch(err => {
        messages.mensagemErro('Ocorreu um erro ao cadastrar o lançamento. Erro: ' + err.response.data)
      })
  }

  atualizar = () => {

    const { id, descricao, valor, mes, ano, tipo, status, usuario } = this.state;
    const lancamento = { id, descricao, valor, mes, ano, tipo, status, usuario };

    try {
      this.service.validar(lancamento);
    } catch (e) {
      const mensagens = e.mensagens;
      mensagens.forEach(msg => messages.mensagemErro(msg));
      return false;
    }

    this.service
      .atualizar(lancamento)
      .then(res => {
        this.props.history.push('/consulta-lancamento');
        messages.mensagemSucesso('Lançamento atualizado com sucesso!');
      })
      .catch(err => {
        console.log(err);
        messages.mensagemErro('Ocorreu um erro ao atualizar o lançamento. Erro: ' + err.response.data)
      })
  }

  render() {

    const tipos_lacamento = this.service.obterListaTiposLancamentos();
    const meses = this.service.obterListaMeses();

    const butoes = (
      <div className="row">
        <div className="col-md-6">
          {this.state.atualizando ?
            (
              <button onClick={this.atualizar} className="btn btn-info">Atualizar</button>
            ) : (
              <button onClick={this.submit} className="btn btn-success">Salvar</button>
            )
          }
          <button onClick={e => this.props.history.push('/consulta-lancamento')} className="btn btn-danger">Cancelar</button>
        </div>
      </div>
    )

    return (
      <Card title={this.state.atualizando ? 'Atualização de lançamento' : 'Cadastro de lançamento'}>

        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao" label="Descrição: *">
              <input id="inputDescricao" type="text" className="form-control"
                name="descricao" value={this.state.descricao} onChange={this.handleChanges} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputAno" label="Ano: *">
              <input id="inputAno" type="text" className="form-control"
                name="ano" value={this.state.ano} onChange={this.handleChanges} />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup id="inputMes" label="Mês: *">
              <SelectMenu id="inputMes" lista={meses} className="form-control"
                name="mes" value={this.state.mes} onChange={this.handleChanges} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputValor" label="Valor: *">
              <input id="inputValor" type="text" className="form-control"
                name="valor" value={this.state.valor} onChange={this.handleChanges} />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu id="inputTipo" lista={tipos_lacamento} className="form-control"
                name="tipo" value={this.state.tipo} onChange={this.handleChanges} />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup id="inputStatus" label="Status: *">
              <input id="inputStatus" type="text" className="form-control" disabled
                name="status" value={this.state.status} />
            </FormGroup>
          </div>
        </div>

        {butoes}

      </Card>
    )
  }
}

export default withRouter(CadastroLancamentos);