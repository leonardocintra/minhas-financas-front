import React from 'react';
import { withRouter } from 'react-router-dom'

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentoTable';

class ConsultaLancamento extends React.Component {

  state = {
    ano: '',
    mes: '',
    tipo: '',
  }

  buscar = () => {
    console.log(this.state)
  }

  render() {

    const tipos_lacamento = [
      { label: 'Selecione ...', value: '' },
      { label: 'DESPESA ...', value: 'DESPESA' },
      { label: 'RECEITA', value: 'RECEITA' }
    ]

    const meses = [
      { label: 'Selecione ...', value: '' },
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 },
    ];

    const lancamentos = [
      {id: 1030, descricao: 'Salário', valor: 5000, mes: 1, tipo: 'RECEITA', status: 'Efetivado'}
    ]


    return (
      <Card title="Consulta Lançamento">
        <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup label="Ano: *" htmlFor="inputAno">
                <input type="text" className="form-control" id="inputAno"
                 value={this.state.ano} 
                 onChange={e => this.setState({ ano: e.target.value })}
                 placeholder="Digite o Ano" />
              </FormGroup>

              <FormGroup label="Mes: *" htmlFor="inputMes">
                <SelectMenu id="inputMes" 
                  value={this.state.mes}
                  onChange={e => this.setState({ mes: e.target.value })}
                  className="form-control" lista={meses} />
              </FormGroup>

              <FormGroup label="Tipo lançamento: *" htmlFor="inputTipo">
                <SelectMenu id="inputTipo" 
                  value={this.state.tipo}
                  onChange={e => this.setState({ tipo: e.target.value })}
                  className="form-control" lista={tipos_lacamento} />
              </FormGroup>

              <button onClick={this.buscar} type="button" className="btn btn-info">Buscar</button>
              <button onClick={this.cancelar} type="button" className="btn btn-success">Cadastrar</button>

            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentosTable lancamentos={lancamentos} />
            </div>
          </div>
        </div>
      </Card>
    )
  }

}

export default withRouter(ConsultaLancamento)