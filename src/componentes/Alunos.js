import React from 'react';
import { Table, Button, Form, Modal} from 'react-bootstrap';
import imagemFundo from '../yellow_image.jpg';

class Alunos extends React.Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      nome: '',
      email: '',
      alunos: [],
      modalAberta: false
    };
  }

  componentDidMount() {
    this.buscarAlunos();
  }

  componentWillUnmount() {}

  buscarAlunos = () => {
    fetch('http://localhost:3001/alunos')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro HTTP! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(dados => {
        this.setState({ alunos: dados });
      })
      .catch(error => {
        console.error('Erro ao buscar alunos:', error);
      });
  };
  

  deletarAluno = (id) => {
    fetch(`http://localhost:3001/alunos/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          this.buscarAlunos();
        } else {
          console.error('Erro ao excluir aluno');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir aluno:', error);
      });
  };

  carregarDados = (id) => {
    fetch(`http://localhost:3001/alunos/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(aluno => {
        this.setState({
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email
        });
        this.abrirModal();
      })
      .catch(error => {
        console.error('Erro ao carregar dados do aluno:', error);
      });
  };

  cadastrarAluno = (aluno) => {
    fetch(`http://localhost:3001/alunos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aluno)
    })
      .then((res) => {
        if (res.ok) {
          this.buscarAlunos();
        } else {
          console.error('Erro ao cadastrar aluno');
        }
      })
      .catch(error => {
        console.error('Erro ao cadastrar aluno:', error);
      });
  };

  atualizarAluno = (aluno) => {
    fetch(`http://localhost:3001/alunos/${aluno.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aluno)
    })
      .then((res) => {
        if (res.ok) {
          this.buscarAlunos();
        } else {
          console.error('Erro ao atualizar dados do aluno');
        }
      })
      .catch(error => {
        console.error('Erro ao atualizar dados do aluno:', error);
      });
  };

  atualizaNome = (e) => {
    this.setState({ nome: e.target.value });
  }

  atualizaEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  submit = (e) => {
    e.preventDefault(); // Evitar o comportamento padrão do formulário

    // Obter dados do novo aluno dos estados
    const novoAluno = {
      nome: this.state.nome,
      email: this.state.email
    };

    // Verificar se é um novo aluno ou uma atualização
    if (this.state.id === 0) {
      // Se for um novo aluno, cadastrar
      this.cadastrarAluno(novoAluno);
    } else {
      // Se for uma atualização, atualizar
      const alunoAtualizado = {
        id: this.state.id,
        ...novoAluno // Inclui nome e email
      };
      this.atualizarAluno(alunoAtualizado);
    }

    // Limpar o formulário após o cadastro ou atualização
    this.fecharModal();
  };

  reset = () => {
    this.setState({
      id: 0,
      nome: '',
      email: ''
    });
    this.abrirModal();
  }

  fecharModal = ()=>{
    this.setState(
      {
        modalAberta: false
      }
      
    )
  }

  abrirModal = ()=>{
    this.setState(
      {
        modalAberta: true
      }
      
    )
  }

  render() {
    const estiloDoFundo = {
      backgroundImage: `url(${imagemFundo})`, // Utilize a variável da imagem importada
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    };
    return (
      <div className="Alunos" style={estiloDoFundo}>
        <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>DADOS DO ALUNO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.submit}>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={this.state.id} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do aluno"
                  value={this.state.nome}
                  onChange={this.atualizaNome}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite o e-mail do aluno"
                  value={this.state.email}
                  onChange={this.atualizaEmail}
                />
                <Form.Text className="text-muted">
                  Utilize o melhor e-mail do aluno.
                </Form.Text>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.fecharModal}>
                  Fechar
                </Button>
                <Button variant="primary" type="submit">
                  Salvar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
          {this.state.alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>
                <Button variant="secondary" onClick={() => this.carregarDados(aluno.id)}>
                  Atualizar
                </Button>
                <span className="ms-1"></span> 
                <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>

          <Button variant="warning" type="submit" onClick={this.reset}>
            Novo Usuário
          </Button>

      </div>
    );
  }
}

export default Alunos;