import React from 'react';

export default props => {

  const rows = props.lancamentos.map(lancamento => {

    let valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(lancamento.valor);

    return (
      <tr key={lancamento.id} >
        <td>{lancamento.descricao}</td>
        <td>{valorFormatado}</td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
          <button type="button" className="btn btn-info" onClick={e => props.editarAction(lancamento.id)}>Editar</button>
          <button type="button" className="btn btn-danger" onClick={e => props.deleteAction(lancamento)}>Excluir</button>
        </td>
      </tr>
    )
  })

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}