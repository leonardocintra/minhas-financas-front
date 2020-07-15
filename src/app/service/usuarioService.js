import ApiService from '../apiservice';

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

}

export default UsuarioService