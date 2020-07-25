import ApiService from '../apiservice';
import ErroValidacao from '../exception/erroValidacao';
class UsuarioService extends ApiService {

  constructor() {
    super('/api/usuarios');
  }

  autenticar(credentials) {
    return this.post('/autenticar', credentials);
  }

  obterSaldoPorUsuario(id) {
    return this.get(`/${id}/saldo`);
  }

  salvar(usuario) {
    return this.post('', usuario);
  }

  validar(usuario) {
    const erros = [];

    if (!usuario.nome) {
      erros.push('O campo nome é obrigatório');
    }

    if (!usuario.email) {
      erros.push('O campo email é obrigatório');
    } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      erros.push('O campo email não é valido!');
    }

    if (!usuario.senha) {
      erros.push('O campo senha é obrigatório');
    }

    if (!usuario.senhaRepeticao) {
      erros.push('O campo senha repetição é obrigatório');
    }

    if (usuario.senha !== usuario.senhaRepeticao) {
      erros.push('As senhas não batem. Verifique');
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

}

export default UsuarioService