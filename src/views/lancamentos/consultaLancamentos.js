import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentoTable';

import LocalStorageService from '../../app/localStorageService';
import LancamentoService from '../../app/service/lancamentoService';

import * as messages from '../../components/toastr';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamento extends React.Component {

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  state = {
    ano: new Date().getFullYear(),
    mes: '',
    tipo: '',
    descricao: '',
    showConfirmDialog: false,
    lancamentoDeletar: {},
    lancamentos: []
  }

  buscar = () => {

    if (!this.state.ano) {
      messages.mensagemErro('O preenchimento do ano é obrigatório');
      return false;
    }

    const usuarioLogado = LocalStorageService.getItem('_usuario_logado');

    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    this.service.consultar(lancamentoFiltro)
      .then(res => {
        this.setState({ lancamentos: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  editar = (id) => {
    console.log(id);
  }

  abrirConfirmacaoDelete = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento });
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, lancamentoDeletar: {} });
  }

  deletar = () => {
    this.service.deletar(this.state.lancamentoDeletar.id)
      .then(res => {
        const lancamentos = this.state.lancamentos;
        const index = lancamentos.indexOf(this.state.lancamentoDeletar);

        lancamentos.splice(index, 1);
        this.setState({ lancamentos: lancamentos, showConfirmDialog: false });

        messages.mensagemSucesso('Lançamento excluido com sucesso!')
      })
      .catch(err => {
        messages.mensagemErro('Ocorreu um erro ao excluir: ' + err.message);
      })
  }

  render() {

    const confirmDialogFooter = (
      <div>
        <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
        <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
      </div>
    );

    const tipos_lacamento = this.service.obterListaTiposLancamentos();
    const meses = this.service.obterListaMeses();

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

              <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                <input type="text" className="form-control" id="inputDescricao"
                  value={this.state.descricao}
                  onChange={e => this.setState({ descricao: e.target.value })}
                  placeholder="Digite uma descrição" />
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
              <LancamentosTable lancamentos={this.state.lancamentos}
                deleteAction={this.abrirConfirmacaoDelete}
                editarAction={this.editar} />
            </div>
          </div>
        </div>
        <div>
          <Dialog header="Confirmação delete"
            visible={this.state.showConfirmDialog}
            style={{ width: '50vw' }}
            modal={true} footer={confirmDialogFooter}
            onHide={() => this.setState({ showConfirmDialog: false })}>
            Tem certeza que deseja excluir esse lançamento ?
          </Dialog>
        </div>
      </Card>
    )
  }

}

export default withRouter(ConsultaLancamento)