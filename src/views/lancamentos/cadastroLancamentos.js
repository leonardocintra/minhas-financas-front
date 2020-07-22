import React from 'react';
import { withRouter } from 'react-router-dom';

import FormGroup from '../../components/form-group';
import Card from '../../components/card';
import SelectMenu from '../../components/selectMenu';

import LancamentoService from '../../app/service/lancamentoService';

class CadastroLancamentos extends React.Component {

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  handeChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  submit = () => {
    console.log(this.state)
  }

  state = {
    id: null,
    descricao: '',
    valor: '',
    mes: '',
    ano: new Date().getFullYear(),
    tipo: '',
    status: '',
  }

  render() {

    const tipos_lacamento = this.service.obterListaTiposLancamentos();
    const meses = this.service.obterListaMeses();

    const butoes = (
      <div className="row">
        <div className="col-md-6">
          <button onClick={this.submit} className="btn btn-success">Salvar</button>
          <button className="btn btn-danger">Cancelar</button>
        </div>
      </div>
    )

    return (
      <Card title="Cadastro de lançamento">

        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputDescricao" label="Descrição: *">
              <input id="inputDescricao" type="text" className="form-control"
                name="descricao" value={this.state.descricao} onChange={this.handeChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputAno" label="Ano: *">
              <input id="inputAno" type="text" className="form-control"
                name="ano" value={this.state.ano} onChange={this.handeChange} />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup id="inputMes" label="Mês: *">
              <SelectMenu id="inputMes" lista={meses} className="form-control"
                name="mes" value={this.state.mes} onChange={this.handeChange} />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup id="inputValor" label="Valor: *">
              <input id="inputValor" type="text" className="form-control"
                name="valor" value={this.state.valor} onChange={this.handeChange} />
            </FormGroup>
          </div>

          <div className="col-md-4">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu id="inputTipo" lista={tipos_lacamento} className="form-control"
                name="tipo" value={this.state.tipo} onChange={this.handeChange} />
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