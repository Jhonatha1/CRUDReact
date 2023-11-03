import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';

class Alunos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: 0,
        nome: '',
        email: '',
        alunos: []
    };
  }

  componentDidMount() {
    this.buscarAlunos();
  }

  componentWillUnmount() {}

  buscarAlunos = () => {
    fetch('http://localhost:3001/api/alunos')
    .then(res => res.json())
    .then(dados => {
        this.setState({alunos: dados});
    });
  };

  deletarAluno = (id) => {
    fetch(`http://localhost:5001/api/alunos/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          this.buscarAlunos();
        }
      });
  };

  carregarDados = (id) => {
    fetch(`http://localhost:5001/api/alunos/${id}`, { method: 'GET' })
    .then(res => res.json())
    .then(aluno => { // Corrigido: Use "aluno" em vez de "dados"
        this.setState({
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email
        });
    });
  };

    cadastrarAluno = (aluno) => {
        fetch(`http://localhost:5001/api/alunos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        })
            .then((res) => {
                if (res.ok) {
                    this.buscarAlunos();
                }
                else {
                    alert("Erro ao cadastrar aluno");
                }
            });
    }

    atualizarAluno = (aluno) => {
        fetch(`http://localhost:5001/api/alunos/${aluno.id}`, { // Corrigido: Adicione o ID ao URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        })
            .then((res) => {
                if (res.ok) {
                    this.buscarAlunos();
                }
                else {
                    alert("Não foi possível atualizar os dados do aluno.");
                }
            });
    }

    atualizaNome = (e) => {
        this.setState({nome: e.target.value})
    }

    atualizaEmail = (e) => {
        this.setState({email: e.target.value})
    }

    submit = (e) => {
        if(this.state.id === 0) {
            const aluno = {
                nome: this.state.nome,
                email: this.state.email
            }
            this.cadastrarAluno(aluno);
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email
            }
            this.atualizarAluno(aluno);
        }
    }

    reset = () => {
        this.setState({
            id: 0,
            nome: '',
            email: ''
        });
    }

  render() {
    return (
      <div className="Alunos">
        <Form>
        <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text"  value={this.state.id} readOnly={true}/> {/* Corrigido: Use "id" em vez de "nome" */}
          </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaNome}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Digite o e-mail do aluno" value={this.state.email} onChange={this.atualizaEmail}/>
            <Form.Text className="text-muted">
              Utilize o melhor e-mail do aluno.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.submit}>
            Salvar
          </Button>
          <Button variant="warning" type="submit" onClick={this.reset}>
            Novo Usuário
          </Button>
        </Form>

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
                <Button variant="danger" onClick={() => this.carregarDados(aluno.id)}>
                    Atualizar
                  </Button>
                  <Button variant="danger" onClick={() => this.deletarAluno(aluno.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Alunos;
